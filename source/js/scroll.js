$(document).ready(function () {
  var SIDEBAR_STICKY_TOP = parseInt(window.CONFIG.sidebar_offsetTop);
  var prevScrollTop = 0;
    
  // Must initial run
  headerNavScroll();
  backToTop();

  $(window).scroll(throttle(function () {
    headerNavScroll();
    backToTop();
  }, 20, 100));
  
  // Must initial run
  readProgress();
  sidebarSticky();

  $(window).scroll(function () {
    readProgress();
    sidebarSticky();
  });

  // click heading
  $('.main-content')
    .find('h1,h2,h3,h4,h5,h6')
    .on('click', function () {
      scrollToHead('#' + $(this).attr('id'))
    });

  // click post toc
  $('.toc-link').on('click', function (e) {
    e.preventDefault();

    scrollToHead($(this).attr('href'));
  });

  $('#back-top').click(function () {
    $('body').velocity('stop').velocity('scroll', {
      duration: 500,
      easing: 'easeOutQuart'
    });

    if (window.CONFIG.back2top_animation) {
      $('#back-top').velocity({
        translateY: '-100vh',
      }, {
        duration: 500
      }).velocity('reverse', {
        duration: 10
      });
    }
  });
  
  // site header nav scroll
  function headerNavScroll() {
    var scrollTop = $(window).scrollTop();
    var delta = scrollTop - prevScrollTop;

    if (scrollTop === 0) {
      $('.header-nav').removeClass('fixed');
      $('.header-nav').removeClass('slider-up');
      $('.header-nav').addClass('slider-down');
    } else {
      $('.header-nav').addClass('fixed');

      if (delta > 0) {
        if (Math.abs(delta) > 5) {
          $('.header-nav').removeClass('slider-down');
          $('.header-nav').addClass('slider-up');
        }
      } else {
        if (Math.abs(delta) > 5) {
          $('.header-nav').removeClass('slider-up');
          $('.header-nav').addClass('slider-down');
        }
      }
    }

    prevScrollTop = scrollTop;
  }

  // sidebar sticky
  function sidebarSticky() {
    var mainInner = document.querySelector('.main-inner');
    
    if (mainInner) {
      var targetY = mainInner.getBoundingClientRect().top;

      if (targetY < SIDEBAR_STICKY_TOP) {
        $('.sidebar-inner').addClass('sticky');
      } else {
        $('.sidebar-inner').removeClass('sticky');
      }
    }
  }

  // update the reading progress lines of post
  function readProgress() {
    var winH = $(window).height();
    var postH = $('.main-content').height();
    var post = document.querySelector('.main-content');
    var scrollH = (post &&
      post.getBoundingClientRect().top * -1) || 0
    
    var percent = parseInt((scrollH / Math.abs((postH - winH))) * 100);
    percent = percent > 100 ? 100 : percent < 0 ? 0 : percent;
    percent += '%';

    $('.sidebar-progress-number').html(percent);
    $('.sidebar-progress-line').css('width', percent);
  }

  // scroll heading to top
  function scrollToHead(anchor) {
    $(anchor)
      .velocity('stop')
      .velocity('scroll', {
        duration: 500,
        easing: 'easeOutSine'
      });
  }

  // back to top
  function backToTop() {
    var scrollTop = $(window).scrollTop();

    if (scrollTop !== 0) {
      $('#back-top').css('display', 'block');
    } else {
      $('#back-top').css('display', 'none');
    }
  }
});
