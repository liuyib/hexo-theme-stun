$(document).ready(function () {
  var $menu = $('.header-nav-menu');

  $(document).on('click', function () {
    $menu.removeClass('show');
  });

  $('.header-nav-menu a').on('click', function (ev) {
    var e = ev || window.event;
    e.stopPropagation();
  });

  $('.header-nav-menu-icon').on('click', function () {
    $menu.toggleClass('show');
    return false;
  });
});
