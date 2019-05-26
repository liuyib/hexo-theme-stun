(function () {
'use strict';

domready(function () {
  var headerNav = document.querySelector('#header-nav');
  var prevScrollTop = 0;

  // header nav slider animation
  headerNavScroll();
  window.addEventListener('scroll', throttle(function () {
    headerNavScroll();
  }, 20, 100));

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
  var progress = document.querySelector('.sidebar-progress');
  var progressNumber = document.querySelector('.sidebar-progress-number');
  var progressLine = document.querySelector('.sidebar-progress-line');

  // sticky the sidebar
  sidebarSticky();

  window.addEventListener('scroll', function () {
    sidebarSticky();
  });

  function sidebarSticky() {
    var mainInnerRect = mainInner.getBoundingClientRect();
        
    if (mainInnerRect.y < 30) {
      sidebar.classList.add('sticky');
    } else {
      sidebar.classList.remove('sticky');
    }
  }

  var post = document.querySelector('#post');
  
  if (post) {
    var postHeight = post.offsetHeight - getWindowClient().height;
    
    // update post read progress
    updateProgress();

    window.addEventListener('scroll', function () {
      updateProgress();
    });
  }
  
  function updateProgress() {
    var postRect = post.getBoundingClientRect();
    var scrollHeight = parseInt(postRect.y);
    var result = '';

    if (Math.abs(scrollHeight) === 0) {
      result = '0%'
      progress.style.display = 'block';
    } else if (scrollHeight < 0) {
      if (parseInt((Math.abs(scrollHeight) / postHeight) * 100) > 100) {
        result = '100%';
      } else {
        result = parseInt((Math.abs(scrollHeight) / postHeight) * 100) + '%';
      }
      progress.style.display = 'block';
    } else {
      progress.style.display = 'none';
    }

    progressNumber.innerText = result;
    progressLine.style.width = result;
  }
});
})();
