$(document).ready(function () {
  // The previous distance from the page to the top.
  var prevScrollTop = 0;
  
  // Initial run.
  headerNavScroll();
  backToTop();

  $(window).scroll(throttle(function () {
    headerNavScroll();
    backToTop();
  }, 20, 100));
  
  // Click the heading.
  $('.main-content')
    .find('h1,h2,h3,h4,h5,h6')
    .on('click', function () {
      scrollHeadingToTop('#' + $(this).attr('id'))
    });

  // Click the post toc.
  $('.toc-link').on('click', function (e) {
    e.preventDefault();

    scrollHeadingToTop($(this).attr('href'));
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

  // Scroll heading to the top.
  function scrollHeadingToTop(anchor) {
    $(anchor)
      .velocity('stop')
      .velocity('scroll', {
        duration: 500,
        easing: 'easeOutSine'
      });
  }

  function backToTop() {
    var scrollTop = $(window).scrollTop();

    if (scrollTop !== 0) {
      $('#back-top').css('display', 'block');
    } else {
      $('#back-top').css('display', 'none');
    }
  }
});
