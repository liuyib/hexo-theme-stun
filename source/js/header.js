$(function () {
  $('.menu-icon').click(function () {
    var menu = $('.header-nav-menu-inner');

    if (menu.css('display') === 'none') {
      menu.velocity('fadeIn');
    } else if (menu.css('display') === 'block') {
      menu.velocity('fadeOut');
    }
  });

  $('.header-nav-search').click(function () {
    // TODO
  });
});