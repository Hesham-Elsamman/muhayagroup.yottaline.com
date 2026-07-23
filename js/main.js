/**
 * Muhaya Group — Main JavaScript
 * GSAP Scroll Animations & Interactions
 */

(function () {
  'use strict';

  gsap.registerPlugin(ScrollTrigger);

  /* ── Logo variant switcher (only EN+Light gets the color logo) ── */
  function updateLogo() {
    var navLogo = document.querySelector('.nav .logo-img');
    if (!navLogo) return;
    var lang  = document.documentElement.lang || 'en';
    var theme = document.documentElement.getAttribute('data-theme') || 'light';
    if (lang === 'en' && theme === 'light') {
      navLogo.src = 'assets/logo-text-color.png';
    } else {
      /* Fall back to the normal data-logo-{lang} attribute */
      var src = navLogo.getAttribute('data-logo-' + lang);
      if (src) navLogo.src = src;
    }
  }

  /* ── Theme Toggle ── */
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  const savedTheme = localStorage.getItem('muhaya-theme') || 'light';

  html.setAttribute('data-theme', savedTheme);
  updateLogo();

  themeToggle?.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    localStorage.setItem('muhaya-theme', next);
    updateLogo();
  });

  /* ── Sticky Navigation ── */
  const nav = document.getElementById('nav');

  ScrollTrigger.create({
    start: 'top -68',
    onUpdate: (self) => {
      nav?.classList.toggle('scrolled', self.scroll() > 68);
    },
  });

  /* ── Mobile Nav ── */
  const navToggle = document.getElementById('navToggle');
  navToggle?.addEventListener('click', () => {
    nav?.classList.toggle('mobile-open');
  });

  document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => nav?.classList.remove('mobile-open'));
  });

  /* ── Floating Card ── */
  const floatingCard = document.getElementById('floatingCard');
  const floatingClose = document.getElementById('floatingClose');

  floatingClose?.addEventListener('click', (e) => {
    e.preventDefault();
    floatingCard?.classList.add('hidden');
  });

  /* Hero animations now handled by CSS keyframes */
  /* Keep parallax on bg image */

  gsap.to('.hero-bg img', {
    scale: 1.12,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });

  /* ── Reveal Up ── */
  gsap.utils.toArray('.reveal-up').forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none reverse',
      },
    });
  });

  /* ── Reveal Fade ── */
  gsap.utils.toArray('.reveal-fade').forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });
  });

  /* ── Reveal Scale ── */
  gsap.utils.toArray('.reveal-scale').forEach((el, i) => {
    gsap.to(el, {
      opacity: 1,
      scale: 1,
      duration: 0.9,
      ease: 'power3.out',
      delay: i * 0.08,
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none reverse',
      },
    });
  });

  /* ── Reveal Left / Right ── */
  gsap.utils.toArray('.reveal-left').forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      x: 0,
      duration: 1.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });
  });

  gsap.utils.toArray('.reveal-right').forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      x: 0,
      duration: 1.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });
  });

  /* ── Image Reveal ── */
  gsap.utils.toArray('.reveal-image').forEach((el) => {
    gsap.to(el, {
      clipPath: 'inset(0 0% 0 0)',
      duration: 1.4,
      ease: 'power4.inOut',
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
  });

  /* ── Section Headers ── */
  gsap.utils.toArray('.section-header').forEach((header) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: header,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.from(header.querySelector('.section-eyebrow'), {
      opacity: 0,
      y: 20,
      duration: 0.6,
    })
      .from(header.querySelector('.section-title'), {
        opacity: 0,
        y: 30,
        duration: 0.8,
      }, '-=0.3')
      .from(header.querySelector('.section-desc'), {
        opacity: 0,
        y: 20,
        duration: 0.6,
      }, '-=0.4');
  });

  /* ── Stagger Cards ── */
  [
    { parent: '.services-grid', child: '.service-card' },
    { parent: '.features-grid', child: '.feature-card' },
    { parent: '.investment-grid', child: '.investment-card' },
    { parent: '.testimonials-grid', child: '.testimonial-card' },
  ].forEach(({ parent, child }) => {
    const container = document.querySelector(parent);
    if (!container) return;

    gsap.from(container.querySelectorAll(child), {
      opacity: 0,
      y: 50,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 88%',
        toggleActions: 'play none none reverse',
      },
    });
  });

  /* ── Gallery Stagger ── */
  gsap.from('.gallery-item', {
    opacity: 0,
    scale: 0.9,
    duration: 0.7,
    stagger: 0.08,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.gallery-grid',
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    },
  });

  /* ── Counter Animation ── */
  document.querySelectorAll('.stat-number').forEach((counter) => {
    const target = parseInt(counter.dataset.count, 10);
    const suffix = counter.dataset.suffix || '';

    ScrollTrigger.create({
      trigger: counter,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to({ val: 0 }, {
          val: target,
          duration: 2.2,
          ease: 'power2.out',
          onUpdate: function () {
            counter.textContent = Math.round(this.targets()[0].val) + suffix;
          },
        });
      },
    });
  });

  /* ── Investment Section Parallax ── */
  gsap.from('.investment-section .pattern-bg', {
    y: -60,
    ease: 'none',
    scrollTrigger: {
      trigger: '.investment-section',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });

  /* ── CTA Parallax ── */
  gsap.to('.cta-bg img', {
    y: '20%',
    ease: 'none',
    scrollTrigger: {
      trigger: '.cta-section',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });

  /* ── Properties Slider ── */
  const track = document.getElementById('propertiesTrack');
  const prevBtn = document.getElementById('sliderPrev');
  const nextBtn = document.getElementById('sliderNext');
  let currentSlide = 0;

  function getVisibleSlides() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }

  function isRTL() {
    return document.documentElement.dir === 'rtl';
  }

  function updateSlider() {
    if (!track) return;
    const cards = track.querySelectorAll('.property-card');
    const visible = getVisibleSlides();
    const maxSlide = Math.max(0, cards.length - visible);
    currentSlide = Math.min(currentSlide, maxSlide);

    const card = cards[0];
    if (!card) return;

    const gap = 24;
    const offset = currentSlide * (card.offsetWidth + gap);
    const direction = isRTL() ? 1 : -1;
    gsap.to(track, { x: direction * offset, duration: 0.6, ease: 'power3.inOut' });
  }

  prevBtn?.addEventListener('click', () => {
    if (isRTL()) {
      const cards = track?.querySelectorAll('.property-card');
      if (!cards) return;
      const maxSlide = Math.max(0, cards.length - getVisibleSlides());
      currentSlide = Math.min(maxSlide, currentSlide + 1);
    } else {
      currentSlide = Math.max(0, currentSlide - 1);
    }
    updateSlider();
  });

  nextBtn?.addEventListener('click', () => {
    if (isRTL()) {
      currentSlide = Math.max(0, currentSlide - 1);
    } else {
      const cards = track?.querySelectorAll('.property-card');
      if (!cards) return;
      const maxSlide = Math.max(0, cards.length - getVisibleSlides());
      currentSlide = Math.min(maxSlide, currentSlide + 1);
    }
    updateSlider();
  });

  window.addEventListener('resize', () => {
    currentSlide = 0;
    updateSlider();
  });

  document.addEventListener('i18n:ready', () => {
    currentSlide = 0;
    gsap.set(track, { x: 0 });
    updateSlider();
    updateLogo();
  });

  /* ── Smooth Anchor Scroll ── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: target, offsetY: 68 },
        ease: 'power3.inOut',
      });
    });
  });

  /* ── Floating Card Entrance ── */
  gsap.from('.floating-card', {
    opacity: 0,
    y: 40,
    duration: 0.8,
    delay: 2,
    ease: 'power3.out',
  });

  /* ── Text Split Helper (already in HTML) ── */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.globalTimeline.clear();
    document.querySelectorAll('.reveal-up, .reveal-fade, .reveal-scale, .reveal-left, .reveal-right').forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    document.querySelectorAll('.reveal-image').forEach((el) => {
      el.style.clipPath = 'none';
    });
  }
})();
