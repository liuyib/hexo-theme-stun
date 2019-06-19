$(document).ready(function() {
  var $menu = $('.header-nav-menu');

  $(document).click(function() {
    menuHide();
  });

  $('.header-nav-menu a').click(function(e) {
    var e = e || window.event;
    e.stopPropagation();
  });

  $('.header-nav-menu-icon').click(function() {
    if ($menu.css('visibility') === 'hidden') {
      menuShow();
    } else {
      menuHide();
    }

    return false;
  });

  function menuShow() {
    $menu.removeClass('hide');
    $menu.addClass('show');
  }

  function menuHide() {
    $menu.removeClass('show');
    $menu.addClass('hide');
  }

  $('.header-nav-search').click(function() {
    // TODO
  });
});
