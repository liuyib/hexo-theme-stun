$(document).ready(function () {
  // The previous distance from the page to the top.
  var prevScrollTop = 0;
  var isNavFix = false;
  var isNavShow = true;

  function headerNavScroll () {
    var scrollTop = $(window).scrollTop();
    var delta = scrollTop - prevScrollTop;

    if (scrollTop === 0) {
      $('.header-nav').removeClass('fixed');
      $('.header-nav').removeClass('slider-up');
      $('.header-nav').addClass('slider-down');

      isNavFix = false;
    } else {
      if (!isNavFix) {
        $('.header-nav').addClass('fixed');

        isNavFix = true;
      }

      var MIN_SCROLL_TO_CHANGE_NAV = 5;
      // Make the state of nav bar not change due to tiny scrolling.
      if (Math.abs(delta) > MIN_SCROLL_TO_CHANGE_NAV) {
        if (isNavShow && delta > 0) {
          $('.header-nav').removeClass('slider-down');
          $('.header-nav').addClass('slider-up');

          isNavShow = false;
        } else if (!isNavShow && delta < 0) {
          $('.header-nav').removeClass('slider-up');
          $('.header-nav').addClass('slider-down');

          isNavShow = true;
        }
      }
    }

    prevScrollTop = scrollTop;
  }

  function scrollHeadingToTop (anchor) {
    $(anchor)
      .velocity('stop')
      .velocity('scroll', { easing: 'easeOutSine' });
  }

  var isBack2topShow = false;
  // Back the page to top.
  function back2top () {
    function back2topHandler () {
      var $top = $('#back-top');
      var scrollTop = $(window).scrollTop();

      if (scrollTop !== 0) {
        if (!isBack2topShow) {
          $top.addClass('show');
          $top.removeClass('hide');
          isBack2topShow = true;
        }
      } else {
        $top.addClass('hide');
        $top.removeClass('show');
        isBack2topShow = false;
      }
    }

    $(window).on('load', back2topHandler);
    $(window).on('scroll', Stun.utils.throttle(function () {
      back2topHandler();
    }, 500));

    $('#back-top').on('click', function () {
      $('body').velocity('stop').velocity('scroll');
    });
  }

  // Initialization
  headerNavScroll();
  back2top();

  $(window).on('scroll', Stun.utils.throttle(function () {
    headerNavScroll();
  }, 100));

  Stun.utils.pjaxReloadScroll = function () {
    // Click the heading.
    $('.content')
      .find('h1,h2,h3,h4,h5,h6')
      .on('click', function () {
        scrollHeadingToTop('#' + $(this).attr('id'));
      });

    // Click the post toc.
    $('.toc-link').on('click', function (e) {
      e.preventDefault();
      scrollHeadingToTop($(this).attr('href'));
    });
  };

  // Initializaiton
  Stun.utils.pjaxReloadScroll();
});
