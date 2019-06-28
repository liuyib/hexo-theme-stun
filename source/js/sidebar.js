$(document).ready(function () {
  // Distance from sidebar to top.
  var SIDEBAR_STICKY_TOP = 
    parseInt(window.CONFIG.sidebar_offsetTop);
  var $toc = $('.sidebar-toc');
  var $view = $('.sidebar-overview');
  
  // The heading that reached the top currently.
  var currHeading = null;
  // The heading that reached the top last time.
  var lastHeading = null;

  // Whether toc needs scrolling.
  var isTocScroll = false;

  // Initial run
  autoSpreadToc();
  scrollTocToMiddle();
  readProgress();
  sidebarSticky();

  $(window).scroll(function () {
    autoSpreadToc();
    scrollTocToMiddle();
    readProgress();
    sidebarSticky();
  });
  
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

  // Automatically expand items in the article directory
  //   based on the scrolling of heading in the article.
  function autoSpreadToc() {
    var $postBody = $('.post-body');
    
    // All heading are not to the top.
    if ($postBody[0] && ($postBody.find('h1,h2,h3,h4,h5,h6')
        .first().offset().top - $(window).scrollTop() > 0)) {
      $('.sidebar-toc li').removeClass('active current');

      return;
    }

    $postBody.find('h1,h2,h3,h4,h5,h6')
      .each(function (index, item) {
        if (item && (item.getBoundingClientRect().top < 0)) {
          currHeading = $(item).attr('id');
        }
      });
      
    if (currHeading === lastHeading) {
      return;
    } else {
      var targetLink = $(`.sidebar-toc a[href="#${currHeading}"]`);

      // If the relevant "<a>" is not found, remain the state of the toc,
      //   either, remove styles for all active states.
      if (targetLink[0]) {
        $('.sidebar-toc li').removeClass('active current');
      }

      targetLink.parents('li').addClass('active');
      targetLink.parent().addClass('current');
      lastHeading = currHeading;
    }
  }

  // Scroll the post toc to the middle.
  function scrollTocToMiddle() {
    var $toc = $('.sidebar-toc');
    var $currLink = $('.sidebar-toc .current a');
    
    if ($currLink[0] && $toc[0]) {
      var tocTop = $currLink.offset().top - $toc.offset().top;
      
      isTocScroll = (tocTop > $toc.height() ||
        tocTop < 0) ? true : false;
    }
    
    if (isTocScroll) {
      $currLink
        .velocity('stop').velocity('scroll', {
          container: $toc,
          offset: -($toc.height() / 2),
          duration: 500,
          easing: 'easeOutQuart'
        });
    }
  }
  
  // Sticky the sidebar when it arrived the top.
  function sidebarSticky() {
    var mainInner = $('.main-inner')[0];
    
    if (mainInner) {
      var targetY = mainInner.getBoundingClientRect().top;

      if (targetY < SIDEBAR_STICKY_TOP) {
        $('.sidebar-inner').addClass('sticky');
      } else {
        $('.sidebar-inner').removeClass('sticky');
      }
    }
  }

  // Update the reading progress lines of post.
  function readProgress() {
    var $post = $('.main-content');
    var scrollH = ($post[0] &&
      $post[0].getBoundingClientRect().top * -1) || 0;
    
    var percent = parseInt((scrollH / Math.abs(($post.height() -
      $(window).height()))) * 100);
    percent = percent > 100 ? 100 : percent < 0 ? 0 : percent;
    percent += '%';

    $('.sidebar-progress-number').html(percent);
    $('.sidebar-progress-line').css('width', percent);
  }
});
