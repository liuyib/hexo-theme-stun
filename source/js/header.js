$(document).ready(function() {
  var $menu = $('.header-nav-menu');

  $(document).click(function() {
    $menu.removeClass('show');
  });

  $('.header-nav-menu a').click(function(e) {
    var e = e || window.event;
    e.stopPropagation();
  });

  $('.header-nav-menu-icon').click(function() {
    $menu.toggleClass('show');

    return false;
  });
});
