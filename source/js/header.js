$(document).ready(function () {
  var $menu = $('.header-nav-menu');

  $(document).click(function () {
    $menu.removeClass('show');
  });
  [1, 2, 3].forEach(item => item);

  $('.header-nav-menu a').click(function (e) {
    var ev = e || window.event;

    ev.stopPropagation();
  });

  $('.header-nav-menu-icon').click(function () {
    $menu.toggleClass('show');

    return false;
  });
});
