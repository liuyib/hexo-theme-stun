$(document).ready(function () {
  var $toc = $('.sidebar-toc');
  var $view = $('.sidebar-overview');

  // The heading that reached the top currently.
  var currHeading = null;
  // The heading that reached the top last time.
  var lastHeading = null;

  // Whether toc needs scrolling.
  var isTocScroll = false;

  // Distance from sidebar to top.
  var SIDEBAR_STICKY_TOP = parseInt(CONFIG.sidebar.offsetTop);

  // Is toc in anime.
  var isAnime = false;
  // Is toc in max heihgt.
  var isMaxH = true;

  // Initial run
  autoSpreadToc();
  scrollTocToMiddle();
  sidebarSticky();
  sidebarAdjustHeight();
  readProgress();

  $(window).scroll(function () {
    autoSpreadToc();
    scrollTocToMiddle();
    sidebarSticky();
    sidebarAdjustHeight();
    readProgress();
  });

  $('.sidebar-nav-toc').on('click', function () {
    $('.sidebar-nav-toc').toggleClass('current');
    $('.sidebar-nav-overview').toggleClass('current');

    $toc.css('display', 'block');
    $toc.velocity('fadeIn');

    $view.css('display', 'none');
    $view.velocity('fadeOut');
  });

  $('.sidebar-nav-overview').on('click', function () {
    $('.sidebar-nav-toc').toggleClass('current');
    $('.sidebar-nav-overview').toggleClass('current');

    $toc.css('display', 'none');
    $toc.velocity('fadeOut');

    $view.css('display', 'block');
    $view.velocity('fadeIn');
  });

  if ($('.content').height() < $('#sidebar').height()) {
    $('#main').css('min-height', $('#main').height());
  }

  // Automatically expand items in the article directory
  //   based on the scrolling of heading in the article.
  function autoSpreadToc () {
    var $postBody = $('.post-body');
    var $headings = $postBody.find('h1,h2,h3,h4,h5,h6');
    var $firsetChild = $headings.first();

    // All heading are not to the top.
    if ($postBody[0] && (!!$firsetChild[0] &&
        $firsetChild.offset().top - $(window).scrollTop() > 0)) {
      $('.sidebar-toc li').removeClass('active current');

      return;
    }

    $headings.each(function () {
      if (this.getBoundingClientRect().top < 0) {
        currHeading = $(this).attr('id');
      }
    });

    if (currHeading !== lastHeading) {
      var targetLink = $('.sidebar-toc a[href="#' + currHeading + '"]');

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
  function scrollTocToMiddle () {
    var $toc = $('.sidebar-toc');
    var $currLink = $('.sidebar-toc .current a');

    if ($currLink[0] && $toc[0]) {
      var tocTop = $currLink.offset().top - $toc.offset().top;

      isTocScroll = !!(tocTop > $toc.height() || tocTop < 0);
    }

    if (isTocScroll) {
      $currLink
        .velocity('stop')
        .velocity('scroll', {
          container: $toc,
          offset: -($toc.height() / 2),
          duration: 500,
          easing: 'easeOutQuart'
        });
    }
  }

  // Sticky the sidebar when it arrived the top.
  function sidebarSticky () {
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

  // Auto adjust the height of sidebar when it arrive footer.
  function sidebarAdjustHeight () {
    var footerTop = $('#footer').offset().top;
    var footerH = $('#footer')[0].getBoundingClientRect().height;
    var sidebarTop = $('.sidebar-inner').offset().top;
    var sidebarH = $('.sidebar-inner')[0].getBoundingClientRect().height;

    if (!isAnime && sidebarTop + sidebarH > footerTop) {
      var targetTocH =
        parseInt($('.sidebar-toc').css('max-height')) - footerH;
      isAnime = true;

      $('.sidebar-toc').velocity({
        maxHeight: targetTocH
      }, {
        duration: 300,
        complete: function () {
          isAnime = false;
          isMaxH = false;
        }
      });
    } else if (!isMaxH && !isAnime && $(window).height() <
        $('#footer')[0].getBoundingClientRect().top) {
      isAnime = true;

      $('.sidebar-toc').velocity({
        maxHeight: '70vh'
      }, {
        duration: 240,
        complete: function () {
          isAnime = false;
          isMaxH = true;
        }
      });
    }
  }

  // Update the reading progress lines of post.
  function readProgress () {
    var $post = $('.content');
    var scrollH = ($post[0] &&
      $post[0].getBoundingClientRect().top * -1) || 0;

    var percent = parseInt((scrollH /
      Math.abs($post.height() - $(window).height())) * 100);
    percent = percent > 100 ? 100 : percent < 0 ? 0 : percent;
    percent += '%';

    $('.sidebar-progress-number').html(percent);
    $('.sidebar-progress-line').css('width', percent);
  }
});
