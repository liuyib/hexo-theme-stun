$(function () {
  var toc = $('.site-post-toc');
  var view = $('.site-overview');

  $('.sidebar-nav-toc').click(function () {
    $('.sidebar-nav-toc').toggleClass('current');
    $('.sidebar-nav-overview').toggleClass('current');
    
    toc.velocity('fadeIn');
    toc.css('display', 'block');
    
    view.velocity('fadeOut');
    view.css('display', 'none');
  });

  $('.sidebar-nav-overview').click(function () {
    $('.sidebar-nav-toc').toggleClass('current');
    $('.sidebar-nav-overview').toggleClass('current');

    toc.velocity('fadeOut');
    toc.css('display', 'none');

    view.velocity('fadeIn');
    view.css('display', 'block');
  });
});