$(document).ready(function () {
  var $menu = $('.header-nav-menu');
  var $menuItem = $('.header-nav-menu > .header-nav-menu-item');
  var $allSubmenu = $('.header-nav-submenu');

  function closeMenuItem () {
    $menuItem.velocity({
      height: $menuItem.height()
    });
  }

  function resetMenuStatus () {
    $menuItem.velocity('stop').velocity({
      height: $menuItem.height()
    }, {
      complete: function () {
        $allSubmenu.css({ display: 'none', opacity: 0 });
      }
    });
  }

  var isMenuShow = false;
  var isSubmenuShow = false;

  $(window).on('resize', function () {
    if (isSubmenuShow) {
      resetMenuStatus();
      isSubmenuShow = false;
    }
  });

  $(document).on('click', function () {
    if ($menu.is(':visible')) {
      closeMenuItem();
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

  $('.header-nav-btn').on('click', function (e) {
    e.stopPropagation();

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

    if (!isMenuShow) {
      closeMenuItem();
    }
  });

  $menuItem.on('click', function (e) {
    var $submenu = $(this).find('.header-nav-submenu');
    var menuItemHeight = $menuItem.height();
    var submenuHeight = menuItemHeight + $submenu.height() * $submenu.length;
    var menuShowHeight = 0;

    if ($submenu.length) {
      e.stopPropagation();

      if ($(this).height() > menuItemHeight) {
        isSubmenuShow = false;
        menuShowHeight = menuItemHeight;
      } else {
        isSubmenuShow = true;
        menuShowHeight = submenuHeight;
      }

      // 手风琴效果
      $(this)
        .velocity('stop')
        .velocity({
          height: menuShowHeight
        }, {
          duration: 300
        })
        .siblings()
        .velocity({
          height: menuItemHeight
        }, {
          duration: 300
        });
    }
  });

  $menuItem.on('mouseenter', function () {
    if (isSubmenuShow) {
      return;
    }

    var $submenu = $(this).find('.header-nav-submenu');

    if ($submenu.length) {
      $submenu.velocity('stop').velocity({
        opacity: 1
      }, {
        duration: 200,
        display: 'block'
      });
    }
  });

  $menuItem.on('mouseleave', function () {
    if (isSubmenuShow) {
      return;
    }

    var $submenu = $(this).find('.header-nav-submenu');

    if ($submenu.length) {
      $submenu.css('display', 'none');
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
