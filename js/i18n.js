/**
 * WPS AI — i18n Engine
 * Lightweight internationalization: load locale JSON → t() function
 * Supports 20 languages with fallback to English
 */
const I18n = {
  currentLang: 'en',
  data: null,
  fallback: null,

  async init(lang) {
    this.currentLang = lang || 'en';
    const basePath = this.getBasePath();
    try {
      const resp = await fetch(`${basePath}data/locales/${this.currentLang}.json`);
      this.data = await resp.json();
    } catch (e) {
      console.warn(`Locale ${this.currentLang} not found, falling back to en`);
      const resp = await fetch(`${basePath}data/locales/en.json`);
      this.data = await resp.json();
      this.currentLang = 'en';
    }
    // Load fallback (English) if different from current
    if (this.currentLang !== 'en') {
      try {
        const fb = await fetch(`${basePath}data/locales/en.json`);
        this.fallback = await fb.json();
      } catch(e) { /* ignore */ }
    }
    document.documentElement.lang = this.currentLang;
  },

  getBasePath() {
    // Must match Utils.getBasePath() logic for consistent relative paths
    const depth = window.location.pathname.split('/').filter(Boolean).length;
    return depth <= 1 ? './' : '../'.repeat(depth - 1);
  },

  /**
   * Translate a key path like 'nav.products' or 'pdf.toWord.title'
   * Supports interpolation: t('hello', { name: 'World' })
   */
  t(key, params = {}) {
    let value = this._resolve(this.data, key);
    if (value === undefined && this.fallback) {
      value = this._resolve(this.fallback, key);
    }
    if (value === undefined) return key;
    // Interpolate {{var}} placeholders
    if (params && typeof value === 'string') {
      Object.keys(params).forEach(k => {
        value = value.replace(new RegExp(`\\{\\{${k}\\}\\}`, 'g'), params[k]);
      });
    }
    return value;
  },

  _resolve(obj, path) {
    return path.split('.').reduce((o, k) => (o && o[k] !== undefined ? o[k] : undefined), obj);
  },

  /** Get URL for same page in another language */
  switchUrl(lang) {
    const parts = window.location.pathname.split('/');
    // Replace the language segment (first dir after wps-site/)
    // Expected structure: .../wps-site/{lang}/...
    if (parts.length >= 2) {
      // Find which part is a known lang code
      const langs = ['en','es','de','fr','ja','ko','pt','ar','it','nl','pl','tr','id','th','vi','ms','zh-cn','zh-tw','ru'];
      const langIdx = parts.findIndex(p => langs.includes(p));
      if (langIdx >= 0) {
        parts[langIdx] = lang;
        return parts.join('/') + window.location.search;
      }
    }
    return `./${lang}/` + window.location.pathname.replace(/^.*\//, '');
  },

  /** Get direction for RTL languages */
  isRTL() {
    return ['ar'].includes(this.currentLang);
  }
};

// Global shortcut
function t(key, params) { return I18n.t(key, params); }
