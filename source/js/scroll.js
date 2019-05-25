(function() {
  'use strict';

  var headerNav = document.querySelector('#header-nav');
  var prevScrollTop = 0;

  window.addEventListener('scroll', throttle(function () {
    headerNavScroll();
  }, 20, 100));

  window.addEventListener('scroll', sidebarSticky);

  function headerNavScroll() {
    var nowScrollTop = getScrollTop();
    var delta = nowScrollTop - prevScrollTop;

    if (nowScrollTop === 0) {
      headerNav.classList.remove('fixed');
    } else {
      headerNav.classList.add('fixed');

      if (delta > 0) {
        if (Math.abs(delta) > 5) {
          headerNav.classList.remove('slider-down');
          headerNav.classList.add('slider-up');
        }
      } else {
        if (Math.abs(delta) > 5) {
          headerNav.classList.remove('slider-up');
          headerNav.classList.add('slider-down');
        }
      }
    }

    prevScrollTop = nowScrollTop;
  }

  var sidebar = document.querySelector('.sidebar-inner');
  var mainInner = document.querySelector('#main-inner');

  function sidebarSticky() {
    var mainInnerRect = mainInner.getBoundingClientRect();
        
    if (mainInnerRect.y < 30) {
      sidebar.classList.add('sticky');
    } else {
      sidebar.classList.remove('sticky');
    }
  }
})();
