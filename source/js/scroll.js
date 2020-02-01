$(document).ready(function () {
  var _CONFIG = window.CONFIG;
  var _Stun = window.Stun;

  var isHeaderEnable = _CONFIG.header && _CONFIG.header.enable;
  var isShowHeaderOnPost = isHeaderEnable && _CONFIG.header.showOnPost;
  // The previous distance from the page to the top.
  var prevScrollTop = 0;
  var isNavFix = false;
  var isNavShow = true;
  var isAnimation = false;

  function headerNavScroll () {
    var isPostPage = !!$('#is-post').length;
    var isNoHeader = !isHeaderEnable || (isPostPage && !isShowHeaderOnPost);
    var $headerNav = $('.header-nav');
    var scrollTop = Math.floor($(window).scrollTop());
    var delta = Math.floor(scrollTop - prevScrollTop);

    if (scrollTop === 0) {
      if (isNoHeader) {
        $headerNav.addClass('slider--clear');
        isAnimation = false;
      }
      $headerNav.removeClass('header-nav--sticky');
      $headerNav.removeClass('slider--up');
      $headerNav.addClass('slider--down');
      isNavFix = false;
      isNavShow = true;
    } else {
      if (isNoHeader && scrollTop < $headerNav.height()) {
        return false;
      }
      if (!isNavFix) {
        $headerNav.addClass('header-nav--sticky');
        isNavFix = true;
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
        if (delta > 0) {
          if (isNavShow) {
            $headerNav.removeClass('slider--down');
            $headerNav.addClass('slider--up');
            isNavShow = false;
          }
        } else {
          if (!isNavShow) {
            $headerNav.removeClass('slider--up');
            $headerNav.addClass('slider--down');
            isNavShow = true;
          }
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

  var isBack2topEnable = _CONFIG.back2top && _CONFIG.back2top.enable;
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
    _Stun.utils.throttle(function () {
      headerNavScroll();

      if (isBack2topEnable) {
        back2top();
      }
    }, 100)
  );

  _Stun.utils.pjaxReloadScroll = function () {
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
  _Stun.utils.pjaxReloadScroll();
});
