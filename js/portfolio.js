/* ==========================================================================
   Portfolio JS — Muhammad Zulhilmi
   ========================================================================== */

'use strict';

// --------------------------------------------------------------------------
// 1. Typewriter Effect
// --------------------------------------------------------------------------
(function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const phrases = [
    'Staff Quality Engineer',
    'AI Testing Specialist',
    'Test Automation Architect',
    'CI/CD Pipeline Engineer',
    'ISTQB CT-AI Certified',
    'QA Leader & Mentor',
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let isPaused = false;

  function tick() {
    const current = phrases[phraseIdx];

    if (isPaused) {
      isPaused = false;
      setTimeout(tick, 1400);
      return;
    }

    if (!isDeleting) {
      el.textContent = current.slice(0, ++charIdx);
      if (charIdx === current.length) {
        isDeleting = true;
        isPaused = true;
        setTimeout(tick, 80);
        return;
      }
    } else {
      el.textContent = current.slice(0, --charIdx);
      if (charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
      }
    }

    setTimeout(tick, isDeleting ? 40 : 80);
  }

  tick();
})();

// --------------------------------------------------------------------------
// 2. Navigation — Sticky + Active Section Highlighting
// --------------------------------------------------------------------------
(function initNav() {
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav__links a');
  const burger = document.getElementById('navBurger');
  const linksContainer = document.getElementById('navLinks');
  const sections = document.querySelectorAll('section[id]');

  // Scroll-based sticky style
  function onScroll() {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    // Active section highlighting
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 100;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile burger menu
  burger.addEventListener('click', () => {
    const isOpen = linksContainer.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on link click (mobile)
  linksContainer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      linksContainer.classList.remove('open');
      burger.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

// --------------------------------------------------------------------------
// 3. Scroll Animations (Intersection Observer)
// --------------------------------------------------------------------------
(function initAnimations() {
  // Timeline items
  const timelineItems = document.querySelectorAll('.timeline__item');
  const timelineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, i * 100);
          timelineObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  timelineItems.forEach(el => timelineObserver.observe(el));

  // Generic section reveal
  const revealEls = document.querySelectorAll(
    '.skill-card, .cert-card, .project-card, .about__card, .highlight, .contact__item'
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, (i % 6) * 80);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
  );

  revealEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    revealObserver.observe(el);
  });
})();

// --------------------------------------------------------------------------
// 4. Smooth Scroll (for older browser safety net)
// --------------------------------------------------------------------------
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();

// --------------------------------------------------------------------------
// 5. Hero Parallax Orbs on Mouse Move
// --------------------------------------------------------------------------
(function initParallax() {
  const orbs = document.querySelectorAll('.hero__orb');
  if (!orbs.length) return;

  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;

    orbs.forEach((orb, i) => {
      const factor = (i + 1) * 12;
      orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
    });
  });
})();

// --------------------------------------------------------------------------
// 6. Stats Counter Animation
// --------------------------------------------------------------------------
(function initCounters() {
  const statsSection = document.querySelector('.hero__stats');
  if (!statsSection) return;

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !animated) {
      animated = true;
      document.querySelectorAll('.stat__num').forEach(el => {
        const text = el.textContent.trim();
        const match = text.match(/^(\d+)/);
        if (!match) return;

        const target = parseInt(match[1], 10);
        const suffix = text.replace(match[1], '');
        let current = 0;
        const step = Math.ceil(target / 40);
        const interval = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = current + suffix;
          if (current >= target) clearInterval(interval);
        }, 30);
      });
    }
  }, { threshold: 0.5 });

  observer.observe(statsSection);
})();
