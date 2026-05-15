#!/usr/bin/env node
/**
 * WPS AI Site Generator
 * Creates all HTML shell pages for all categories, tools, templates, and guides
 * Then copies them to all 19 other language directories
 */

const fs = require('fs');
const path = require('path');

const SITE_DIR = path.join(__dirname, '..');

const LANGUAGES = ['en','es','de','fr','ja','ko','pt','ar','it','nl','pl','tr','id','th','vi','ms','zh-cn','zh-tw','ru'];

// ============================================================
// PAGE DEFINITIONS
// ============================================================

// (category, slug, type, extra_config)
const TOOL_PAGES = [
  // PDF Tools
  ['pdf-tools', 'index',           'hub',  { category:'pdf-tools' }],
  ['pdf-tools', 'pdf-to-word',     'tool', { category:'pdf-tools', tool:'pdf-to-word' }],
  ['pdf-tools', 'pdf-to-excel',    'tool', { category:'pdf-tools', tool:'pdf-to-excel' }],
  ['pdf-tools', 'pdf-to-ppt',      'tool', { category:'pdf-tools', tool:'pdf-to-ppt' }],
  ['pdf-tools', 'pdf-to-jpg',      'tool', { category:'pdf-tools', tool:'pdf-to-jpg' }],
  ['pdf-tools', 'word-to-pdf',     'tool', { category:'pdf-tools', tool:'word-to-pdf' }],
  ['pdf-tools', 'excel-to-pdf',    'tool', { category:'pdf-tools', tool:'excel-to-pdf' }],
  ['pdf-tools', 'ppt-to-pdf',      'tool', { category:'pdf-tools', tool:'ppt-to-pdf' }],
  ['pdf-tools', 'jpg-to-pdf',      'tool', { category:'pdf-tools', tool:'jpg-to-pdf' }],
  ['pdf-tools', 'compress-pdf',    'tool', { category:'pdf-tools', tool:'compress-pdf' }],
  ['pdf-tools', 'merge-pdf',       'tool', { category:'pdf-tools', tool:'merge-pdf' }],
  ['pdf-tools', 'split-pdf',       'tool', { category:'pdf-tools', tool:'split-pdf' }],
  ['pdf-tools', 'edit-pdf',        'tool', { category:'pdf-tools', tool:'edit-pdf' }],
  ['pdf-tools', 'sign-pdf',        'tool', { category:'pdf-tools', tool:'sign-pdf' }],
  ['pdf-tools', 'protect-pdf',     'tool', { category:'pdf-tools', tool:'protect-pdf' }],

  // AI Writing
  ['ai-writing', 'index',          'hub',  { category:'ai-writing' }],
  ['ai-writing', 'ai-writer',      'tool', { category:'ai-writing', tool:'ai-writer' }],
  ['ai-writing', 'ai-summarizer',  'tool', { category:'ai-writing', tool:'ai-summarizer' }],
  ['ai-writing', 'paraphrase',     'tool', { category:'ai-writing', tool:'paraphrase' }],
  ['ai-writing', 'grammar-check',  'tool', { category:'ai-writing', tool:'grammar-check' }],
  ['ai-writing', 'translate',      'tool', { category:'ai-writing', tool:'translate' }],
  ['ai-writing', 'email-writer',   'tool', { category:'ai-writing', tool:'email-writer' }],
  ['ai-writing', 'cover-letter',   'tool', { category:'ai-writing', tool:'cover-letter' }],
  ['ai-writing', 'blog-writer',    'tool', { category:'ai-writing', tool:'blog-writer' }],
  ['ai-writing', 'essay-writer',   'tool', { category:'ai-writing', tool:'essay-writer' }],
  ['ai-writing', 'product-desc',   'tool', { category:'ai-writing', tool:'product-desc' }],

  // Resume Templates
  ['resume-templates', 'index',         'template-parent', { templateType:'resume' }],
  ['resume-templates', 'r-modern-pro',  'template-child',  { templateType:'resume', template:'r-modern-pro' }],
  ['resume-templates', 'r-minimal-clean','template-child', { templateType:'resume', template:'r-minimal-clean' }],
  ['resume-templates', 'r-creative-bold','template-child', { templateType:'resume', template:'r-creative-bold' }],
  ['resume-templates', 'r-executive',   'template-child',  { templateType:'resume', template:'r-executive' }],
  ['resume-templates', 'r-tech-focused','template-child',  { templateType:'resume', template:'r-tech-focused' }],
  ['resume-templates', 'r-elegant',     'template-child',  { templateType:'resume', template:'r-elegant' }],
  ['resume-templates', 'r-fresh-grad',  'template-child',  { templateType:'resume', template:'r-fresh-grad' }],
  ['resume-templates', 'r-sidebar-dark','template-child',  { templateType:'resume', template:'r-sidebar-dark' }],
  ['resume-templates', 'r-academic',    'template-child',  { templateType:'resume', template:'r-academic' }],
  ['resume-templates', 'r-infographic', 'template-child',  { templateType:'resume', template:'r-infographic' }],
  ['resume-templates', 'r-two-column',  'template-child',  { templateType:'resume', template:'r-two-column' }],
  ['resume-templates', 'r-timeline',    'template-child',  { templateType:'resume', template:'r-timeline' }],

  // AI Slides
  ['ai-slides', 'index',       'hub',  { category:'ai-slides' }],
  ['ai-slides', 'ai-ppt',      'tool', { category:'ai-slides', tool:'ai-ppt' }],
  ['ai-slides', 'outline',     'tool', { category:'ai-slides', tool:'outline' }],
  ['ai-slides', 'design',      'tool', { category:'ai-slides', tool:'design' }],
  ['ai-slides', 'theme',       'tool', { category:'ai-slides', tool:'theme' }],
  ['ai-slides', 'to-video',    'tool', { category:'ai-slides', tool:'to-video' }],
  ['ai-slides', 'chart-maker', 'tool', { category:'ai-slides', tool:'chart-maker' }],
  ['ai-slides', 'mind-map',    'tool', { category:'ai-slides', tool:'mind-map' }],

  // Presentation Templates
  ['presentation-templates', 'index',          'template-parent', { templateType:'presentation' }],
  ['presentation-templates', 'p-pitch-deck',   'template-child',  { templateType:'presentation', template:'p-pitch-deck' }],
  ['presentation-templates', 'p-business-plan','template-child',  { templateType:'presentation', template:'p-business-plan' }],
  ['presentation-templates', 'p-minimal-corp', 'template-child',  { templateType:'presentation', template:'p-minimal-corp' }],
  ['presentation-templates', 'p-education',    'template-child',  { templateType:'presentation', template:'p-education' }],
  ['presentation-templates', 'p-creative-bold','template-child',  { templateType:'presentation', template:'p-creative-bold' }],
  ['presentation-templates', 'p-annual-report','template-child',  { templateType:'presentation', template:'p-annual-report' }],
  ['presentation-templates', 'p-product-launch','template-child', { templateType:'presentation', template:'p-product-launch' }],
  ['presentation-templates', 'p-marketing',    'template-child',  { templateType:'presentation', template:'p-marketing' }],
  ['presentation-templates', 'p-portfolio',    'template-child',  { templateType:'presentation', template:'p-portfolio' }],
  ['presentation-templates', 'p-science',      'template-child',  { templateType:'presentation', template:'p-science' }],
  ['presentation-templates', 'p-dark-modern',  'template-child',  { templateType:'presentation', template:'p-dark-modern' }],
  ['presentation-templates', 'p-infographic',  'template-child',  { templateType:'presentation', template:'p-infographic' }],

  // AI Sheets
  ['ai-sheets', 'index',           'hub',  { category:'ai-sheets' }],
  ['ai-sheets', 'ai-excel',        'tool', { category:'ai-sheets', tool:'ai-excel' }],
  ['ai-sheets', 'formula-gen',     'tool', { category:'ai-sheets', tool:'formula-gen' }],
  ['ai-sheets', 'data-analysis',   'tool', { category:'ai-sheets', tool:'data-analysis' }],
  ['ai-sheets', 'chart-gen',       'tool', { category:'ai-sheets', tool:'chart-gen' }],
  ['ai-sheets', 'csv-to-excel',    'tool', { category:'ai-sheets', tool:'csv-to-excel' }],
  ['ai-sheets', 'excel-templates', 'template-parent', { templateType:'excel' }],

  // AI Tools
  ['ai-tools', 'index',        'hub',  { category:'ai-tools' }],
  ['ai-tools', 'qr-gen',       'tool', { category:'ai-tools', tool:'qr-gen' }],
  ['ai-tools', 'img-compress', 'tool', { category:'ai-tools', tool:'img-compress' }],
  ['ai-tools', 'img-to-text',  'tool', { category:'ai-tools', tool:'img-to-text' }],
  ['ai-tools', 'bg-remover',   'tool', { category:'ai-tools', tool:'bg-remover' }],
  ['ai-tools', 'pdf-chat',     'tool', { category:'ai-tools', tool:'pdf-chat' }],
  ['ai-tools', 'ai-detector',  'tool', { category:'ai-tools', tool:'ai-detector' }],

  // Guides
  ['guides', 'index',                           'guide-hub', {}],
  ['guides', 'how-to-convert-pdf-to-word',      'guide', { guide:'how-to-convert-pdf-to-word' }],
  ['guides', 'compress-pdf-without-quality-loss','guide', { guide:'compress-pdf-without-quality-loss' }],
  ['guides', 'merge-split-pdf-guide',           'guide', { guide:'merge-split-pdf-guide' }],
  ['guides', 'ai-writer-getting-started',       'guide', { guide:'ai-writer-getting-started' }],
  ['guides', 'write-better-prompts',            'guide', { guide:'write-better-prompts' }],
  ['guides', 'ai-presentation-guide',           'guide', { guide:'ai-presentation-guide' }],
  ['guides', 'excel-formulas-ai',               'guide', { guide:'excel-formulas-ai' }],
  ['guides', 'qr-code-guide',                   'guide', { guide:'qr-code-guide' }],

  // Pricing
  ['pricing', 'index', 'pricing', {}],
];

// ============================================================
// HTML GENERATOR
// ============================================================

function getDepth(category) {
  // All pages are 2 levels deep: {lang}/{category}/page.html → ../.. from page
  // But index.html in root is 1 level: {lang}/index.html → ../ from page
  return category === 'root' ? 1 : 2;
}

function getRelBase(category) {
  return category === 'root' ? '../' : '../../';
}

function generateHTML(lang, category, slug, type, config) {
  const isRoot = category === 'root';
  const relBase = getRelBase(category);

  const configStr = JSON.stringify({ type, lang, ...config }, null, 6)
    .split('\n').join('\n    ');

  const title = getTitleHint(type, config);
  const desc = getDescHint(type, config);

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${desc}">
  <meta property="og:title" content="${title} | WPS AI">
  <meta property="og:description" content="${desc}">
  <meta property="og:type" content="website">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://wps.ai/${lang}/${isRoot ? '' : category + '/' + (slug === 'index' ? '' : slug + '.html')}">
  <title>${title} | WPS AI</title>
  <link rel="stylesheet" href="${relBase}css/main.css">
</head>
<body>
  <div id="wps-nav"></div>
  <main id="wps-main"></main>
  <div id="wps-footer"></div>

  <script>
    const PAGE_CONFIG = ${configStr};
  </script>
  <script src="${relBase}js/utils.js"></script>
  <script src="${relBase}js/i18n.js"></script>
  <script src="${relBase}js/components.js"></script>
  <script src="${relBase}js/app.js"></script>
</body>
</html>
`;
}

function getTitleHint(type, cfg) {
  if (type === 'home') return 'AI-Powered Office Suite';
  if (type === 'hub') return (cfg.category || '').split('-').map(w=>w[0].toUpperCase()+w.slice(1)).join(' ');
  if (type === 'tool') return (cfg.tool || '').split('-').map(w=>w[0].toUpperCase()+w.slice(1)).join(' ');
  if (type === 'template-parent') return `${cfg.templateType || ''} Templates`;
  if (type === 'template-child') return (cfg.template || '').split('-').map(w=>w[0].toUpperCase()+w.slice(1)).join(' ');
  if (type === 'guide') return (cfg.guide || '').split('-').map(w=>w[0].toUpperCase()+w.slice(1)).join(' ');
  if (type === 'guide-hub') return 'Guides & Tutorials';
  if (type === 'pricing') return 'Pricing';
  return 'WPS AI';
}

function getDescHint(type, cfg) {
  if (type === 'home') return 'WPS AI brings intelligent writing, PDF editing, presentations, and spreadsheets into one seamless experience — available in 20 languages.';
  if (type === 'tool') return `Use ${getTitleHint(type, cfg)} online for free. Fast, accurate, no installation required.`;
  if (type === 'hub') return `All ${getTitleHint(type, cfg)} tools in one place. Free to use.`;
  if (type.startsWith('template')) return `Free ${getTitleHint(type, cfg)} — download or edit online.`;
  if (type === 'guide' || type === 'guide-hub') return 'Learn how to use WPS AI tools with our step-by-step guides.';
  return 'WPS AI — free online office tools powered by AI.';
}

// ============================================================
// FILE WRITER
// ============================================================

let created = 0;

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function writePage(lang, category, slug, type, config) {
  const langDir = path.join(SITE_DIR, lang);
  let filePath;

  if (category === 'root') {
    filePath = path.join(langDir, 'index.html');
  } else {
    const catDir = path.join(langDir, category);
    ensureDir(catDir);
    filePath = path.join(catDir, slug === 'index' ? 'index.html' : `${slug}.html`);
  }

  const html = generateHTML(lang, category, slug, type, config);
  fs.writeFileSync(filePath, html, 'utf8');
  created++;
}

// ============================================================
// MAIN
// ============================================================

console.log('🚀 WPS AI Site Generator starting...\n');

// 1. Create home pages for all languages
for (const lang of LANGUAGES) {
  ensureDir(path.join(SITE_DIR, lang));
  writePage(lang, 'root', 'index', 'home', {});
}

// 2. Create all tool/template/guide pages for all languages
for (const lang of LANGUAGES) {
  for (const [category, slug, type, config] of TOOL_PAGES) {
    writePage(lang, category, slug, type, { ...config });
  }
}

// 3. Generate minimal locale stubs for all non-English languages
// (they will fall back to English in i18n.js, but the files need to exist as empty overrides)
const LOCALE_DIR = path.join(SITE_DIR, 'data', 'locales');
ensureDir(LOCALE_DIR);

const nonEnglishLangs = LANGUAGES.filter(l => l !== 'en');
const localeMeta = {
  'es': { dir:'ltr', name:'Español' },
  'de': { dir:'ltr', name:'Deutsch' },
  'fr': { dir:'ltr', name:'Français' },
  'ja': { dir:'ltr', name:'日本語' },
  'ko': { dir:'ltr', name:'한국어' },
  'pt': { dir:'ltr', name:'Português' },
  'ar': { dir:'rtl', name:'العربية' },
  'it': { dir:'ltr', name:'Italiano' },
  'nl': { dir:'ltr', name:'Nederlands' },
  'pl': { dir:'ltr', name:'Polski' },
  'tr': { dir:'ltr', name:'Türkçe' },
  'id': { dir:'ltr', name:'Bahasa Indonesia' },
  'th': { dir:'ltr', name:'ภาษาไทย' },
  'vi': { dir:'ltr', name:'Tiếng Việt' },
  'ms': { dir:'ltr', name:'Bahasa Melayu' },
  'zh-cn': { dir:'ltr', name:'简体中文' },
  'zh-tw': { dir:'ltr', name:'繁體中文' },
  'ru':  { dir:'ltr', name:'Русский' },
};

// Generate translated key overrides (nav and key UI elements only for prototype)
// Full production translations would go here
const translatedKeys = {
  'es': { nav:{ products:'Productos', templates:'Plantillas', guides:'Guías', pricing:'Precios', signin:'Iniciar sesión', getstarted:'Empezar gratis' }, home:{ hero_title:'Tu Suite de Oficina con IA', hero_cta_primary:'Empezar gratis' } },
  'de': { nav:{ products:'Produkte', templates:'Vorlagen', guides:'Anleitungen', pricing:'Preise', signin:'Anmelden', getstarted:'Kostenlos starten' }, home:{ hero_title:'Deine KI-Bürosuite', hero_cta_primary:'Kostenlos starten' } },
  'fr': { nav:{ products:'Produits', templates:'Modèles', guides:'Guides', pricing:'Tarifs', signin:'Connexion', getstarted:'Commencer gratuitement' }, home:{ hero_title:'Votre Suite Bureautique IA', hero_cta_primary:'Commencer gratuitement' } },
  'ja': { nav:{ products:'製品', templates:'テンプレート', guides:'ガイド', pricing:'料金', signin:'サインイン', getstarted:'無料で始める' }, home:{ hero_title:'AIオフィススイート', hero_cta_primary:'無料で始める' } },
  'ko': { nav:{ products:'제품', templates:'템플릿', guides:'가이드', pricing:'요금', signin:'로그인', getstarted:'무료로 시작' }, home:{ hero_title:'AI 오피스 스위트', hero_cta_primary:'무료로 시작' } },
  'pt': { nav:{ products:'Produtos', templates:'Modelos', guides:'Guias', pricing:'Preços', signin:'Entrar', getstarted:'Começar grátis' }, home:{ hero_title:'Seu Suite de Escritório com IA', hero_cta_primary:'Começar grátis' } },
  'ar': { nav:{ products:'المنتجات', templates:'القوالب', guides:'الأدلة', pricing:'الأسعار', signin:'تسجيل الدخول', getstarted:'ابدأ مجانًا' }, home:{ hero_title:'مجموعة مكتبية بالذكاء الاصطناعي', hero_cta_primary:'ابدأ مجانًا' } },
  'it': { nav:{ products:'Prodotti', templates:'Modelli', guides:'Guide', pricing:'Prezzi', signin:'Accedi', getstarted:'Inizia gratis' }, home:{ hero_title:'La Tua Suite Office con IA', hero_cta_primary:'Inizia gratis' } },
  'nl': { nav:{ products:'Producten', templates:'Sjablonen', guides:'Gidsen', pricing:'Prijzen', signin:'Inloggen', getstarted:'Gratis beginnen' }, home:{ hero_title:'Jouw AI-Kantoorpakket', hero_cta_primary:'Gratis beginnen' } },
  'pl': { nav:{ products:'Produkty', templates:'Szablony', guides:'Poradniki', pricing:'Cennik', signin:'Zaloguj się', getstarted:'Zacznij za darmo' }, home:{ hero_title:'Twój Pakiet Biurowy AI', hero_cta_primary:'Zacznij za darmo' } },
  'tr': { nav:{ products:'Ürünler', templates:'Şablonlar', guides:'Kılavuzlar', pricing:'Fiyatlar', signin:'Giriş yap', getstarted:'Ücretsiz başla' }, home:{ hero_title:'Yapay Zeka Ofis Paketiniz', hero_cta_primary:'Ücretsiz başla' } },
  'id': { nav:{ products:'Produk', templates:'Template', guides:'Panduan', pricing:'Harga', signin:'Masuk', getstarted:'Mulai gratis' }, home:{ hero_title:'Suite Kantor Bertenaga AI', hero_cta_primary:'Mulai gratis' } },
  'th': { nav:{ products:'ผลิตภัณฑ์', templates:'เทมเพลต', guides:'คู่มือ', pricing:'ราคา', signin:'เข้าสู่ระบบ', getstarted:'เริ่มฟรี' }, home:{ hero_title:'ชุดออฟฟิศ AI ของคุณ', hero_cta_primary:'เริ่มฟรี' } },
  'vi': { nav:{ products:'Sản phẩm', templates:'Mẫu', guides:'Hướng dẫn', pricing:'Giá', signin:'Đăng nhập', getstarted:'Bắt đầu miễn phí' }, home:{ hero_title:'Bộ Công Cụ Văn Phòng AI', hero_cta_primary:'Bắt đầu miễn phí' } },
  'ms': { nav:{ products:'Produk', templates:'Templat', guides:'Panduan', pricing:'Harga', signin:'Log masuk', getstarted:'Mula percuma' }, home:{ hero_title:'Suite Pejabat Berkuasa AI', hero_cta_primary:'Mula percuma' } },
  'zh-cn': { nav:{ products:'产品', templates:'模板', guides:'指南', pricing:'定价', signin:'登录', getstarted:'免费开始' }, home:{ hero_title:'AI 驱动的办公套件', hero_cta_primary:'免费开始' } },
  'zh-tw': { nav:{ products:'產品', templates:'範本', guides:'指南', pricing:'定價', signin:'登入', getstarted:'免費開始' }, home:{ hero_title:'AI 驅動辦公套件', hero_cta_primary:'免費開始' } },
  'ru':  { nav:{ products:'Продукты', templates:'Шаблоны', guides:'Гайды', pricing:'Цены', signin:'Войти', getstarted:'Начать бесплатно' }, home:{ hero_title:'ИИ-офисный пакет', hero_cta_primary:'Начать бесплатно' } },
};

for (const lang of nonEnglishLangs) {
  const meta = localeMeta[lang] || { dir:'ltr' };
  const overrides = translatedKeys[lang] || {};
  const localeObj = { lang, dir: meta.dir, ...overrides };
  const localePath = path.join(LOCALE_DIR, `${lang}.json`);
  if (!fs.existsSync(localePath)) {
    fs.writeFileSync(localePath, JSON.stringify(localeObj, null, 2), 'utf8');
  }
}

console.log(`✅ Done! Created ${created} HTML pages across ${LANGUAGES.length} languages.`);
console.log(`📁 Site directory: ${SITE_DIR}`);
console.log(`\nPage breakdown:`);
console.log(`  - Home pages: ${LANGUAGES.length}`);
console.log(`  - Tool/Template/Guide pages: ${TOOL_PAGES.length} × ${LANGUAGES.length} = ${TOOL_PAGES.length * LANGUAGES.length}`);
console.log(`  Total: ${created} pages`);
