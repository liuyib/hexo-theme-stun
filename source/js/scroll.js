$(function () {
  var SIDEBAR_STICKY_TOP = 30;
  var prevScrollTop = 0;
  var initScrollTop = $(window).scrollTop();
  
  headerNavScroll(initScrollTop);
  backToTop(initScrollTop);

  $(window).scroll(throttle(function () {
    var scrollTop = $(this).scrollTop();
    
    headerNavScroll(scrollTop);
    backToTop(scrollTop);
  }, 20, 100));
  
  var post = document.querySelector('#post');
  var postH = $('#post').height() - $(window).height();
  var scrollH = post && parseInt(post.getBoundingClientRect().top);
  
  updateProgress(postH, scrollH);
  sidebarSticky();
  
  $(window).scroll(function () {
    var scrollH = post && parseInt(post.getBoundingClientRect().top);

    updateProgress(postH, scrollH);
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

    $('#back-top').velocity({
      translateY: '-100vh',
    }, {
      duration: 500
    }).velocity('reverse', {
      duration: 10
    });
  });
  
  // site header nav scroll
  function headerNavScroll(scrollTop) {
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
    if (document.querySelector('.main-inner')) {
      var targetY = document.querySelector('.main-inner')
        .getBoundingClientRect().top;

      if (targetY < SIDEBAR_STICKY_TOP) {
        $('.sidebar-inner').addClass('sticky');
      } else {
        $('.sidebar-inner').removeClass('sticky');
      }
    }
  }

  // update the reading progress lines of post
  function updateProgress(postH, scrollH) {
    var result = '';
    
    if (Math.abs(scrollH) === 0) {
      result = '0%'
      
      $('.sidebar-progress').css('display', 'block');
    } else if (scrollH < 0) {
      var scrollH = Math.abs(scrollH);
      
      if (scrollH <= postH) {
        result = parseInt((scrollH / postH) * 100) + '%';
      } else {
        result = '100%';
      }

      $('.sidebar-progress').css('display', 'block');
    } else {
      $('.sidebar-progress').css('display', 'none');
    }

    $('.sidebar-progress-number').html(result);
    $('.sidebar-progress-line').css('width', result);
  }

  // scroll heading to top
  function scrollToHead(anchor) {
    $(anchor).velocity('stop').velocity('scroll', {
      duration: 500,
      easing: 'easeOutSine'
    });
  }

  // back to top
  function backToTop(scrollTop) {
    if (scrollTop !== 0) {
      $('#back-top').css('display', 'block');
    } else {
      $('#back-top').css('display', 'none');
    }
  }
});
