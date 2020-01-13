$(document).ready(function () {
  var $menu = $('.header-nav-menu');
  var $submenu = $('.header-nav-submenu');
  var $menuItem = $('.header-nav-menu-item');
  var $menuBtn = $('.header-nav-btn');
  var isMobile = $menuBtn.is(':visible');

  function resetMenuHeight () {
    $menuItem.velocity({
      height: $menuItem.height()
    }, {
      complete: function () {
        $submenu.css({ display: 'none', opacity: 0 });
      }
    });
  }

  var isMenuShow = false;
  var isSubmenuShow = false;

  $(window).on('resize', Stun.utils.throttle(function () {
    isMobile = $menuBtn.is(':visible');

    if (isMobile && isSubmenuShow) {
      resetMenuHeight();
      isSubmenuShow = false;
    } else {
      $submenu.css({ display: 'none', opacity: 0 });
    }
  }, 200));

  $(document).on('click', function () {
    if ($menu.is(':visible')) {
      if (isMobile && isSubmenuShow) {
        resetMenuHeight();
        isSubmenuShow = false;
      }

      $menu.css({ display: 'none' });
      isMenuShow = false;
    }

    if (isNightModeFocus) {
      $nightMode.removeClass('mode--focus');
      isNightModeFocus = false;
    }
  });

  function getNightMode () {
    var nightMode = false;

    try {
      if (parseInt(Stun.utils.Cookies().get(NIGHT_MODE_COOKIES_KEY))) {
        nightMode = true;
      }
    } catch (err) {}

    return nightMode;
  }

  if (CONFIG.night_mode && CONFIG.night_mode.enable) {
    var isNightMode = false;
    var isNightModeFocus = false;
    var NIGHT_MODE_COOKIES_KEY = 'night_mode';
    var $nightMode = $('.mode');

    if (getNightMode()) {
      $nightMode.addClass('mode--checked');
      $nightMode.addClass('mode--focus');
      $('html').addClass('nightmode');
      isNightMode = true;
    } else {
      isNightMode = false;
    }

    $('.mode').on('click', function (e) {
      e.stopPropagation();

      isNightMode = !isNightMode;
      isNightModeFocus = !isNightModeFocus;
      Stun.utils.Cookies().set(NIGHT_MODE_COOKIES_KEY, isNightMode ? 1 : 0);

      $nightMode.toggleClass('mode--checked');
      $nightMode.addClass('mode--focus');
      $('html').toggleClass('nightmode');
    });
  }

  $menuBtn.on('click', function (e) {
    e.stopPropagation();

    if (isMobile && isMenuShow && isSubmenuShow) {
      resetMenuHeight();
      isSubmenuShow = false;
    }
    if (!isMenuShow) {
      isMenuShow = true;
    } else {
      isMenuShow = false;
    }

    $menu.velocity('stop').velocity({
      opacity: isMenuShow ? 1 : 0
    }, {
      duration: isMenuShow ? 200 : 0,
      display: isMenuShow ? 'block' : 'none'
    });
  });

  // Whether to allow events to bubble in the menu.
  var isBubbleInMenu = false;
  var $submenuItem = $('.header-nav-submenu-item');

  $submenuItem.on('click', function () {
    isBubbleInMenu = true;
  });

  $menuItem.on('click', function (e) {
    if (!isMobile) {
      return;
    }

    var $submenu = $(this).find('.header-nav-submenu');
    if (!$submenu.length) {
      return;
    }
    if (!isBubbleInMenu) {
      e.stopPropagation();
    } else {
      isBubbleInMenu = false;
    }

    var menuItemHeight = $menuItem.height();
    var submenuHeight = menuItemHeight + $submenu.height() * $submenu.length;
    var menuShowHeight = 0;

    if ($(this).height() > menuItemHeight) {
      isSubmenuShow = false;
      menuShowHeight = menuItemHeight;
    } else {
      isSubmenuShow = true;
      menuShowHeight = submenuHeight;
    }

    $submenu.css({ display: 'block', opacity: 1 });
    // Accordion effect.
    $(this)
      .velocity('stop')
      .velocity({ height: menuShowHeight }, { duration: 300 })
      .siblings()
      .velocity({ height: menuItemHeight }, { duration: 300 });
  });

  $menuItem.on('mouseenter', function () {
    var $submenu = $(this).find('.header-nav-submenu');
    if (!$submenu.length) {
      return;
    }
    if (!$submenu.is(':visible')) {
      if (isMobile) {
        $submenu.css({ display: 'block', opacity: 1 });
      } else {
        $submenu
          .velocity('stop')
          .velocity('transition.slideUpIn', { duration: 200 });
      }
    }
  });

  $menuItem.on('mouseleave', function () {
    var $submenu = $(this).find('.header-nav-submenu');
    if (!$submenu.length) {
      return;
    }
    if ($submenu.is(':visible') && !isMobile) {
      $submenu.css({ display: 'none', opacity: 0 });
      isSubmenuShow = false;
    }
  });

  Stun.utils.pjaxReloadHeader = function () {
    if (CONFIG.header && CONFIG.header.scrollDownIcon) {
      $('.header-info-scrolldown').on('click', function () {
        $('#container').velocity('scroll', {
          offset: $('#header').height()
        });
      });
    }
  };

  // Initializaiton
  Stun.utils.pjaxReloadHeader();
});
