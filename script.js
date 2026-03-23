// ── Matt Bazemore — Site Script ──────────────────────

(function () {
  'use strict';

  // ── Scroll Reveal ───────────────────────────────────
  var reveals = document.querySelectorAll('.reveal');

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(function (el) {
    revealObserver.observe(el);
  });

  // ── Sticky Nav on Scroll ────────────────────────────
  var hero = document.querySelector('.hero');
  var stickyNav = document.createElement('nav');
  stickyNav.className = 'nav-scrolled';
  stickyNav.innerHTML =
    '<a href="#work">Work</a>' +
    '<a href="#about">About</a>' +
    '<a href="#music">Music</a>' +
    '<a href="#connect">Connect</a>';
  document.body.appendChild(stickyNav);

  var navObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) {
        stickyNav.classList.add('visible');
      } else {
        stickyNav.classList.remove('visible');
      }
    });
  }, { threshold: 0 });

  navObserver.observe(hero);

  // ── Lightbox ────────────────────────────────────────
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var lightboxCaption = document.getElementById('lightbox-caption');
  var items = document.querySelectorAll('.gallery-item');
  var currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    var item = items[index];
    var img = item.querySelector('img');
    var caption = item.querySelector('figcaption');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = caption ? caption.textContent : '';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    lightboxImg.src = '';
    document.body.style.overflow = '';
  }

  function navigate(direction) {
    currentIndex = (currentIndex + direction + items.length) % items.length;
    var item = items[currentIndex];
    var img = item.querySelector('img');
    var caption = item.querySelector('figcaption');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = caption ? caption.textContent : '';
  }

  items.forEach(function (item, i) {
    item.addEventListener('click', function () {
      openLightbox(i);
    });
  });

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
      closeLightbox();
    }
  });

  document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  document.querySelector('.lightbox-prev').addEventListener('click', function (e) {
    e.stopPropagation();
    navigate(-1);
  });
  document.querySelector('.lightbox-next').addEventListener('click', function (e) {
    e.stopPropagation();
    navigate(1);
  });

  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });
})();
