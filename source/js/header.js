$(document).ready(function () {
  var $menu = $('.header-nav-menu');
  var $menuItem = $('.header-nav-menu > .header-nav-menu-item');
  var $allSubmenu = $('.header-nav-submenu');
  var isMenuShow = false;

  function closeAllMenuItem () {
    $menuItem.velocity({
      height: $menuItem.height()
    });
  }

  $(window).on('resize', function () {
    if ($(this).width() > 992) {
      if (!$menu.is(':visible')) {
        $menu.css({ display: 'block', opacity: 1 });
      }

      if ($allSubmenu.is(':visible')) {
        closeAllMenuItem();
        $allSubmenu.css({ display: 'none' });
      }
    } else {
      $menu.css({ display: 'none', opacity: 0 });
      isMenuShow = false;
    }
  });

  $(document).on('click', function () {
    if (Stun.utils.isDesktop()) return;

    if ($menu.is(':visible')) {
      closeAllMenuItem();
      $menu.css({ display: 'none' });
      isMenuShow = false;
    }
  });

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
      closeAllMenuItem();
    }
  });

  $menuItem.on('click', function (e) {
    if (Stun.utils.isDesktop()) return;

    var $submenu = $(this).find('.header-nav-submenu');
    var menuItemHeight = $menuItem.height();
    var submenuHeight = menuItemHeight + $submenu.height() * $submenu.length;

    if ($submenu.length) {
      e.stopPropagation();

      // 手风琴效果
      $(this).velocity('stop').velocity({
        height: $(this).height() > menuItemHeight ? menuItemHeight : submenuHeight
      }, {
        duration: 300
      }).siblings().velocity({
        height: menuItemHeight
      }, {
        duration: 300
      });
    }
  });

  $menuItem.on('mouseenter', function () {
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
    var $submenu = $(this).find('.header-nav-submenu');

    $submenu.length && $submenu.css('display', 'none');
  });

  Stun.utils.pjaxReloadHeader = function () {
    if (CONFIG.header.scrollDownIcon) {
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
