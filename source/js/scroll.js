$(document).ready(function () {
  var isHeaderEnable = CONFIG.header && CONFIG.header.enable;
  var isShowHeaderOnPost = isHeaderEnable && CONFIG.header.showOnPost;
  // The previous distance from the page to the top.
  var prevScrollTop = 0;
  var isNavFix = false;
  var isAnimation = true;

  function headerNavScroll () {
    var isPostPage = !!$('#is-post').length;
    var isNoHeader = !isHeaderEnable || (isPostPage && !isShowHeaderOnPost);
    var $headerNav = $('.header-nav');
    var scrollTop = Math.floor($(window).scrollTop());
    var delta = Math.floor(scrollTop - prevScrollTop);

    if (scrollTop === 0) {
      if (isNoHeader) {
        setTimeout(function () {
          $headerNav.addClass('slider--clear');
          isAnimation = false;
        }, 200);
      }
      $headerNav.removeClass('header-nav--sticky');
      $headerNav.removeClass('slider--up');
      $headerNav.addClass('slider--down');
    } else {
      if (isNoHeader && scrollTop < $headerNav.height()) {
        return false;
      }

      var MIN_SCROLL_TO_CHANGE_NAV = 5;
      // Make the state of nav bar not change due to tiny scrolling.
      if (Math.abs(delta) > MIN_SCROLL_TO_CHANGE_NAV) {
        if (isNoHeader) {
          if (!isAnimation) {
            isAnimation = true;
          } else {
            $headerNav.removeClass('slider--clear');
          }
        }
        if (!isNavFix) {
          isNavFix = true;
        } else {
          $headerNav.addClass('header-nav--sticky');
        }
        if (delta > 0) {
          $headerNav.removeClass('slider--down');
          $headerNav.addClass('slider--up');
        } else {
          $headerNav.removeClass('slider--up');
          $headerNav.addClass('slider--down');
        }
      } else {
        $headerNav.addClass('header-nav--sticky');
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

  var isBack2topEnable = CONFIG.back2top && CONFIG.back2top.enable;
  var isBack2topShow = false;

  // Back the page to top.
  function back2top () {
    var $back2top = $('#back2top');
    var scrollTop = $(window).scrollTop();

    if (scrollTop !== 0) {
      if (!isBack2topShow) {
        $back2top.addClass('back2top--show');
        $back2top.removeClass('back2top--hide');
        isBack2topShow = true;
      }
    } else {
      $back2top.addClass('back2top--hide');
      $back2top.removeClass('back2top--show');
      isBack2topShow = false;
    }
  }

  if (isBack2topEnable) {
    // Initializaiton
    back2top();

    $('#back2top').on('click', function () {
      $('body')
        .velocity('stop')
        .velocity('scroll');
    });
  }

  // Initializaiton
  headerNavScroll();

  $(window).on(
    'scroll',
    Stun.utils.throttle(function () {
      headerNavScroll();

      if (isBack2topEnable) {
        back2top();
      }
    }, 100)
  );

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
