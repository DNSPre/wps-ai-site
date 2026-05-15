/**
 * WPS AI — Utility Functions
 */

const Utils = {
  /** Debounce a function */
  debounce(fn, delay = 300) {
    let timer;
    return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); };
  },

  /** Format a number with commas */
  formatNumber(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },

  /** Format file size */
  formatSize(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024, sizes = ['B','KB','MB','GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  },

  /** Get URL query parameter */
  getParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  },

  /** Get current language from URL path */
  getLangFromPath() {
    const langs = ['en','es','de','fr','ja','ko','pt','ar','it','nl','pl','tr','id','th','vi','ms','zh-cn','zh-tw','ru'];
    const parts = window.location.pathname.split('/');
    return parts.find(p => langs.includes(p)) || 'en';
  },

  /** Get base path (number of ../ needed) */
  getBasePath() {
    const depth = window.location.pathname.split('/').filter(Boolean).length;
    // Assume structure: /wps-site/{lang}/category/page.html → depth 4, need ../../..
    if (depth <= 1) return './';
    return '../'.repeat(depth - 1);
  },

  /** Escape HTML to prevent XSS */
  escapeHtml(str) {
    const d = document.createElement('div');
    d.appendChild(document.createTextNode(str));
    return d.innerHTML;
  },

  /** Copy text to clipboard */
  async copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    }
  },

  /** Trigger browser file download */
  download(url, filename) {
    const a = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a);
  },

  /** Simple template interpolation: "Hello {{name}}" */
  interpolate(str, vars = {}) {
    return str.replace(/\{\{(\w+)\}\}/g, (_, k) => vars[k] ?? '');
  },

  /** Truncate text */
  truncate(str, max = 100) {
    return str.length > max ? str.slice(0, max - 3) + '...' : str;
  },

  /** Check if mobile viewport */
  isMobile() { return window.innerWidth < 768; },

  /** Animate element in */
  fadeIn(el, duration = 300) {
    el.style.opacity = '0'; el.style.display = 'block';
    el.style.transition = `opacity ${duration}ms ease`;
    requestAnimationFrame(() => { el.style.opacity = '1'; });
  },

  /** Show toast notification */
  toast(message, type = 'success', duration = 3000) {
    const existing = document.querySelector('.wps-toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = `wps-toast wps-toast--${type}`;
    toast.textContent = message;
    toast.style.cssText = `
      position:fixed;bottom:24px;left:50%;transform:translateX(-50%);
      background:${type==='error'?'#E74C3C':type==='warning'?'#F39C12':'#27AE60'};
      color:#fff;padding:10px 20px;border-radius:8px;font-size:14px;
      z-index:9999;box-shadow:0 4px 12px rgba(0,0,0,.2);
      animation:wpsToastIn .2s ease;
    `;
    if (!document.getElementById('wps-toast-style')) {
      const s = document.createElement('style');
      s.id = 'wps-toast-style';
      s.textContent = '@keyframes wpsToastIn{from{opacity:0;transform:translateX(-50%) translateY(8px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}';
      document.head.appendChild(s);
    }
    document.body.appendChild(toast);
    setTimeout(() => { toast.style.opacity='0'; toast.style.transition='opacity .2s'; setTimeout(()=>toast.remove(),200); }, duration);
  }
};
