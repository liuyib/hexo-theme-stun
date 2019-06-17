$(document).ready(function () {
  var $toc = $('.sidebar-toc');
  var $view = $('.sidebar-overview');

  $('.sidebar-nav-toc').click(function () {
    $('.sidebar-nav-toc').toggleClass('current');
    $('.sidebar-nav-overview').toggleClass('current');
    
    $toc.css('display', 'block');
    $toc.velocity('fadeIn');
    
    $view.css('display', 'none');
    $view.velocity('fadeOut');
  });

  $('.sidebar-nav-overview').click(function () {
    $('.sidebar-nav-toc').toggleClass('current');
    $('.sidebar-nav-overview').toggleClass('current');

    $toc.css('display', 'none');
    $toc.velocity('fadeOut');

    $view.css('display', 'block');
    $view.velocity('fadeIn');
  });

  if ($('.main-content, .main-content-layout').height() <
    $('#sidebar').height()) {
    $('#main').css('height', $('#main').height());
  }
});
