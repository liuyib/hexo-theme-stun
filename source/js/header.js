$(document).ready(function () {
  var $menu = $('.header-nav-menu');
  var $menuItem = $('.header-nav-menu-item');

  $(document).on('click', function () {
    $menu.removeClass('show');
  });

  $('.header-nav-btn').on('click', function (e) {
    e.stopPropagation();
    $menu.toggleClass('show');
  });

  $menuItem.on('click', function (e) {
    e.stopPropagation();
  });

  $menuItem.on('mouseenter', function () {
    var $submenu = $(this).find('.header-nav-submenu');
    var isDesktop = Stun.utils.isDesktop();
    var menuAnimation =
      'transition.' + (isDesktop ? 'slideUpIn' : 'slideRightIn');

    if ($submenu[0]) {
      $submenu.velocity('stop').velocity(menuAnimation, { duration: 240 });
    }
  });

  $menuItem.on('mouseleave', function () {
    var $submenu = $(this).find('.header-nav-submenu');
    $submenu[0] && $submenu.css('display', 'none');
  });
});
