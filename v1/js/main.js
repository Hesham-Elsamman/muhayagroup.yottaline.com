/**
 * Muhaya Group — Main JavaScript
 * GSAP Scroll Animations & Interactions
 */

(function () {
  'use strict';

  if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    if (typeof ScrollToPlugin !== 'undefined') {
      gsap.registerPlugin(ScrollToPlugin);
    }
  }

  /* ── Logo variant switcher (only EN+Light gets the color logo for nav) ── */
  function updateLogo() {
    var lang  = document.documentElement.lang || 'en';
    var theme = document.documentElement.getAttribute('data-theme') || 'light';

    var navLogo = document.querySelector('.nav .logo-img');
    if (navLogo) {
      if (lang === 'en' && theme === 'light') {
        navLogo.src = 'assets/logo-text-color.png';
      } else {
        var src = navLogo.getAttribute('data-logo-' + lang);
        if (src) navLogo.src = src;
      }
    }

    var footerLogo = document.querySelector('.footer .logo-img');
    if (footerLogo) {
      var src = footerLogo.getAttribute('data-logo-' + lang);
      if (src) footerLogo.src = src;
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
    e.stopPropagation();
    if (floatingCard) {
      floatingCard.classList.add('hidden');
      floatingCard.style.display = 'none';
    }
  });

  /* Keep parallax on hero bg image */
  if (document.querySelector('.hero-bg img')) {
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
  }

  /* ── Reveal Up ── */
  gsap.utils.toArray('.reveal-up').forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  });

  /* ── Reveal Fade ── */
  gsap.utils.toArray('.reveal-fade').forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  });

  /* ── Reveal Scale ── */
  gsap.utils.toArray('.reveal-scale').forEach((el, i) => {
    gsap.fromTo(el,
      { opacity: 0, scale: 0.92 },
      {
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
      }
    );
  });

  /* ── Reveal Left / Right ── */
  gsap.utils.toArray('.reveal-left').forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  });

  gsap.utils.toArray('.reveal-right').forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  });

  /* ── Image Reveal (RTL Aware) ── */
  gsap.utils.toArray('.reveal-image').forEach((el) => {
    const isRTL = document.documentElement.dir === 'rtl' || document.documentElement.lang === 'ar';
    const fromClip = isRTL ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)';

    gsap.fromTo(el,
      { clipPath: fromClip },
      {
        clipPath: 'inset(0 0% 0 0%)',
        duration: 1.4,
        ease: 'power4.inOut',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  });

  /* ── Section Headers ── */
  gsap.utils.toArray('.section-header').forEach((header) => {
    const eyebrow = header.querySelector('.section-eyebrow');
    const title = header.querySelector('.section-title');
    const desc = header.querySelector('.section-desc');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: header,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });

    if (eyebrow) tl.fromTo(eyebrow, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 });
    if (title) tl.fromTo(title, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, eyebrow ? '-=0.3' : 0);
    if (desc) tl.fromTo(desc, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, title ? '-=0.4' : 0);
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
    const cards = container.querySelectorAll(child);
    if (!cards.length) return;

    gsap.fromTo(cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  });

  /* ── Gallery Stagger ── */
  const galleryGrid = document.querySelector('.gallery-grid');
  if (galleryGrid) {
    gsap.fromTo('.gallery-item',
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: galleryGrid,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }

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
  if (document.querySelector('.investment-section .pattern-bg')) {
    gsap.fromTo('.investment-section .pattern-bg',
      { y: -60 },
      {
        y: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '.investment-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );
  }

  /* ── CTA Parallax ── */
  if (document.querySelector('.cta-bg img')) {
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
  }

  /* ── Properties Slider (Draggable & Swipeable) ── */
  const track = document.getElementById('propertiesTrack');
  const wrapper = track?.parentElement;
  const prevBtn = document.getElementById('sliderPrev');
  const nextBtn = document.getElementById('sliderNext');
  let currentSlide = 0;
  let isDragging = false;
  let startX = 0;
  let dragOffset = 0;
  let currentTranslate = 0;

  function getVisibleSlides() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }

  function isRTL() {
    return document.documentElement.dir === 'rtl' || document.documentElement.lang === 'ar';
  }

  function getMaxSlide() {
    if (!track) return 0;
    const cards = track.querySelectorAll('.property-card');
    return Math.max(0, cards.length - getVisibleSlides());
  }

  function getSlideOffset(slideIndex) {
    if (!track) return 0;
    const cards = track.querySelectorAll('.property-card');
    const card = cards[0];
    if (!card) return 0;
    const gap = 24;
    const offset = slideIndex * (card.offsetWidth + gap);
    const direction = isRTL() ? 1 : -1;
    return direction * offset;
  }

  function updateSlider(animate = true) {
    if (!track) return;
    const maxSlide = getMaxSlide();
    currentSlide = Math.min(Math.max(0, currentSlide), maxSlide);
    currentTranslate = getSlideOffset(currentSlide);

    if (animate) {
      gsap.to(track, { x: currentTranslate, duration: 0.5, ease: 'power3.out' });
    } else {
      gsap.set(track, { x: currentTranslate });
    }
  }

  if (track && wrapper) {
    wrapper.style.cursor = 'grab';

    let hasDraggedFar = false;

    const onStart = (e) => {
      isDragging = true;
      hasDraggedFar = false;
      startX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
      dragOffset = 0;
      wrapper.style.cursor = 'grabbing';
      gsap.killTweensOf(track);
    };

    const onMove = (e) => {
      if (!isDragging) return;
      const x = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
      dragOffset = x - startX;

      if (Math.abs(dragOffset) > 5) {
        hasDraggedFar = true;
      }

      gsap.set(track, { x: currentTranslate + dragOffset });
    };

    const onEnd = () => {
      if (!isDragging) return;
      isDragging = false;
      wrapper.style.cursor = 'grab';

      const threshold = 45;
      const rtl = isRTL();

      if (dragOffset < -threshold) {
        if (rtl) {
          currentSlide = Math.max(0, currentSlide - 1);
        } else {
          currentSlide = Math.min(getMaxSlide(), currentSlide + 1);
        }
      } else if (dragOffset > threshold) {
        if (rtl) {
          currentSlide = Math.min(getMaxSlide(), currentSlide + 1);
        } else {
          currentSlide = Math.max(0, currentSlide - 1);
        }
      }

      updateSlider(true);
    };

    wrapper.addEventListener('click', (e) => {
      if (hasDraggedFar) {
        e.preventDefault();
        e.stopPropagation();
      }
    }, true);

    wrapper.addEventListener('mousedown', onStart);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onEnd);

    wrapper.addEventListener('touchstart', onStart, { passive: true });
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onEnd);
    window.addEventListener('touchcancel', onEnd);

    track.querySelectorAll('img').forEach((img) => {
      img.addEventListener('dragstart', (e) => e.preventDefault());
    });
  }

  prevBtn?.addEventListener('click', () => {
    if (isRTL()) {
      currentSlide = Math.min(getMaxSlide(), currentSlide + 1);
    } else {
      currentSlide = Math.max(0, currentSlide - 1);
    }
    updateSlider(true);
  });

  nextBtn?.addEventListener('click', () => {
    if (isRTL()) {
      currentSlide = Math.max(0, currentSlide - 1);
    } else {
      currentSlide = Math.min(getMaxSlide(), currentSlide + 1);
    }
    updateSlider(true);
  });

  window.addEventListener('resize', () => {
    currentSlide = 0;
    updateSlider(false);
  });

  document.addEventListener('i18n:ready', () => {
    currentSlide = 0;
    updateSlider(false);
    updateLogo();
    ScrollTrigger.refresh();
  });

  /* ── Smooth Anchor Scroll ── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      
      if (typeof ScrollToPlugin !== 'undefined') {
        gsap.to(window, {
          duration: 1.2,
          scrollTo: { y: target, offsetY: 68 },
          ease: 'power3.inOut',
        });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ── Floating Card Entrance ── */
  if (document.querySelector('.floating-card')) {
    gsap.fromTo('.floating-card',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 2,
        ease: 'power3.out',
      }
    );
  }

  /* ── Accessibility: Reduced Motion ── */
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
