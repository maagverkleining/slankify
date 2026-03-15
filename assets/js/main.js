// =========================================
// Slankify.nl — Hoofd JavaScript
// =========================================

document.addEventListener('DOMContentLoaded', function () {

  // ---- Hamburger menu ----
  const hamburger = document.querySelector('.hamburger');
  const navUl = document.querySelector('nav ul');

  if (hamburger && navUl) {
    hamburger.addEventListener('click', function () {
      navUl.classList.toggle('open');
    });
  }

  // ---- Actieve nav link markeren ----
  const huidigePad = window.location.pathname.split('/').pop();
  document.querySelectorAll('nav ul li a').forEach(function (link) {
    const linkPad = link.getAttribute('href').split('/').pop();
    if (linkPad === huidigePad) {
      link.classList.add('actief');
    }
  });

  // ---- Animatie bij scrollen (Intersection Observer) ----
  const animeerElemanten = document.querySelectorAll(
    '.product-kaart, .categorie-kaart, .voordeel-item, .review-kaart'
  );

  if ('IntersectionObserver' in window) {
    const observerOpties = {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, observerOpties);

    animeerElemanten.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    });
  }

  // ---- Nieuwsbrief formulier ----
  const nieuwsbriefForm = document.querySelector('.nieuwsbrief-form');
  if (nieuwsbriefForm) {
    nieuwsbriefForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const emailInput = nieuwsbriefForm.querySelector('input[type="email"]');
      if (emailInput && emailInput.value.includes('@')) {
        nieuwsbriefForm.innerHTML =
          '<p style="font-size:1.1rem;font-weight:700;">✅ Bedankt! Je staat nu ingeschreven voor onze tips.</p>';
      }
    });
  }

  // ---- Smooth scroll voor anker-links ----
  document.querySelectorAll('a[href^="#"]').forEach(function (anker) {
    anker.addEventListener('click', function (e) {
      const doel = document.querySelector(this.getAttribute('href'));
      if (doel) {
        e.preventDefault();
        doel.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---- Affiliate klik tracking (placeholder) ----
  document.querySelectorAll('.affiliate-link').forEach(function (link) {
    link.addEventListener('click', function () {
      const product = this.dataset.product || 'onbekend';
      const categorie = this.dataset.categorie || 'onbekend';
      // Vervang dit met echte analytics tracking (bijv. GA4 event)
      console.log('[Slankify] Affiliate klik:', { product, categorie });
    });
  });

});
