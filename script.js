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
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  reveals.forEach(function (el) {
    revealObserver.observe(el);
  });

  // ── Sticky Nav on Scroll ────────────────────────────
  var hero = document.querySelector('.hero');
  var stickyNav = document.createElement('nav');
  stickyNav.className = 'nav-scrolled';
  stickyNav.innerHTML =
    '<a href="#work" data-section="work">Work</a>' +
    '<a href="#about" data-section="about">About</a>' +
    '<a href="#music" data-section="music">Music</a>' +
    '<a href="#connect" data-section="connect">Connect</a>';
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

  // ── Active Nav Highlighting ─────────────────────────
  var sections = document.querySelectorAll('section[id]');
  var navLinks = stickyNav.querySelectorAll('a');

  var sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var id = entry.target.getAttribute('id');
        navLinks.forEach(function (link) {
          if (link.getAttribute('data-section') === id) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '-80px 0px -50% 0px'
  });

  sections.forEach(function (section) {
    sectionObserver.observe(section);
  });

  // ── Lightbox ────────────────────────────────────────
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var lightboxCaption = document.getElementById('lightbox-caption');
  var items = document.querySelectorAll('.gallery-item');
  var currentIndex = 0;

  function showImage(index) {
    var item = items[index];
    var img = item.querySelector('img');
    var caption = item.querySelector('figcaption');

    // Crossfade effect
    lightboxImg.classList.add('switching');
    lightboxCaption.classList.add('switching');

    setTimeout(function () {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxCaption.textContent = caption ? caption.textContent : '';
      lightboxImg.classList.remove('switching');
      lightboxCaption.classList.remove('switching');
    }, 200);
  }

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
    document.body.style.overflow = '';
    // Defer clearing src to avoid flash
    setTimeout(function () {
      if (!lightbox.classList.contains('active')) {
        lightboxImg.src = '';
      }
    }, 400);
  }

  function navigate(direction) {
    currentIndex = (currentIndex + direction + items.length) % items.length;
    showImage(currentIndex);
  }

  items.forEach(function (item, i) {
    item.addEventListener('click', function () {
      openLightbox(i);
    });
  });

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) {
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
