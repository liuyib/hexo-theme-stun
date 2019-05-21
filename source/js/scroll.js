(function () {
  'use strict';

  var nav = $('#header-nav');
  var oldScrollTop = 0;
  window.addEventListener('scroll', scrollHandler)

  function scrollHandler() {
    var newScrollTop = getScrollTop();
    var delta = newScrollTop - oldScrollTop;

    if (newScrollTop === 0) {
      nav.classList.remove('fixed');
    } else {
      nav.classList.add('fixed');

      if (delta > 0) {
        if (Math.abs(delta) > 5) {
          nav.classList.remove('slider-down');
          nav.classList.add('slider-up');
        }
      } else {
        if (Math.abs(delta) > 5) {
          nav.classList.remove('slider-up');
          nav.classList.add('slider-down');
        }
      }
    }
        
    oldScrollTop = newScrollTop;
  };
})();