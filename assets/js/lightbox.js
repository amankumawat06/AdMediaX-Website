// Lightbox for Work Examples — vanilla JS, minimal, scoped to .case-study work galleries
// - Targets images inside .case-study .work-grid .work-item .img-wrap img
// - Opens a centered modal with overlay, responsive scaling, close button, overlay click, and ESC key

(function () {
  'use strict';

  // Selector for work sample images (only Work Examples)
  var selector = '.case-study .work-grid .work-item .img-wrap img';

  // Wait for DOM
  document.addEventListener('DOMContentLoaded', function () {
    var modal = document.querySelector('.amx-lightbox');
    if (!modal) return; // safe fail

    var overlay = modal.querySelector('.amx-lightbox__overlay');
    var content = modal.querySelector('.amx-lightbox__content');
    var imgEl = modal.querySelector('.amx-lightbox__img');
    var closeBtn = modal.querySelector('.amx-lightbox__close');
    var body = document.body;

    function open(src, alt) {
      imgEl.src = src;
      imgEl.alt = alt || '';
      modal.setAttribute('aria-hidden', 'false');
      modal.classList.add('amx-lightbox--visible');

      // Prevent background scroll and compensate for scrollbar width to avoid layout shift
      var scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      if (scrollBarWidth > 0) {
        body.style.paddingRight = scrollBarWidth + 'px';
      }
      body.style.overflow = 'hidden';

      // Focus the close button for accessibility
      closeBtn.focus();

      document.addEventListener('keydown', onKey);
    }

    function close() {
      modal.setAttribute('aria-hidden', 'true');
      modal.classList.remove('amx-lightbox--visible');
      // clear src to potentially free memory on mobile
      imgEl.src = '';
      body.style.overflow = '';
      body.style.paddingRight = '';
      document.removeEventListener('keydown', onKey);
    }

    function onKey(e) {
      if (e.key === 'Escape' || e.key === 'Esc') {
        close();
      }
    }

    // Close interactions
    overlay.addEventListener('click', close);
    closeBtn.addEventListener('click', close);

    // Prevent clicks inside content from bubbling to overlay
    content.addEventListener('click', function (e) { e.stopPropagation(); });

    // Delegate clicks on any matching image in document (works for future images too)
    document.addEventListener('click', function (e) {
      var target = e.target;
      var img = target.closest ? target.closest(selector) : null;
      if (img) {
        // Clicked a work sample image — open modal with its source
        open(img.src, img.alt);
      }
    });

    // Accessibility: close modal when focus leaves? Minimal — keep simple
  });
})();
