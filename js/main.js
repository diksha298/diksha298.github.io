/**
 * Mehendi Art – optimised main script
 * Replaces custom.js + click-scroll.js
 * No global jQuery pollution; uses vanilla JS where possible.
 */
(function ($) {
  'use strict';

  /* ── NAVBAR COLLAPSE on link click ─────────────────────────── */
  $('.navbar-collapse a').on('click', function () {
    $('.navbar-collapse').collapse('hide');
  });

  /* ── HERO SLIDESHOW ─────────────────────────────────────────── */
  $(function () {
    $('.hero-slides').vegas({
      slides: [
        { src: 'images/slides/sincere-laugh-showing-picture-smartphone-casual-meeting-with-best-friends-restaurant-terrace.jpg' },
        { src: 'images/happy-waitress-giving-coffee-customers-while-serving-them-coffee-shop.jpg' },
        { src: 'images/young-female-barista-wear-face-mask-serving-take-away-hot-coffee-paper-cup-consumer-cafe.jpg' }
      ],
      timer: false,
      animation: 'kenburns'
    });
  });

  /* ── SMOOTH SCROLL ──────────────────────────────────────────── */
  function scrollToSection(targetSelector) {
    var $target = $(targetSelector);
    if (!$target.length) return;
    var navH = $('.navbar').outerHeight() + 60;
    $('html, body').animate({ scrollTop: $target.offset().top - navH }, 300);
  }

  $('.smoothscroll, .click-scroll').on('click', function (e) {
    var href = $(this).attr('href');
    if (href && href.charAt(0) === '#') {
      e.preventDefault();
      scrollToSection(href);
    }
  });

  /* ── BACK TO TOP ────────────────────────────────────────────── */
  var $backBtn = $('<button class="back-to-top" aria-label="Back to top" title="Back to top">' +
                   '<i class="bi-arrow-up"></i></button>');
  $('body').append($backBtn);

  $(window).on('scroll.backTop', function () {
    $backBtn.toggleClass('visible', $(this).scrollTop() > 400);
  });

  $backBtn.on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 300);
  });

  /* ── ACTIVE NAV LINK on scroll ──────────────────────────────── */
  var $sections = $('section[id]');
  var $navLinks = $('.navbar-nav .nav-link');

  function highlightNav() {
    var scrollY = $(window).scrollTop() + 100;
    $sections.each(function () {
      var top    = $(this).offset().top;
      var bottom = top + $(this).outerHeight();
      var id     = $(this).attr('id');
      if (scrollY >= top && scrollY < bottom) {
        $navLinks.removeClass('active');
        $navLinks.filter('[href="#' + id + '"]').addClass('active');
      }
    });
  }

  $(window).on('scroll.navHighlight', highlightNav);
  highlightNav();

  /* ── LAZY-LOAD fade-in ──────────────────────────────────────── */
  if ('IntersectionObserver' in window) {
    var imgObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var img = entry.target;
          img.addEventListener('load', function () {
            img.classList.add('loaded');
          });
          if (img.complete) img.classList.add('loaded');
          imgObserver.unobserve(img);
        }
      });
    }, { rootMargin: '200px' });

    document.querySelectorAll('img[loading="lazy"]').forEach(function (img) {
      imgObserver.observe(img);
    });
  } else {
    // Fallback: just show all images
    document.querySelectorAll('img[loading="lazy"]').forEach(function (img) {
      img.classList.add('loaded');
    });
  }

})(window.jQuery);
