/**
 * WPS AI — App Entry Point
 * Reads PAGE_CONFIG from each HTML page and renders the correct layout.
 *
 * PAGE_CONFIG shape:
 * {
 *   type: 'home' | 'tool' | 'hub' | 'template-parent' | 'template-child' | 'guide',
 *   lang: 'en',
 *   category: 'pdf-tools' | 'ai-writing' | 'ai-slides' | 'ai-sheets' | 'ai-tools',
 *   tool: 'pdf-to-word',      // for tool pages
 *   template: 'r-modern-pro', // for template detail
 *   guide: 'how-to-...',      // for guide pages
 *   templateType: 'resume' | 'presentation' | 'excel' // for template pages
 * }
 */

(async function() {
  const cfg = typeof PAGE_CONFIG !== 'undefined' ? PAGE_CONFIG : {};
  const lang = cfg.lang || Utils.getLangFromPath() || 'en';

  // Init i18n
  await I18n.init(lang);

  // Set RTL direction
  if (I18n.isRTL()) document.documentElement.setAttribute('dir', 'rtl');

  // Render shared Nav & Footer
  Nav.render({ lang });
  Footer.render({ lang });

  // Route to layout renderer
  const base = Utils.getBasePath();
  switch (cfg.type) {
    case 'home':           await renderHome(lang, base); break;
    case 'hub':            await renderHub(cfg, lang, base); break;
    case 'tool':           await renderTool(cfg, lang, base); break;
    case 'template-parent':await renderTemplateParent(cfg, lang, base); break;
    case 'template-child': await renderTemplateDetail(cfg, lang, base); break;
    case 'guide':          await renderGuide(cfg, lang, base); break;
    case 'guide-hub':      await renderGuideHub(lang, base); break;
    case 'pricing':        await renderPricing(lang, base); break;
    default:               break;
  }
})();

/* ============================================================
   HOME PAGE
   ============================================================ */
async function renderHome(lang, base) {
  const main = document.getElementById('wps-main');
  if (!main) return;

  main.innerHTML = `
    <!-- HERO -->
    <section class="hero">
      <div class="container">
        <div class="hero-badge">${t('home.hero_badge')}</div>
        <h1 class="hero-title">${t('home.hero_title')}</h1>
        <p class="hero-subtitle">${t('home.hero_subtitle')}</p>
        <div class="hero-actions">
          <a href="#" class="btn btn--primary btn--lg">${t('home.hero_cta_primary')}</a>
          <a href="${base}${lang}/guides/index.html" class="btn btn--ghost btn--lg">${t('home.hero_cta_secondary')}</a>
        </div>
      </div>
    </section>

    <!-- STATS -->
    <section class="stats-bar">
      <div class="container">
        <div class="stats-grid">
          ${[
            [t('home.stats_users'), t('home.stats_users_label')],
            [t('home.stats_countries'), t('home.stats_countries_label')],
            [t('home.stats_languages'), t('home.stats_languages_label')],
            [t('home.stats_files'), t('home.stats_files_label')],
          ].map(([v,l]) => `<div class="stat-item"><strong class="stat-val">${v}</strong><span class="stat-label">${l}</span></div>`).join('')}
        </div>
      </div>
    </section>

    <!-- PRODUCTS -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">${t('home.product_section_title')}</h2>
        <div class="products-grid">
          ${[
            { href:`${base}${lang}/pdf-tools/index.html`,  color:'#E74C3C', icon:'pdf',    title:t('mega.pdf_tools.label'),   desc:t('mega.pdf_tools.desc') },
            { href:`${base}${lang}/ai-writing/index.html`, color:'#534AB7', icon:'write',  title:t('mega.ai_writing.label'),  desc:t('mega.ai_writing.desc') },
            { href:`${base}${lang}/ai-slides/index.html`,  color:'#D24726', icon:'slides', title:t('mega.ai_slides.label'),   desc:t('mega.ai_slides.desc') },
            { href:`${base}${lang}/ai-sheets/index.html`,  color:'#217346', icon:'sheets', title:t('mega.ai_sheets.label'),   desc:t('mega.ai_sheets.desc') },
            { href:`${base}${lang}/ai-tools/index.html`,   color:'#185FA5', icon:'tools',  title:t('mega.ai_tools.label'),    desc:t('mega.ai_tools.desc') },
          ].map(p => `
            <a href="${p.href}" class="product-card" style="--card-color:${p.color}">
              <div class="product-card-icon" style="color:${p.color}">${Icons[p.icon]}</div>
              <h3>${p.title}</h3>
              <p>${p.desc}</p>
              <span class="product-card-arrow">→</span>
            </a>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- FEATURES -->
    <section class="section section--alt">
      <div class="container">
        <h2 class="section-title">${t('home.features_title')}</h2>
        <p class="section-subtitle">${t('home.features_subtitle')}</p>
        <div class="features-grid">
          ${[
            { icon: Icons.ai_spark, title: 'AI-Powered',     desc: 'Every tool enhanced with cutting-edge AI for smarter results.' },
            { icon: Icons.globe,    title: '20 Languages',    desc: 'Fully localized in 20 languages for global teams.' },
            { icon: Icons.check,    title: 'No Installation', desc: 'Works entirely in your browser — nothing to download.' },
            { icon: Icons.tools,    title: '40+ Tools',       desc: 'One platform for all your document and productivity needs.' },
          ].map(f => `
            <div class="feature-card">
              <div class="feature-icon">${f.icon}</div>
              <h3>${f.title}</h3>
              <p>${f.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
      <div class="container">
        <h2>${t('home.cta_title')}</h2>
        <p>${t('home.cta_subtitle')}</p>
        <a href="#" class="btn btn--primary btn--lg">${t('home.cta_btn')}</a>
      </div>
    </section>
  `;
}

/* ============================================================
   HUB PAGE (category landing)
   ============================================================ */
async function renderHub(cfg, lang, base) {
  const main = document.getElementById('wps-main');
  if (!main) return;

  const toolData = await fetchJSON(`${base}data/tools.json`);
  const catKey = cfg.category.replace(/-/g,'_');
  const tools = toolData[catKey] || [];

  const titleKey = cfg.category.replace(/-/g,'_') + '.hub_title';
  const subtitleKey = cfg.category.replace(/-/g,'_') + '.hub_subtitle';

  main.innerHTML = `
    <div id="wps-breadcrumb"></div>
    <section class="hub-hero">
      <div class="container">
        <h1 class="hub-title">${t(titleKey)}</h1>
        <p class="hub-subtitle">${t(subtitleKey)}</p>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div id="tool-cards-wrap"></div>
      </div>
    </section>
  `;

  Breadcrumb.render([{ label: t(titleKey) }]);
  ToolCards.render(document.getElementById('tool-cards-wrap'), tools, base, lang);
}

/* ============================================================
   TOOL PAGE
   ============================================================ */
async function renderTool(cfg, lang, base) {
  const main = document.getElementById('wps-main');
  if (!main) return;

  const catKey   = cfg.category.replace(/-/g,'_');
  const toolKey  = cfg.tool?.replace(/-/g,'_') || '';
  const titleKey = `${catKey}.${toolKey}.title`;
  const subtitleKey = `${catKey}.${toolKey}.subtitle`;
  const descKey  = `${catKey}.${toolKey}.desc`;
  const title    = t(titleKey) !== titleKey ? t(titleKey) : cfg.tool;
  const subtitle = t(subtitleKey) !== subtitleKey ? t(subtitleKey) : '';
  const desc     = t(descKey) !== descKey ? t(descKey) : '';

  const catTitle = t(`${catKey}.hub_title`);
  const catHref  = `${base}${lang}/${cfg.category}/index.html`;

  main.innerHTML = `
    <div id="wps-breadcrumb"></div>
    <section class="tool-hero">
      <div class="container tool-hero-inner">
        <div class="tool-hero-text">
          <h1>${title}</h1>
          <p class="tool-hero-sub">${subtitle}</p>
          <p class="tool-hero-desc">${desc}</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="tool-main-layout">
          <div class="tool-widget-wrap" id="tool-widget"></div>
          <div class="tool-info-col">
            ${_howItWorks()}
            ${_toolFeatures(catKey, toolKey)}
          </div>
        </div>
      </div>
    </section>

    ${_toolFAQ(title)}
    ${_relatedTools(cfg, base, lang)}
  `;

  Breadcrumb.render([
    { label: catTitle, href: catHref },
    { label: title }
  ]);

  // Render appropriate widget
  _renderToolWidget(cfg, document.getElementById('tool-widget'));
}

function _howItWorks() {
  return `<div class="info-card">
    <h3>${t('tool.how_it_works')}</h3>
    <ol class="how-steps">
      <li><span class="step-num">1</span>${t('tool.step_upload')}</li>
      <li><span class="step-num">2</span>${t('tool.step_process')}</li>
      <li><span class="step-num">3</span>${t('tool.step_download')}</li>
    </ol>
  </div>`;
}

function _toolFeatures(catKey, toolKey) {
  const features = [];
  for(let i=1; i<=4; i++) {
    const k = `${catKey}.${toolKey}.feature_${i}`;
    const v = t(k);
    if(v && v !== k) features.push(v);
  }
  if(!features.length) return '';
  return `<div class="info-card">
    <h3>Key Features</h3>
    <ul class="feature-list">
      ${features.map(f => `<li>${Icons.check} ${f}</li>`).join('')}
    </ul>
  </div>
  <div class="info-card info-card--promo">
    <p>${t('tool.pro_features')}</p>
    <a href="#" class="btn btn--primary btn--sm">${t('tool.try_pro')}</a>
  </div>`;
}

function _toolFAQ(toolTitle) {
  return `<section class="section section--alt">
    <div class="container">
      <h2>${t('tool.faq')}</h2>
      <div class="faq-list">
        ${[
          { q: `Is ${toolTitle} free to use?`, a: `Yes! You can use ${toolTitle} for free with up to 3 conversions per day. Sign up for WPS AI Pro for unlimited access.` },
          { q: `What file formats are supported?`, a: `We support all major formats. Specific supported types are listed on the upload panel.` },
          { q: `Is my file secure?`, a: `All files are encrypted in transit and automatically deleted from our servers within 24 hours.` },
          { q: `How accurate is the conversion?`, a: `Our AI-powered engine achieves industry-leading accuracy, preserving formatting, tables, and images.` },
        ].map(item => `
          <details class="faq-item">
            <summary class="faq-q">${item.q}</summary>
            <p class="faq-a">${item.a}</p>
          </details>
        `).join('')}
      </div>
    </div>
  </section>`;
}

function _relatedTools(cfg, base, lang) {
  return `<section class="section">
    <div class="container">
      <h2>${t('tool.related_tools')}</h2>
      <div id="related-tools-wrap">Loading...</div>
    </div>
  </section>`;
  // Will be populated asynchronously by fetchJSON below
}

function _renderToolWidget(cfg, el) {
  if (!el) return;
  const cat = cfg.category;
  const tool = cfg.tool;

  // AI text tools
  if (['ai-writer','ai-summarizer','paraphrase','grammar-check','translate','email-writer','cover-letter','blog-writer','essay-writer','product-desc'].includes(tool)) {
    AITextWidget.render(el, {
      placeholder: t(`writing.${tool.replace(/-/g,'_')}.placeholder`) || 'Enter your text here...',
    });
    return;
  }

  // QR code generator
  if (tool === 'qr-gen') {
    QRWidget.render(el);
    return;
  }

  // Default: file upload widget
  UploadArea.render(el, {
    accept: _getAccept(tool),
    maxMB: 200,
    onFile: (file) => _simulateConvert(file, el)
  });
}

function _getAccept(tool) {
  if (tool.startsWith('pdf-to') || tool==='compress-pdf'||tool==='merge-pdf'||tool==='split-pdf'||tool==='edit-pdf'||tool==='sign-pdf'||tool==='protect-pdf'||tool==='pdf-chat') return '.pdf';
  if (tool==='word-to-pdf') return '.doc,.docx';
  if (tool==='excel-to-pdf'||tool==='csv-to-excel') return '.xls,.xlsx,.csv';
  if (tool==='ppt-to-pdf') return '.ppt,.pptx';
  if (tool==='jpg-to-pdf'||tool==='img-compress'||tool==='bg-remover'||tool==='img-to-text') return '.jpg,.jpeg,.png,.webp,.gif';
  return '*';
}

function _simulateConvert(file, el) {
  const zone = el.querySelector('.upload-zone');
  if (!zone) return;
  zone.innerHTML = `
    <div class="processing-state">
      <div class="processing-spinner"></div>
      <p>${t('tool.processing')}</p>
      <p class="processing-filename">${Utils.escapeHtml(file.name)} (${Utils.formatSize(file.size)})</p>
    </div>`;
  setTimeout(() => {
    zone.innerHTML = `
      <div class="complete-state">
        <div class="complete-icon">${Icons.check}</div>
        <p class="complete-title">${t('tool.complete')}</p>
        <p class="complete-filename">${Utils.escapeHtml(file.name.replace(/\.[^.]+$/,''))}_converted</p>
        <div class="complete-actions">
          <button class="btn btn--primary" onclick="Utils.toast('${t('tool.download_result')}')">
            ${t('tool.download_result')}
          </button>
          <button class="btn btn--ghost" onclick="location.reload()">
            ${t('tool.try_another')}
          </button>
        </div>
        <p class="upsell-note">${t('tool.sign_in_for_more')}</p>
      </div>`;
  }, 2000);
}

/* ============================================================
   TEMPLATE PARENT (list/browse page)
   ============================================================ */
async function renderTemplateParent(cfg, lang, base) {
  const main = document.getElementById('wps-main');
  if (!main) return;

  const tplData = await fetchJSON(`${base}data/templates.json`);
  const type = cfg.templateType || 'resume';
  const templates = tplData[`${type}_templates`] || [];

  const titleKey = `${type}.hub_title`;
  const subtitleKey = `${type}.hub_subtitle`;
  const title = t(titleKey) !== titleKey ? t(titleKey) : `${type} Templates`;
  const subtitle = t(subtitleKey) !== subtitleKey ? t(subtitleKey) : '';

  const filterKeys = type === 'resume'
    ? [['all','All'],['professional','Professional'],['creative','Creative'],['simple','Simple'],['modern','Modern'],['ats','ATS-Friendly']]
    : [['all','All'],['business','Business'],['education','Education'],['creative','Creative'],['minimal','Minimal'],['pitch','Pitch Deck']];

  main.innerHTML = `
    <div id="wps-breadcrumb"></div>
    <section class="hub-hero">
      <div class="container">
        <h1 class="hub-title">${title}</h1>
        <p class="hub-subtitle">${subtitle}</p>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="template-filters" id="tpl-filters">
          ${filterKeys.map(([k,l],i) => `
            <button class="filter-btn${i===0?' filter-btn--active':''}" data-filter="${k}">${l}</button>
          `).join('')}
        </div>
        <div class="template-grid" id="template-grid">
          ${templates.map(tpl => `
            <a href="${tpl.id}.html" class="template-card">
              <div class="template-card-thumb" style="background:${tpl.color}20;border-color:${tpl.color}30">
                <div class="template-thumb-placeholder" style="color:${tpl.color}">${Icons.template}</div>
              </div>
              <div class="template-card-info">
                <h3 class="template-card-name">${tpl.name}</h3>
                <p class="template-card-meta">${tpl.pages || tpl.slides || tpl.sheets || ''} ${tpl.pages ? 'pages' : tpl.slides ? 'slides' : 'sheets'} · ${t('common.free')}</p>
              </div>
            </a>
          `).join('')}
        </div>
      </div>
    </section>
  `;

  Breadcrumb.render([{ label: title }]);
  _bindTemplateFilters();
}

function _bindTemplateFilters() {
  const filters = document.querySelectorAll('.filter-btn');
  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('filter-btn--active'));
      btn.classList.add('filter-btn--active');
      const cat = btn.dataset.filter;
      document.querySelectorAll('.template-card').forEach(card => {
        card.style.display = (cat === 'all' || card.dataset.category === cat) ? '' : 'none';
      });
    });
  });
}

/* ============================================================
   TEMPLATE DETAIL
   ============================================================ */
async function renderTemplateDetail(cfg, lang, base) {
  const main = document.getElementById('wps-main');
  if (!main) return;
  const tplData = await fetchJSON(`${base}data/templates.json`);
  const type = cfg.templateType || 'resume';
  const templates = tplData[`${type}_templates`] || [];
  const tpl = templates.find(t => t.id === cfg.template) || templates[0];
  if (!tpl) return;

  const catHref = `${base}${lang}/${type}-templates/index.html`;
  const catTitle = t(`${type}.hub_title`);

  main.innerHTML = `
    <div id="wps-breadcrumb"></div>
    <section class="section">
      <div class="container">
        <div class="template-detail-layout">
          <div class="template-detail-preview">
            <div class="template-preview-thumb" style="background:${tpl.color}15;border-color:${tpl.color}30">
              <div style="color:${tpl.color};transform:scale(3)">${Icons.template}</div>
            </div>
          </div>
          <div class="template-detail-info">
            <h1>${tpl.name}</h1>
            <p class="tpl-meta">
              <span class="badge badge--green">${t('common.free')}</span>
              ${tpl.ats ? `<span class="badge badge--blue">ATS-Friendly</span>` : ''}
              <span>${tpl.pages||tpl.slides||tpl.sheets||1} ${tpl.pages?'page(s)':tpl.slides?'slides':'sheets'}</span>
            </p>
            <div class="tpl-actions">
              <a href="#" class="btn btn--primary btn--lg">${t('template.detail_cta')}</a>
              <a href="#" class="btn btn--ghost btn--lg">${t('template.preview')}</a>
            </div>
            <p class="tpl-sub">${t('template.detail_cta_sub')}</p>
          </div>
        </div>
      </div>
    </section>
  `;
  Breadcrumb.render([
    { label: catTitle, href: catHref },
    { label: tpl.name }
  ]);
}

/* ============================================================
   GUIDE HUB
   ============================================================ */
async function renderGuideHub(lang, base) {
  const main = document.getElementById('wps-main');
  if (!main) return;
  const data = await fetchJSON(`${base}data/guides.json`);
  const guides = data.guides || [];

  main.innerHTML = `
    <div id="wps-breadcrumb"></div>
    <section class="hub-hero">
      <div class="container">
        <h1 class="hub-title">${t('guides.hub_title')}</h1>
        <p class="hub-subtitle">${t('guides.hub_subtitle')}</p>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="guide-filters" id="guide-filters">
          ${['all','pdf','writing','slides','sheets','tools'].map((k,i)=>`
            <button class="filter-btn${i===0?' filter-btn--active':''}" data-filter="${k}">
              ${k==='all' ? 'All Guides' : k.charAt(0).toUpperCase()+k.slice(1)}
            </button>
          `).join('')}
        </div>
        <div class="guide-grid" id="guide-grid">
          ${guides.map(g => `
            <a href="${g.slug}.html" class="guide-card" data-category="${g.category}">
              <div class="guide-card-body">
                <span class="guide-cat-badge guide-cat--${g.category}">${g.category}</span>
                <h3 class="guide-card-title">${g.title}</h3>
                <p class="guide-card-excerpt">${g.excerpt}</p>
              </div>
              <div class="guide-card-footer">
                <span class="guide-read-time">${g.readTime} ${t('guides.min_read')}</span>
                <span class="guide-read-link">${t('guides.read_guide')}</span>
              </div>
            </a>
          `).join('')}
        </div>
      </div>
    </section>
  `;

  Breadcrumb.render([{ label: t('guides.hub_title') }]);
  _bindGuideFilters();
}

function _bindGuideFilters() {
  const btns = document.querySelectorAll('#guide-filters .filter-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('filter-btn--active'));
      btn.classList.add('filter-btn--active');
      const cat = btn.dataset.filter;
      document.querySelectorAll('#guide-grid .guide-card').forEach(card => {
        card.style.display = (cat === 'all' || card.dataset.category === cat) ? '' : 'none';
      });
    });
  });
}

/* ============================================================
   GUIDE ARTICLE
   ============================================================ */
async function renderGuide(cfg, lang, base) {
  const main = document.getElementById('wps-main');
  if (!main) return;
  const data = await fetchJSON(`${base}data/guides.json`);
  const guide = data.guides?.find(g => g.id === cfg.guide) || data.guides?.[0];
  if (!guide) return;

  main.innerHTML = `
    <div id="wps-breadcrumb"></div>
    <div class="guide-layout container">
      <article class="guide-article">
        <header class="guide-header">
          <span class="guide-cat-badge guide-cat--${guide.category}">${guide.category}</span>
          <h1>${guide.title}</h1>
          <p class="guide-meta">${guide.readTime} min read · Updated ${new Date().toLocaleDateString('en-US',{year:'numeric',month:'long'})}</p>
        </header>
        <div class="guide-content">
          <p>${guide.excerpt}</p>
          <h2>Step 1: Open your file</h2>
          <p>Navigate to <strong>wps.ai</strong> and select the tool you need from the navigation menu. You can also drag and drop files directly onto the tool page.</p>
          <h2>Step 2: Upload and configure</h2>
          <p>Click the upload area or drag your file to begin. Most conversions are fully automatic — just wait for processing to complete (usually under 30 seconds).</p>
          <h2>Step 3: Download your result</h2>
          <p>Once processing is complete, click the download button. Your file will be saved to your device immediately. Files are deleted from our servers within 24 hours.</p>
          <div class="guide-cta-box">
            <h3>Ready to try it?</h3>
            <a href="${base}${lang}/index.html" class="btn btn--primary">${t('common.get_started')}</a>
          </div>
        </div>
      </article>
      <aside class="guide-sidebar">
        <div class="info-card">
          <h4>In this guide</h4>
          <ul class="sidebar-toc">
            <li><a href="#">Step 1: Open your file</a></li>
            <li><a href="#">Step 2: Upload and configure</a></li>
            <li><a href="#">Step 3: Download your result</a></li>
          </ul>
        </div>
      </aside>
    </div>
  `;
  Breadcrumb.render([
    { label: t('guides.hub_title'), href: `${base}${lang}/guides/index.html` },
    { label: guide.title }
  ]);
}

/* ============================================================
   PRICING PAGE
   ============================================================ */
async function renderPricing(lang, base) {
  const main = document.getElementById('wps-main');
  if (!main) return;

  main.innerHTML = `
    <div id="wps-breadcrumb"></div>
    <section class="section">
      <div class="container">
        <h1 class="section-title">${t('pricing.title')}</h1>
        <p class="section-subtitle">${t('pricing.subtitle')}</p>
        <div class="pricing-grid">
          ${[
            { plan:'free',  price:'$0',    btn:'get_started', features:['3 free conversions/day','200MB file limit','20 languages','Basic tools'] },
            { plan:'pro',   price:'$6.99', btn:'go_pro',       features:['Unlimited conversions','200MB file limit','All 40+ tools','Priority processing','Batch mode','Ad-free'], popular:true },
            { plan:'team',  price:'$4.99', btn:'contact_sales',features:['Everything in Pro','Team collaboration','Admin dashboard','API access','SSO / SAML','Priority support'], perUser:true },
          ].map(p => `
            <div class="pricing-card${p.popular?' pricing-card--popular':''}">
              ${p.popular ? `<div class="pricing-popular-badge">${t('pricing.most_popular')}</div>` : ''}
              <h2 class="pricing-plan">${t(`pricing.${p.plan}_plan`)}</h2>
              <div class="pricing-price">
                <span class="price-amount">${p.price}</span>
                <span class="price-period">${t('pricing.per_month')}${p.perUser ? ' '+t('pricing.per_user') : ''}</span>
              </div>
              <ul class="pricing-features">
                ${p.features.map(f => `<li>${Icons.check} ${f}</li>`).join('')}
              </ul>
              <a href="#" class="btn ${p.popular?'btn--primary':'btn--ghost'} btn-full">${t(`pricing.${p.btn}`)}</a>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
  Breadcrumb.render([{ label: t('pricing.title') }]);
}

/* ============================================================
   HELPER: Fetch JSON with cache
   ============================================================ */
const _jsonCache = {};
async function fetchJSON(url) {
  if (_jsonCache[url]) return _jsonCache[url];
  try {
    const r = await fetch(url);
    const data = await r.json();
    _jsonCache[url] = data;
    return data;
  } catch(e) {
    console.warn('fetchJSON failed:', url, e);
    return {};
  }
}
