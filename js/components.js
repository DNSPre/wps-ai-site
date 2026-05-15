/**
 * WPS AI — UI Components
 * Renders Nav, MegaMenu, Breadcrumb, Footer, Sidebar, ScenarioNav
 * All components use I18n.t() for text and write directly to DOM
 */

/* ============================================================
   SVG ICON LIBRARY
   ============================================================ */
const Icons = {
  logo: `<svg viewBox="0 0 88 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="6" fill="#534AB7"/>
    <text x="4" y="17" font-family="system-ui,sans-serif" font-weight="700" font-size="13" fill="white">W</text>
    <text x="30" y="17" font-family="system-ui,sans-serif" font-weight="700" font-size="14" fill="#1A202C">WPS AI</text>
  </svg>`,

  chevronDown: `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3.5 5.5L7 9l3.5-3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  chevronRight: `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5.5 3.5L9 7l-3.5 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  menu: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  close: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  globe: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.3"/><path d="M8 1.5c-2 2-2 9 0 11M8 1.5c2 2 2 9 0 11M1.5 8h13" stroke="currentColor" stroke-width="1.3"/></svg>`,
  external: `<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M7 1h4v4M11 1L6 6M5 2H2a1 1 0 00-1 1v7a1 1 0 001 1h7a1 1 0 001-1V8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>`,
  search: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="5" stroke="currentColor" stroke-width="1.4"/><path d="M11 11l3 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>`,
  star: `<svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M7 1l1.545 3.13 3.455.502-2.5 2.437.59 3.44L7 8.885l-3.09 1.624.59-3.44L2 4.632l3.455-.502L7 1z"/></svg>`,
  upload: `<svg width="36" height="36" viewBox="0 0 36 36" fill="none"><rect x="1" y="1" width="34" height="34" rx="10" stroke="#534AB7" stroke-width="1.5" stroke-dasharray="4 3"/><path d="M18 23V13M18 13l-4 4M18 13l4 4" stroke="#534AB7" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M11 26h14" stroke="#534AB7" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  pdf: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="1" width="10" height="14" rx="1.5" stroke="#E74C3C" stroke-width="1.4"/><path d="M13 1l4 4h-4V1z" fill="#E74C3C" opacity=".5"/><path d="M13 1v4h4" stroke="#E74C3C" stroke-width="1.4"/><path d="M6 9h5M6 12h3" stroke="#E74C3C" stroke-width="1.2" stroke-linecap="round"/></svg>`,
  write: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M14 3l3 3-9 9H5v-3L14 3z" stroke="#534AB7" stroke-width="1.4" stroke-linejoin="round"/><path d="M3 17h14" stroke="#534AB7" stroke-width="1.4" stroke-linecap="round"/></svg>`,
  slides: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="4" width="16" height="11" rx="1.5" stroke="#D24726" stroke-width="1.4"/><path d="M8 9l2.5 2L13 8" stroke="#D24726" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 17l4-2 4 2" stroke="#D24726" stroke-width="1.3" stroke-linecap="round"/></svg>`,
  sheets: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="2" width="16" height="16" rx="2" stroke="#217346" stroke-width="1.4"/><path d="M2 7h16M7 7v11" stroke="#217346" stroke-width="1.3"/></svg>`,
  tools: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M14 2a4 4 0 011 7.87L8 17a2 2 0 01-2.83-2.83l7.13-7a4 4 0 011.7-.17z" stroke="#185FA5" stroke-width="1.4" stroke-linejoin="round"/><circle cx="5.5" cy="14.5" r="1.5" stroke="#185FA5" stroke-width="1.3"/></svg>`,
  template: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="2" width="16" height="16" rx="2" stroke="#9B59B6" stroke-width="1.4"/><path d="M2 7h16M7 2v16" stroke="#9B59B6" stroke-width="1.3"/></svg>`,
  qr: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="2" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.4"/><rect x="11" y="2" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.4"/><rect x="2" y="11" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.4"/><rect x="4" y="4" width="3" height="3" fill="currentColor"/><rect x="13" y="4" width="3" height="3" fill="currentColor"/><rect x="4" y="13" width="3" height="3" fill="currentColor"/><path d="M11 11h3v3M14 14h3v3M11 17h3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>`,

  /* Category icons for tool hub */
  check: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  ai_spark: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 1v3M9 14v3M1 9h3M14 9h3M3.22 3.22l2.12 2.12M12.66 12.66l2.12 2.12M3.22 14.78l2.12-2.12M12.66 5.34l2.12-2.12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="9" cy="9" r="3" fill="currentColor" opacity=".25"/></svg>`,

  /* Social */
  twitter: `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M14.36 4.47c.01.16.01.32.01.47 0 4.8-3.65 10.33-10.33 10.33-2.05 0-3.96-.6-5.57-1.63.29.03.57.05.87.05 1.7 0 3.27-.58 4.51-1.55a3.64 3.64 0 01-3.4-2.52c.23.03.45.05.69.05.33 0 .65-.04.96-.12A3.64 3.64 0 01.6 5.96v-.05c.54.3 1.16.48 1.82.5A3.64 3.64 0 011.3 3.3a10.32 10.32 0 007.49 3.8 4.1 4.1 0 01-.1-.83 3.63 3.63 0 016.28-2.48 7.14 7.14 0 002.31-.88 3.64 3.64 0 01-1.6 2.01 7.26 7.26 0 002.09-.57 7.83 7.83 0 01-1.81 1.12z"/></svg>`,
  youtube: `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M15.6 4.2a2 2 0 00-1.41-1.41C12.9 2.4 8 2.4 8 2.4s-4.9 0-6.19.38A2 2 0 00.4 4.2C0 5.5 0 8 0 8s0 2.5.4 3.8a2 2 0 001.41 1.41C3.1 13.6 8 13.6 8 13.6s4.9 0 6.19-.38a2 2 0 001.41-1.41C16 10.5 16 8 16 8s0-2.5-.4-3.8zM6.4 10.4V5.6l4.4 2.4-4.4 2.4z"/></svg>`,
  linkedin: `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M14.82 0H1.18C.53 0 0 .53 0 1.18v13.64C0 15.47.53 16 1.18 16h13.64c.65 0 1.18-.53 1.18-1.18V1.18C16 .53 15.47 0 14.82 0zM4.74 13.62H2.37V6h2.37v7.62zm-1.19-8.66A1.37 1.37 0 112 3.6a1.37 1.37 0 011.55 1.36zM13.62 13.62h-2.37V9.9c0-.88-.02-2.02-1.23-2.02-1.23 0-1.42.96-1.42 1.95v3.8H6.24V6h2.27v1.04h.03c.32-.6 1.09-1.23 2.24-1.23 2.39 0 2.84 1.57 2.84 3.62v4.19z"/></svg>`
};

/* ============================================================
   LANGUAGE CONFIG
   ============================================================ */
const LANGUAGES = [
  { code:'en',    name:'English',              flag:'🇺🇸' },
  { code:'es',    name:'Español',              flag:'🇪🇸' },
  { code:'de',    name:'Deutsch',              flag:'🇩🇪' },
  { code:'fr',    name:'Français',             flag:'🇫🇷' },
  { code:'ja',    name:'日本語',                flag:'🇯🇵' },
  { code:'ko',    name:'한국어',                flag:'🇰🇷' },
  { code:'pt',    name:'Português',            flag:'🇧🇷' },
  { code:'ar',    name:'العربية',              flag:'🇸🇦' },
  { code:'it',    name:'Italiano',             flag:'🇮🇹' },
  { code:'nl',    name:'Nederlands',           flag:'🇳🇱' },
  { code:'pl',    name:'Polski',               flag:'🇵🇱' },
  { code:'tr',    name:'Türkçe',               flag:'🇹🇷' },
  { code:'id',    name:'Bahasa Indonesia',     flag:'🇮🇩' },
  { code:'th',    name:'ภาษาไทย',              flag:'🇹🇭' },
  { code:'vi',    name:'Tiếng Việt',           flag:'🇻🇳' },
  { code:'ms',    name:'Bahasa Melayu',        flag:'🇲🇾' },
  { code:'zh-cn', name:'简体中文',              flag:'🇨🇳' },
  { code:'zh-tw', name:'繁體中文',              flag:'🇹🇼' },
  { code:'ru',    name:'Русский',              flag:'🇷🇺' }
];

/* ============================================================
   NAV COMPONENT
   ============================================================ */
const Nav = {
  render(cfg = {}) {
    const lang = cfg.lang || 'en';
    const base = Utils.getBasePath();
    const langData = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];

    const navEl = document.getElementById('wps-nav');
    if (!navEl) return;

    navEl.innerHTML = `
      <div class="nav-inner">
        <a href="${base}${lang}/index.html" class="nav-logo" aria-label="WPS AI Home">
          ${Icons.logo}
        </a>

        <nav class="nav-links" aria-label="Main navigation">
          <div class="nav-item nav-item--dropdown">
            <button class="nav-link nav-link--btn" aria-expanded="false" aria-haspopup="true" data-mega="products">
              ${t('nav.products')} ${Icons.chevronDown}
            </button>
          </div>
          <div class="nav-item nav-item--dropdown">
            <button class="nav-link nav-link--btn" aria-expanded="false" aria-haspopup="true" data-mega="templates">
              ${t('nav.templates')} ${Icons.chevronDown}
            </button>
          </div>
          <a href="${base}${lang}/guides/index.html" class="nav-link">${t('nav.guides')}</a>
          <a href="${base}${lang}/pricing/index.html" class="nav-link">${t('nav.pricing')}</a>
        </nav>

        <div class="nav-actions">
          <div class="nav-item nav-item--dropdown nav-lang-wrap">
            <button class="nav-lang-btn" aria-label="Language" data-mega="lang">
              ${Icons.globe} <span>${langData.flag} ${lang.toUpperCase()}</span> ${Icons.chevronDown}
            </button>
          </div>
          <a href="#" class="nav-btn nav-btn--ghost">${t('nav.signin')}</a>
          <a href="#" class="nav-btn nav-btn--primary">${t('nav.getstarted')}</a>
        </div>

        <button class="nav-mobile-toggle" aria-label="${t('nav.open_menu')}" id="navMobileBtn">
          ${Icons.menu}
        </button>
      </div>

      ${MegaMenu.renderProducts(base, lang)}
      ${MegaMenu.renderTemplates(base, lang)}
      ${MegaMenu.renderLang(lang)}

      <div class="nav-mobile-drawer" id="navMobileDrawer">
        ${this._mobileMenu(base, lang)}
      </div>
      <div class="nav-overlay" id="navOverlay"></div>
    `;

    this._bindEvents();
  },

  _mobileMenu(base, lang) {
    return `
      <div class="mobile-header">
        <a href="${base}${lang}/index.html" class="nav-logo">${Icons.logo}</a>
        <button class="nav-mobile-close" id="navMobileClose" aria-label="${t('nav.close_menu')}">${Icons.close}</button>
      </div>
      <nav class="mobile-nav">
        <details class="mobile-details">
          <summary class="mobile-summary">${t('nav.products')} ${Icons.chevronRight}</summary>
          <ul class="mobile-submenu">
            ${[
              ['pdf-tools','index.html', t('mega.pdf_tools.label'), Icons.pdf],
              ['ai-writing','index.html', t('mega.ai_writing.label'), Icons.write],
              ['ai-slides','index.html', t('mega.ai_slides.label'), Icons.slides],
              ['ai-sheets','index.html', t('mega.ai_sheets.label'), Icons.sheets],
              ['ai-tools','index.html', t('mega.ai_tools.label'), Icons.tools],
            ].map(([cat,pg,lbl,ico]) => `<li><a href="${base}${lang}/${cat}/${pg}" class="mobile-link">${ico} ${lbl}</a></li>`).join('')}
          </ul>
        </details>
        <details class="mobile-details">
          <summary class="mobile-summary">${t('nav.templates')} ${Icons.chevronRight}</summary>
          <ul class="mobile-submenu">
            <li><a href="${base}${lang}/resume-templates/index.html" class="mobile-link">${Icons.template} Resume Templates</a></li>
            <li><a href="${base}${lang}/presentation-templates/index.html" class="mobile-link">${Icons.template} Presentation Templates</a></li>
            <li><a href="${base}${lang}/ai-sheets/excel-templates.html" class="mobile-link">${Icons.template} Excel Templates</a></li>
          </ul>
        </details>
        <a href="${base}${lang}/guides/index.html" class="mobile-link">${t('nav.guides')}</a>
        <a href="${base}${lang}/pricing/index.html" class="mobile-link">${t('nav.pricing')}</a>
      </nav>
      <div class="mobile-actions">
        <a href="#" class="nav-btn nav-btn--ghost mobile-btn-full">${t('nav.signin')}</a>
        <a href="#" class="nav-btn nav-btn--primary mobile-btn-full">${t('nav.getstarted')}</a>
      </div>
    `;
  },

  _bindEvents() {
    // Mega menu open/close
    document.querySelectorAll('[data-mega]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const key = btn.dataset.mega;
        const panel = document.getElementById(`mega-${key}`);
        if (!panel) return;
        const isOpen = panel.classList.contains('open');
        this._closeAll();
        if (!isOpen) {
          panel.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
          document.getElementById('navOverlay').classList.add('active');
        }
      });
    });

    // Close on overlay click / escape
    document.getElementById('navOverlay')?.addEventListener('click', () => this._closeAll());
    document.addEventListener('keydown', e => { if (e.key === 'Escape') this._closeAll(); });

    // Mobile toggle
    document.getElementById('navMobileBtn')?.addEventListener('click', () => {
      document.getElementById('navMobileDrawer').classList.add('open');
      document.getElementById('navOverlay').classList.add('active');
    });
    document.getElementById('navMobileClose')?.addEventListener('click', () => this._closeAll());

    // Click outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav-inner') && !e.target.closest('.mega-menu')) {
        this._closeAll();
      }
    });
  },

  _closeAll() {
    document.querySelectorAll('.mega-menu.open, .nav-mobile-drawer.open').forEach(el => el.classList.remove('open'));
    document.querySelectorAll('[aria-expanded="true"]').forEach(el => el.setAttribute('aria-expanded','false'));
    document.getElementById('navOverlay')?.classList.remove('active');
  }
};

/* ============================================================
   MEGA MENU
   ============================================================ */
const MegaMenu = {
  renderProducts(base, lang) {
    const sections = [
      {
        icon: Icons.pdf, color: '#E74C3C', key: 'pdf_tools', href: `${base}${lang}/pdf-tools/index.html`,
        items: [
          ['PDF to Word', `${base}${lang}/pdf-tools/pdf-to-word.html`],
          ['PDF to Excel', `${base}${lang}/pdf-tools/pdf-to-excel.html`],
          ['Compress PDF', `${base}${lang}/pdf-tools/compress-pdf.html`],
          ['Merge PDF',    `${base}${lang}/pdf-tools/merge-pdf.html`],
          ['Edit PDF',     `${base}${lang}/pdf-tools/edit-pdf.html`],
          ['Sign PDF',     `${base}${lang}/pdf-tools/sign-pdf.html`],
        ]
      },
      {
        icon: Icons.write, color: '#534AB7', key: 'ai_writing', href: `${base}${lang}/ai-writing/index.html`,
        items: [
          ['AI Writer',       `${base}${lang}/ai-writing/ai-writer.html`],
          ['AI Summarizer',   `${base}${lang}/ai-writing/ai-summarizer.html`],
          ['Paraphrase Tool', `${base}${lang}/ai-writing/paraphrase.html`],
          ['Grammar Checker', `${base}${lang}/ai-writing/grammar-check.html`],
          ['AI Translator',   `${base}${lang}/ai-writing/translate.html`],
          ['Email Writer',    `${base}${lang}/ai-writing/email-writer.html`],
        ]
      },
      {
        icon: Icons.slides, color: '#D24726', key: 'ai_slides', href: `${base}${lang}/ai-slides/index.html`,
        items: [
          ['AI Presentation Maker', `${base}${lang}/ai-slides/ai-ppt.html`],
          ['Slide Designer',         `${base}${lang}/ai-slides/design.html`],
          ['Chart Maker',            `${base}${lang}/ai-slides/chart-maker.html`],
          ['Mind Map Maker',         `${base}${lang}/ai-slides/mind-map.html`],
          ['Slides to Video',        `${base}${lang}/ai-slides/to-video.html`],
          ['Presentation Themes',    `${base}${lang}/ai-slides/theme.html`],
        ]
      },
      {
        icon: Icons.sheets, color: '#217346', key: 'ai_sheets', href: `${base}${lang}/ai-sheets/index.html`,
        items: [
          ['AI Excel Assistant', `${base}${lang}/ai-sheets/ai-excel.html`],
          ['Formula Generator',  `${base}${lang}/ai-sheets/formula-gen.html`],
          ['Data Analysis AI',   `${base}${lang}/ai-sheets/data-analysis.html`],
          ['Chart Generator',    `${base}${lang}/ai-sheets/chart-gen.html`],
          ['CSV to Excel',       `${base}${lang}/ai-sheets/csv-to-excel.html`],
        ]
      },
      {
        icon: Icons.tools, color: '#185FA5', key: 'ai_tools', href: `${base}${lang}/ai-tools/index.html`,
        items: [
          ['QR Code Generator', `${base}${lang}/ai-tools/qr-gen.html`],
          ['Image Compressor',  `${base}${lang}/ai-tools/img-compress.html`],
          ['Background Remover',`${base}${lang}/ai-tools/bg-remover.html`],
          ['Chat with PDF',     `${base}${lang}/ai-tools/pdf-chat.html`],
          ['Image to Text',     `${base}${lang}/ai-tools/img-to-text.html`],
          ['AI Detector',       `${base}${lang}/ai-tools/ai-detector.html`],
        ]
      }
    ];

    return `<div class="mega-menu mega-menu--products" id="mega-products" role="dialog" aria-label="Products">
      <div class="mega-inner">
        ${sections.map(s => `
          <div class="mega-col">
            <a href="${s.href}" class="mega-cat-title">
              <span class="mega-cat-icon" style="color:${s.color}">${s.icon}</span>
              <span>
                <strong>${t(`mega.${s.key}.label`)}</strong>
                <span class="mega-cat-desc">${t(`mega.${s.key}.desc`)}</span>
              </span>
            </a>
            <ul class="mega-list">
              ${s.items.map(([name,url]) => `<li><a href="${url}" class="mega-link">${name}</a></li>`).join('')}
              <li><a href="${s.href}" class="mega-link mega-link--see-all">${t('mega.see_all')}</a></li>
            </ul>
          </div>
        `).join('')}
      </div>
    </div>`;
  },

  renderTemplates(base, lang) {
    return `<div class="mega-menu mega-menu--slim" id="mega-templates" role="dialog" aria-label="Templates">
      <div class="mega-inner mega-inner--slim">
        <div class="mega-col">
          <p class="mega-section-label">Document Templates</p>
          <ul class="mega-list">
            <li><a href="${base}${lang}/resume-templates/index.html" class="mega-link">${Icons.template} Resume Templates</a></li>
            <li><a href="${base}${lang}/ai-writing/cover-letter.html" class="mega-link">${Icons.template} Cover Letter Templates</a></li>
          </ul>
        </div>
        <div class="mega-col">
          <p class="mega-section-label">Presentation Templates</p>
          <ul class="mega-list">
            <li><a href="${base}${lang}/presentation-templates/index.html" class="mega-link">${Icons.slides} Presentation Templates</a></li>
            <li><a href="${base}${lang}/ai-slides/theme.html" class="mega-link">${Icons.slides} Slide Themes</a></li>
          </ul>
        </div>
        <div class="mega-col">
          <p class="mega-section-label">Spreadsheet Templates</p>
          <ul class="mega-list">
            <li><a href="${base}${lang}/ai-sheets/excel-templates.html" class="mega-link">${Icons.sheets} Excel Templates</a></li>
          </ul>
        </div>
      </div>
    </div>`;
  },

  renderLang(currentLang) {
    return `<div class="mega-menu mega-menu--lang" id="mega-lang" role="dialog" aria-label="Language selector">
      <div class="lang-grid">
        ${LANGUAGES.map(l => `
          <a href="${I18n.switchUrl(l.code)}" class="lang-option${l.code===currentLang?' lang-option--active':''}"
             hreflang="${l.code}">
            <span class="lang-flag">${l.flag}</span>
            <span class="lang-name">${l.name}</span>
          </a>
        `).join('')}
      </div>
    </div>`;
  }
};

/* ============================================================
   BREADCRUMB COMPONENT
   ============================================================ */
const Breadcrumb = {
  /**
   * @param {Array} items — [{ label, href }], last item has no href
   */
  render(items = []) {
    const el = document.getElementById('wps-breadcrumb');
    if (!el || !items.length) return;
    const base = Utils.getBasePath();
    const lang = Utils.getLangFromPath();

    const crumbs = [
      { label: t('breadcrumb.home'), href: `${base}${lang}/index.html` },
      ...items
    ];

    el.innerHTML = `<nav aria-label="Breadcrumb" class="breadcrumb">
      <ol class="breadcrumb-list">
        ${crumbs.map((c, i) => `
          <li class="breadcrumb-item${i===crumbs.length-1?' breadcrumb-item--current':''}">
            ${i < crumbs.length-1
              ? `<a href="${c.href}" class="breadcrumb-link">${c.label}</a><span class="breadcrumb-sep" aria-hidden="true">${Icons.chevronRight}</span>`
              : `<span aria-current="page">${c.label}</span>`
            }
          </li>
        `).join('')}
      </ol>
    </nav>`;
  }
};

/* ============================================================
   SIDEBAR COMPONENT (for guide/tool detail pages)
   ============================================================ */
const Sidebar = {
  render(items = [], activeId = '') {
    const el = document.getElementById('wps-sidebar');
    if (!el) return;
    el.innerHTML = `<aside class="sidebar">
      <nav aria-label="Section navigation">
        <ul class="sidebar-list">
          ${items.map(item => `
            <li class="sidebar-item${item.id===activeId?' sidebar-item--active':''}">
              <a href="#${item.id}" class="sidebar-link">${item.label}</a>
              ${item.children ? `
                <ul class="sidebar-sub">
                  ${item.children.map(c => `
                    <li><a href="#${c.id}" class="sidebar-sub-link">${c.label}</a></li>
                  `).join('')}
                </ul>` : ''}
            </li>
          `).join('')}
        </ul>
      </nav>
    </aside>`;
  }
};

/* ============================================================
   SCENARIO TAB NAV
   ============================================================ */
const ScenarioNav = {
  render(tabs = [], activeId = '') {
    const el = document.getElementById('wps-scenario-nav');
    if (!el) return;
    el.innerHTML = `<div class="scenario-tabs" role="tablist" aria-label="Use cases">
      ${tabs.map(tab => `
        <button
          role="tab"
          class="scenario-tab${tab.id===activeId?' scenario-tab--active':''}"
          aria-selected="${tab.id===activeId}"
          data-tab="${tab.id}">
          ${tab.icon ? `<span class="scenario-tab-icon">${tab.icon}</span>` : ''}
          ${tab.label}
        </button>
      `).join('')}
    </div>`;

    el.querySelectorAll('.scenario-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        el.querySelectorAll('.scenario-tab').forEach(b => {
          b.classList.remove('scenario-tab--active');
          b.setAttribute('aria-selected','false');
        });
        btn.classList.add('scenario-tab--active');
        btn.setAttribute('aria-selected','true');
        document.querySelectorAll('.scenario-panel').forEach(p => {
          p.hidden = p.dataset.tab !== btn.dataset.tab;
        });
      });
    });
  }
};

/* ============================================================
   FOOTER COMPONENT
   ============================================================ */
const Footer = {
  render(cfg = {}) {
    const lang = cfg.lang || Utils.getLangFromPath();
    const base = Utils.getBasePath();
    const el = document.getElementById('wps-footer');
    if (!el) return;

    const year = new Date().getFullYear();

    el.innerHTML = `
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <a href="${base}${lang}/index.html" class="nav-logo footer-logo">${Icons.logo}</a>
          <p class="footer-tagline">${t('footer.tagline')}</p>
          <div class="footer-social">
            <a href="#" aria-label="Twitter" class="footer-social-link">${Icons.twitter}</a>
            <a href="#" aria-label="YouTube" class="footer-social-link">${Icons.youtube}</a>
            <a href="#" aria-label="LinkedIn" class="footer-social-link">${Icons.linkedin}</a>
          </div>
        </div>

        <div class="footer-col">
          <h4 class="footer-heading">${t('footer.products')}</h4>
          <ul class="footer-links">
            <li><a href="${base}${lang}/pdf-tools/index.html">${t('footer.pdf_tools')}</a></li>
            <li><a href="${base}${lang}/ai-writing/index.html">${t('footer.ai_writing')}</a></li>
            <li><a href="${base}${lang}/ai-slides/index.html">${t('footer.ai_slides')}</a></li>
            <li><a href="${base}${lang}/ai-sheets/index.html">${t('footer.ai_sheets')}</a></li>
            <li><a href="${base}${lang}/ai-tools/index.html">${t('footer.ai_tools')}</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4 class="footer-heading">${t('footer.resources')}</h4>
          <ul class="footer-links">
            <li><a href="${base}${lang}/resume-templates/index.html">${t('footer.templates')}</a></li>
            <li><a href="${base}${lang}/guides/index.html">${t('footer.guides')}</a></li>
            <li><a href="${base}${lang}/blog/index.html">${t('footer.blog')}</a></li>
            <li><a href="#" target="_blank" rel="noopener">${t('footer.api_docs')} ${Icons.external}</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4 class="footer-heading">${t('footer.company')}</h4>
          <ul class="footer-links">
            <li><a href="#">${t('footer.about')}</a></li>
            <li><a href="#">${t('footer.careers')}</a></li>
            <li><a href="#">${t('footer.press')}</a></li>
            <li><a href="#">${t('footer.contact')}</a></li>
          </ul>
        </div>

        <div class="footer-col footer-col--lang">
          <h4 class="footer-heading">${t('footer.language_label')}</h4>
          <select class="footer-lang-select" onchange="window.location.href=I18n.switchUrl(this.value)">
            ${LANGUAGES.map(l => `<option value="${l.code}"${l.code===lang?' selected':''}>${l.flag} ${l.name}</option>`).join('')}
          </select>
        </div>
      </div>

      <div class="footer-bottom">
        <p>${Utils.interpolate(t('footer.copyright'), { year })}</p>
        <ul class="footer-legal">
          <li><a href="#">${t('footer.privacy')}</a></li>
          <li><a href="#">${t('footer.terms')}</a></li>
          <li><a href="#">${t('footer.cookies')}</a></li>
        </ul>
      </div>
    </footer>`;
  }
};

/* ============================================================
   TOOL UPLOAD AREA (reusable drop zone)
   ============================================================ */
const UploadArea = {
  render(el, cfg = {}) {
    if (!el) return;
    const id = cfg.id || 'upload-input';
    const accept = cfg.accept || '.pdf';
    const maxMB = cfg.maxMB || 200;
    el.innerHTML = `
      <div class="upload-zone" id="${id}-zone">
        <div class="upload-icon">${Icons.upload}</div>
        <p class="upload-title">${t('tool.upload_area.title')}</p>
        <p class="upload-sub">${t('tool.upload_area.subtitle')}</p>
        <p class="upload-formats">${t('tool.upload_area.formats')}: <strong>${accept}</strong> &nbsp;·&nbsp; ${t('tool.upload_area.size_limit')}: <strong>${maxMB}MB</strong></p>
        <label class="upload-btn">
          Browse Files
          <input type="file" id="${id}" accept="${accept}" hidden ${cfg.multiple?'multiple':''}>
        </label>
        <p class="upload-limit-note">${t('tool.daily_limit')}</p>
      </div>
    `;

    const zone = el.querySelector('.upload-zone');
    const input = el.querySelector(`#${id}`);

    ['dragover','dragenter'].forEach(ev => zone.addEventListener(ev, e => { e.preventDefault(); zone.classList.add('drag-over'); }));
    ['dragleave','drop'].forEach(ev => zone.addEventListener(ev, () => zone.classList.remove('drag-over')));
    zone.addEventListener('drop', e => { e.preventDefault(); if(e.dataTransfer.files.length) cfg.onFile?.(e.dataTransfer.files[0]); });
    input?.addEventListener('change', () => { if(input.files.length) cfg.onFile?.(input.files[0]); });
  }
};

/* ============================================================
   QR CODE WIDGET
   ============================================================ */
const QRWidget = {
  render(el, cfg = {}) {
    if (!el) return;
    el.innerHTML = `
      <div class="qr-widget">
        <div class="qr-input-area">
          <label class="form-label">${t('ai_tools.qr_gen.input_placeholder')}</label>
          <div class="qr-input-row">
            <input type="text" id="qr-input" class="form-input" placeholder="${t('ai_tools.qr_gen.input_placeholder')}" value="https://wps.ai">
            <button class="btn btn--primary" id="qr-generate">${t('ai_tools.qr_gen.generate_btn')}</button>
          </div>
          <div class="qr-options">
            <label class="form-label">${t('ai_tools.qr_gen.color_label')}</label>
            <input type="color" id="qr-color" value="#000000" class="color-input">
            <label class="form-label">${t('ai_tools.qr_gen.bg_label')}</label>
            <input type="color" id="qr-bg" value="#ffffff" class="color-input">
            <label class="form-label">${t('ai_tools.qr_gen.size_label')}</label>
            <select id="qr-size" class="form-select">
              <option value="200">200×200</option>
              <option value="300" selected>300×300</option>
              <option value="400">400×400</option>
              <option value="500">500×500</option>
            </select>
          </div>
        </div>
        <div class="qr-preview-area">
          <div class="qr-preview" id="qr-preview">
            <canvas id="qr-canvas" width="300" height="300"></canvas>
          </div>
          <button class="btn btn--secondary" id="qr-download" style="display:none">${t('ai_tools.qr_gen.download_btn')}</button>
        </div>
      </div>
    `;
    this._bindQR();
  },

  _bindQR() {
    const genBtn = document.getElementById('qr-generate');
    const dlBtn  = document.getElementById('qr-download');
    const input  = document.getElementById('qr-input');

    genBtn?.addEventListener('click', () => this._generate());
    input?.addEventListener('keydown', e => { if(e.key==='Enter') this._generate(); });

    dlBtn?.addEventListener('click', () => {
      const canvas = document.getElementById('qr-canvas');
      Utils.download(canvas.toDataURL('image/png'), 'qrcode.png');
    });

    // Auto-generate on load
    setTimeout(() => this._generate(), 100);
  },

  _generate() {
    const text  = document.getElementById('qr-input')?.value || 'https://wps.ai';
    const color = document.getElementById('qr-color')?.value || '#000000';
    const bg    = document.getElementById('qr-bg')?.value || '#ffffff';
    const size  = parseInt(document.getElementById('qr-size')?.value || '300');
    const canvas = document.getElementById('qr-canvas');
    if (!canvas) return;
    canvas.width = size; canvas.height = size;
    const ctx = canvas.getContext('2d');

    // Simple QR placeholder — draw a styled square pattern
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, size, size);

    // Draw fake QR grid (real QR needs a library like qrcode.js)
    const cell = size / 25;
    const pattern = this._getPattern(text);
    ctx.fillStyle = color;
    for(let r=0;r<25;r++) for(let c=0;c<25;c++) {
      if(pattern[r]?.[c]) ctx.fillRect(c*cell, r*cell, cell-1, cell-1);
    }

    document.getElementById('qr-download').style.display = 'block';
  },

  _getPattern(text) {
    // Pseudo-random deterministic pattern based on text
    let hash = 0;
    for(const ch of text) hash = ((hash << 5) - hash) + ch.charCodeAt(0);
    const grid = [];
    for(let r=0;r<25;r++) {
      grid[r] = [];
      for(let c=0;c<25;c++) {
        // Always draw finder patterns
        const inFinder = (r<7&&c<7)||(r<7&&c>17)||(r>17&&c<7);
        const onBorder = (r===0||r===6||c===0||c===6)&&(r<=6&&c<=6) ||
                         (r===0||r===6||c===18||c===24)&&(r<=6&&c>=18) ||
                         (r===18||r===24||c===0||c===6)&&(r>=18&&c<=6);
        if(onBorder || (r===3&&c===3)||(r===3&&c===21)||(r===21&&c===3)) { grid[r][c]=1; continue; }
        if(inFinder && !onBorder) { grid[r][c] = (r>0&&r<6&&c>0&&c<6)||(r>18&&r<24&&c>0&&c<6)||(r>0&&r<6&&c>18&&c<24) ? 1 : 0; continue; }
        // Timing patterns
        if(r===6||c===6) { grid[r][c] = (r+c)%2===0 ? 1 : 0; continue; }
        // Data
        const n = hash ^ (r*31+c*17+text.length*7);
        grid[r][c] = (n >>> (c%32)) & 1;
      }
    }
    return grid;
  }
};

/* ============================================================
   AI TEXT WIDGET (for AI Writer, Summarizer, etc.)
   ============================================================ */
const AITextWidget = {
  render(el, cfg = {}) {
    if (!el) return;
    const tones = t('writing.ai_writer.tones') || ['Professional','Casual','Persuasive'];
    const lengths = t('writing.ai_writer.lengths') || ['Short','Medium','Long'];
    el.innerHTML = `
      <div class="ai-widget">
        <div class="ai-input-area">
          <textarea
            id="ai-prompt"
            class="ai-textarea"
            placeholder="${cfg.placeholder || t('writing.ai_writer.placeholder')}"
            rows="5"
            maxlength="2000"
          ></textarea>
          <div class="ai-controls">
            <div class="ai-selects">
              ${cfg.showTone !== false ? `
                <div class="ai-select-wrap">
                  <label class="form-label">${t('writing.ai_writer.tone_label')}</label>
                  <select id="ai-tone" class="form-select form-select--sm">
                    ${(Array.isArray(tones)?tones:[]).map(t=>t?`<option>${t}</option>`:'').join('')}
                  </select>
                </div>` : ''}
              ${cfg.showLength !== false ? `
                <div class="ai-select-wrap">
                  <label class="form-label">${t('writing.ai_writer.length_label')}</label>
                  <select id="ai-length" class="form-select form-select--sm">
                    ${(Array.isArray(lengths)?lengths:[]).map(l=>l?`<option>${l}</option>`:'').join('')}
                  </select>
                </div>` : ''}
            </div>
            <button class="btn btn--primary ai-generate-btn" id="ai-generate">
              ${Icons.ai_spark} ${cfg.btnLabel || t('writing.ai_writer.generate_btn')}
            </button>
          </div>
        </div>
        <div class="ai-output-area" id="ai-output" style="display:none">
          <div class="ai-output-header">
            <span class="ai-output-label">Generated Result</span>
            <div class="ai-output-actions">
              <button class="btn-icon" id="ai-copy" title="${t('common.copy_link')}">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="5" y="5" width="8" height="9" rx="1.5" stroke="currentColor" stroke-width="1.3"/><path d="M3 11V3a1 1 0 011-1h7" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
              </button>
              <button class="btn-icon" id="ai-retry" title="${t('common.retry')}">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8a6 6 0 106-6H4M4 2v4H8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
              </button>
            </div>
          </div>
          <div class="ai-output-content" id="ai-output-text"></div>
          <p class="ai-upgrade-note">
            ${Icons.ai_spark} ${t('tool.sign_in_for_more')} — <a href="#">${t('common.upgrade')}</a>
          </p>
        </div>
      </div>
    `;

    document.getElementById('ai-generate')?.addEventListener('click', () => this._generate(cfg));
    document.getElementById('ai-copy')?.addEventListener('click', async () => {
      const txt = document.getElementById('ai-output-text')?.textContent;
      if (await Utils.copyToClipboard(txt)) Utils.toast(t('common.copied'));
    });
    document.getElementById('ai-retry')?.addEventListener('click', () => this._generate(cfg));
  },

  _generate(cfg) {
    const outputEl = document.getElementById('ai-output');
    const textEl   = document.getElementById('ai-output-text');
    const genBtn   = document.getElementById('ai-generate');
    const prompt   = document.getElementById('ai-prompt')?.value?.trim();
    if (!prompt) { Utils.toast('Please enter a prompt first', 'warning'); return; }

    genBtn.disabled = true;
    genBtn.textContent = t('common.loading');
    outputEl.style.display = 'none';

    // Simulate AI generation with a placeholder
    setTimeout(() => {
      textEl.innerHTML = `<p><em>This is a sample AI-generated result for: "${Utils.escapeHtml(prompt)}"</em></p>
        <p>In a live environment, this would be replaced by actual AI-generated content from WPS AI's language models. The output would be tailored to your selected tone and length preferences.</p>
        <p>WPS AI supports generating blog posts, emails, summaries, essays, product descriptions, and more — all optimized for quality and relevance.</p>`;
      outputEl.style.display = 'block';
      genBtn.disabled = false;
      genBtn.innerHTML = `${Icons.ai_spark} ${cfg.btnLabel || t('writing.ai_writer.generate_btn')}`;
    }, 1500);
  }
};

/* ============================================================
   TOOL CARDS (for hub pages)
   ============================================================ */
const ToolCards = {
  render(el, tools = [], base = '', lang = 'en') {
    if (!el) return;
    el.innerHTML = `<div class="tool-grid">
      ${tools.map(tool => `
        <a href="${base}${lang}/${tool.category}/${tool.slug}.html" class="tool-card">
          <div class="tool-card-icon" style="--icon-color:${tool.color}">
            ${this._getIcon(tool.icon, tool.color)}
          </div>
          <div class="tool-card-body">
            <h3 class="tool-card-title">${this._getTitle(tool)}</h3>
            <p class="tool-card-desc">${this._getDesc(tool)}</p>
          </div>
          ${tool.popular ? `<span class="tool-card-badge">${t('common.popular')}</span>` : ''}
        </a>
      `).join('')}
    </div>`;
  },

  _getTitle(tool) {
    const key = tool.category.replace(/-/g,'_') + '.' + tool.id.replace(/-/g,'_') + '.title';
    const altKey = tool.category.replace(/-/g,'') + '.' + tool.id.replace(/-/g,'_') + '.title';
    return t(key) !== key ? t(key) : (t(altKey) !== altKey ? t(altKey) : tool.id);
  },
  _getDesc(tool) {
    const key = tool.category.replace(/-/g,'_') + '.' + tool.id.replace(/-/g,'_') + '.subtitle';
    return t(key) !== key ? t(key) : '';
  },
  _getIcon(iconKey, color) {
    const map = {
      'pdf-word': Icons.pdf, 'pdf-excel': Icons.sheets, 'pdf-ppt': Icons.slides,
      'pdf-jpg': `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="2" width="16" height="16" rx="2" stroke="${color}" stroke-width="1.4"/><circle cx="7" cy="7" r="2" stroke="${color}" stroke-width="1.3"/><path d="M2 14l4-4 3 3 3-3 4 4" stroke="${color}" stroke-width="1.3" stroke-linejoin="round"/></svg>`,
      'word-pdf': Icons.write, 'excel-pdf': Icons.sheets, 'ppt-pdf': Icons.slides,
      'jpg-pdf': `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="2" width="16" height="16" rx="2" stroke="${color}" stroke-width="1.4"/><circle cx="7" cy="7" r="2" stroke="${color}" stroke-width="1.3"/><path d="M2 14l4-4 3 3 3-3 4 4" stroke="${color}" stroke-width="1.3" stroke-linejoin="round"/></svg>`,
      'compress': `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 3v14M3 10l7 7 7-7" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      'merge': `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10h12M10 4l6 6-6 6" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      'split': `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 3v14M4 8L10 3l6 5M4 12l6 5 6-5" stroke="${color}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      'edit': Icons.write, 'sign': `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 15c3-1 5-4 6-8 1 2 2 3 4 3M3 15l2-1M17 5l-2-2-8 8-1 3 3-1 8-8z" stroke="${color}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      'protect': `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2l7 3v5c0 4-3.5 7-7 8-3.5-1-7-4-7-8V5l7-3z" stroke="${color}" stroke-width="1.4" stroke-linejoin="round"/><path d="M7 10l2 2 4-4" stroke="${color}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      'ai-write': Icons.write, 'summarize': `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 5h12M4 9h12M4 13h8" stroke="${color}" stroke-width="1.5" stroke-linecap="round"/><circle cx="16" cy="14" r="3" stroke="${color}" stroke-width="1.3"/><path d="M16 13v2M15 14h2" stroke="${color}" stroke-width="1.2" stroke-linecap="round"/></svg>`,
      'rephrase': `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 8V5a1 1 0 011-1h10a1 1 0 011 1v3M4 12v3a1 1 0 001 1h10a1 1 0 001-1v-3" stroke="${color}" stroke-width="1.4" stroke-linecap="round"/><path d="M7 8l3 2 3-2M7 12l3-2 3 2" stroke="${color}" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      'grammar': `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 15L8 5l3 10M6.5 11h3" stroke="${color}" stroke-width="1.5" stroke-linecap="round"/><path d="M14 8c-.8 0-1.5.4-1.5 1 0 1.5 3 1 3 2.5 0 .8-.8 1.5-1.5 1.5" stroke="${color}" stroke-width="1.4" stroke-linecap="round"/></svg>`,
      'translate': `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 5h9M7 3v2M5 5c0 3.5 2 5.5 5 6M9 5c0 1 .5 2.5 1.5 3.5" stroke="${color}" stroke-width="1.4" stroke-linecap="round"/><path d="M10 15l2-5 2 5M11 13.5h2" stroke="${color}" stroke-width="1.4" stroke-linecap="round"/><path d="M17 5v10" stroke="${color}" stroke-width="1.3" stroke-linecap="round"/></svg>`,
      'email': `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="5" width="16" height="12" rx="1.5" stroke="${color}" stroke-width="1.4"/><path d="M2 7l8 5 8-5" stroke="${color}" stroke-width="1.4" stroke-linecap="round"/></svg>`,
      'letter': `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="2" width="14" height="17" rx="1.5" stroke="${color}" stroke-width="1.4"/><path d="M6 6h8M6 10h8M6 14h5" stroke="${color}" stroke-width="1.3" stroke-linecap="round"/></svg>`,
      'blog': Icons.write, 'essay': `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="2" width="14" height="17" rx="1.5" stroke="${color}" stroke-width="1.4"/><path d="M6 6h8M6 9h8M6 12h8M6 15h5" stroke="${color}" stroke-width="1.3" stroke-linecap="round"/></svg>`,
      'product': Icons.tools,
      'ai-ppt': Icons.slides, 'outline': `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 4h12M4 8h8M4 12h10M4 16h6" stroke="${color}" stroke-width="1.5" stroke-linecap="round"/></svg>`,
      'design': `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="3" width="16" height="12" rx="1.5" stroke="${color}" stroke-width="1.4"/><circle cx="10" cy="9" r="3" stroke="${color}" stroke-width="1.3"/></svg>`,
      'theme': `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7.5" stroke="${color}" stroke-width="1.4"/><path d="M10 2.5v15M2.5 10h15M4.4 4.4l11.2 11.2M15.6 4.4L4.4 15.6" stroke="${color}" stroke-width="1.2" stroke-linecap="round" opacity=".4"/></svg>`,
      'video': `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="4" width="12" height="12" rx="1.5" stroke="${color}" stroke-width="1.4"/><path d="M14 8l4-2v8l-4-2V8z" stroke="${color}" stroke-width="1.4" stroke-linejoin="round"/></svg>`,
      'chart': `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="12" width="4" height="6" rx="1" fill="${color}"/><rect x="8" y="7" width="4" height="11" rx="1" fill="${color}" opacity=".7"/><rect x="14" y="3" width="4" height="15" rx="1" fill="${color}" opacity=".4"/></svg>`,
      'mindmap': `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="3" fill="${color}"/><circle cx="3" cy="4" r="2" stroke="${color}" stroke-width="1.2"/><circle cx="17" cy="4" r="2" stroke="${color}" stroke-width="1.2"/><circle cx="3" cy="16" r="2" stroke="${color}" stroke-width="1.2"/><circle cx="17" cy="16" r="2" stroke="${color}" stroke-width="1.2"/><line x1="8" y1="8" x2="5" y2="6" stroke="${color}" stroke-width="1.2"/><line x1="12" y1="8" x2="15" y2="6" stroke="${color}" stroke-width="1.2"/><line x1="8" y1="12" x2="5" y2="14" stroke="${color}" stroke-width="1.2"/><line x1="12" y1="12" x2="15" y2="14" stroke="${color}" stroke-width="1.2"/></svg>`,
      'ai-excel': Icons.sheets, 'formula': `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><text x="4" y="15" font-size="14" font-family="monospace" fill="${color}">fx</text></svg>`,
      'analysis': `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M2 14l4-5 4 3 4-6 4 3" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      'csv': `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="2" width="14" height="16" rx="1.5" stroke="${color}" stroke-width="1.4"/><path d="M3 7h14M8 7v11M3 11h14" stroke="${color}" stroke-width="1.2"/></svg>`,
      'templates': Icons.template,
      'qr': Icons.qr,
      'ocr': Icons.img_to_text || `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="2" width="16" height="14" rx="1.5" stroke="${color}" stroke-width="1.4"/><path d="M5 7h10M5 11h7" stroke="${color}" stroke-width="1.3" stroke-linecap="round"/><circle cx="14" cy="16" r="3" stroke="${color}" stroke-width="1.3"/><path d="M16 18l2 2" stroke="${color}" stroke-width="1.3" stroke-linecap="round"/></svg>`,
      'bg-remove': `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="8" cy="8" r="4" stroke="${color}" stroke-width="1.4"/><path d="M12 12l6 6M3 3l14 14" stroke="${color}" stroke-width="1.4" stroke-linecap="round" opacity=".3"/></svg>`,
      'chat': `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v9a1 1 0 01-1 1H7l-4 3V4z" stroke="${color}" stroke-width="1.4" stroke-linejoin="round"/><path d="M7 8h6M7 11h4" stroke="${color}" stroke-width="1.3" stroke-linecap="round"/></svg>`,
      'detector': `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7.5" stroke="${color}" stroke-width="1.4"/><path d="M10 6v5l3 3" stroke="${color}" stroke-width="1.5" stroke-linecap="round"/></svg>`
    };
    return map[iconKey] || `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="3" width="14" height="14" rx="2" stroke="${color}" stroke-width="1.4"/></svg>`;
  }
};
