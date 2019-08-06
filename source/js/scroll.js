$(document).ready(function () {
  // The previous distance from the page to the top.
  var prevScrollTop = 0;

  // Initial run.
  headerNavScroll();

  $(window).scroll(function () {
    headerNavScroll();
  });

  // Click the heading.
  $('.content')
    .find('h1,h2,h3,h4,h5,h6')
    .on('click', function () {
      scrollHeadingToTop('#' + $(this).attr('id'));
    });

  // Click the post toc.
  $('.toc-link').on('click', function (e) {
    e.preventDefault();
    scrollHeadingToTop($(this).attr('href'));
  });

  function headerNavScroll () {
    var scrollTop = $(window).scrollTop();
    var delta = scrollTop - prevScrollTop;

    if (scrollTop === 0) {
      $('.header-nav').removeClass('fixed');
      $('.header-nav').removeClass('slider-up');
      $('.header-nav').addClass('slider-down');
    } else {
      $('.header-nav').addClass('fixed');

      if (delta > 0) {
        if (Math.abs(delta) > 5) {
          $('.header-nav').removeClass('slider-down');
          $('.header-nav').addClass('slider-up');
        }
      } else {
        if (Math.abs(delta) > 5) {
          $('.header-nav').removeClass('slider-up');
          $('.header-nav').addClass('slider-down');
        }
      }
    }

    prevScrollTop = scrollTop;
  }

  function scrollHeadingToTop (anchor) {
    $(anchor)
      .velocity('stop')
      .velocity('scroll', { easing: 'easeOutSine' });
  }
});
