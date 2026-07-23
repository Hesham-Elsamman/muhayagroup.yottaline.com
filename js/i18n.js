/**
 * Muhaya Group — i18n (Internationalization)
 * Vanilla JS — no jQuery required
 */

(function () {
  'use strict';

  var STORAGE_KEY = 'muhaya-lang';
  var DEFAULT_LANG = 'en';
  var SUPPORTED = ['en', 'ar'];

  var translations = {};
  var currentLang = getStoredLang();

  /* ── Bootstrap lang/dir before body renders ── */
  document.documentElement.lang = currentLang;
  document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';

  function getStoredLang() {
    var stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED.indexOf(stored) !== -1) return stored;

    var browser = (navigator.language || navigator.userLanguage || '').slice(0, 2);
    return SUPPORTED.indexOf(browser) !== -1 ? browser : DEFAULT_LANG;
  }

  function getNestedValue(obj, path) {
    return path.split('.').reduce(function (acc, key) {
      if (acc == null) return undefined;
      return acc[key];
    }, obj);
  }

  function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var value = getNestedValue(translations, key);
      if (value != null) el.textContent = value;
    });

    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var parts = pair.split(':').map(function (s) { return s.trim(); });
        var attr = parts[0];
        var key = parts[1];
        var value = getNestedValue(translations, key);
        if (value != null) el.setAttribute(attr, value);
      });
    });

    var title = getNestedValue(translations, 'meta.title');
    if (title) document.title = title;

    var desc = getNestedValue(translations, 'meta.description');
    var metaDesc = document.querySelector('meta[name="description"]');
    if (desc && metaDesc) metaDesc.setAttribute('content', desc);

    var langBtn = document.getElementById('langToggle');
    if (langBtn) {
      var textEl = langBtn.querySelector('.lang-text') || langBtn;
      textEl.textContent = currentLang === 'ar' ? 'EN' : 'ع';
      langBtn.setAttribute('aria-label', getNestedValue(translations, 'nav.switchLang') || '');
    }

    var navLogo = document.querySelector('.nav .logo-img');
    if (navLogo) {
      var logoSrc = currentLang === 'ar'
        ? navLogo.getAttribute('data-logo-ar')
        : navLogo.getAttribute('data-logo-en');
      if (logoSrc) navLogo.src = logoSrc;
    }

    document.documentElement.setAttribute('data-i18n-ready', 'true');
    document.dispatchEvent(new CustomEvent('i18n:ready', {
      detail: { lang: currentLang, translations: translations },
    }));
  }

  function loadTranslations(lang) {
    return fetch('locales/' + lang + '.json')
      .then(function (res) {
        if (!res.ok) throw new Error('Failed to load locale: ' + lang);
        return res.json();
      })
      .then(function (data) {
        translations = data;
        currentLang = lang;
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        localStorage.setItem(STORAGE_KEY, lang);
        applyTranslations();
        return data;
      })
      .catch(function (err) {
        console.error('[i18n]', err);
        if (lang !== DEFAULT_LANG) return loadTranslations(DEFAULT_LANG);
        document.documentElement.setAttribute('data-i18n-ready', 'true');
      });
  }

  function init() {
    loadTranslations(currentLang);

    document.addEventListener('click', function (e) {
      var btn = e.target.closest('#langToggle');
      if (!btn) return;
      var next = currentLang === 'en' ? 'ar' : 'en';
      loadTranslations(next);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.i18n = {
    t: function (key) {
      return getNestedValue(translations, key) || key;
    },
    getLang: function () { return currentLang; },
    setLang: loadTranslations,
    toggleLang: function () {
      return loadTranslations(currentLang === 'en' ? 'ar' : 'en');
    },
  };
})();
