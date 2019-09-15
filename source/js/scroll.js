$(document).ready(function () {
  // The previous distance from the page to the top.
  var prevScrollTop = 0;
  var isNavFix = false;
  var isNavShow = true;

  function headerNavScroll () {
    var $headerNav = $('.header-nav');
    var scrollTop = $(window).scrollTop();
    var delta = scrollTop - prevScrollTop;

    if (scrollTop === 0) {
      $headerNav.removeClass('fixed');
      $headerNav.removeClass('slider-up');
      $headerNav.addClass('slider-down');

      isNavFix = false;
    } else {
      if (!isNavFix) {
        $headerNav.addClass('fixed');

        isNavFix = true;
      }

      var MIN_SCROLL_TO_CHANGE_NAV = 5;
      // Make the state of nav bar not change due to tiny scrolling.
      if (Math.abs(delta) > MIN_SCROLL_TO_CHANGE_NAV) {
        if (isNavShow && delta > 0) {
          $headerNav.removeClass('slider-down');
          $headerNav.addClass('slider-up');

          isNavShow = false;
        } else if (!isNavShow && delta < 0) {
          $headerNav.removeClass('slider-up');
          $headerNav.addClass('slider-down');

          isNavShow = true;
        }
      }
    }

    prevScrollTop = scrollTop;
  }

  function scrollHeadingToTop (anchor) {
    $(anchor)
      .velocity('stop')
      .velocity('scroll', {
        easing: 'ease-in-out',
        duration: 600
      });
  }

  var isBack2topShow = false;

  // Back the page to top.
  function back2top () {
    var $back2top = $('#back2top');
    var scrollTop = $(window).scrollTop();

    if (scrollTop !== 0) {
      if (!isBack2topShow) {
        $back2top.addClass('show');
        $back2top.removeClass('hide');
        isBack2topShow = true;
      }
    } else {
      $back2top.addClass('hide');
      $back2top.removeClass('show');
      isBack2topShow = false;
    }
  }

  // Initialization
  headerNavScroll();
  back2top();

  $(window).on('DOMContentLoaded', back2top);
  $(window).on('scroll', Stun.utils.throttle(function () {
    headerNavScroll();
    back2top();
  }, 100));

  $('#back2top').on('click', function () {
    $('body').velocity('stop').velocity('scroll');
  });

  Stun.utils.pjaxReloadScroll = function () {
    // Click the heading.
    $('#content-wrap')
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
