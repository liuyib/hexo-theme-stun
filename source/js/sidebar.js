$(document).ready(function () {
  // The heading that reached the top currently.
  var currHeading = null;
  // The heading that reached the top last time.
  var lastHeading = null;
  var isRemoveTocClass = false;
  var tocDepth = CONFIG.sidebar.renderTocDepth;
  // Optimize selector by theme config.
  var HEADING_SELECTOR = 'h1,h2,h3,h4,h5,h6'.slice(0, tocDepth * 3);
  var $postBody = $('.post-body');
  var $allTocItem = $('.sidebar-toc li');

  if (tocDepth !== 6) {
    HEADING_SELECTOR = HEADING_SELECTOR.slice(0, -1);
  }

  // Automatically expand items in the article directory
  //   based on the scrolling of heading in the article.
  function autoSpreadToc () {
    var $headings = $postBody.find(HEADING_SELECTOR);
    var $firsetChild = $headings.first();

    $headings.each(function () {
      var headingTop = this.getBoundingClientRect().top;

      if (headingTop < 0) {
        currHeading = this.getAttribute('id');
      }
    });

    // All heading are not to the top.
    if ($postBody[0] && (!!$firsetChild[0] &&
        $firsetChild.offset().top - $(window).scrollTop() > 0)) {
      if (!isRemoveTocClass) {
        $allTocItem.removeClass('active current');
        isRemoveTocClass = true;
      }

      return;
    } else {
      isRemoveTocClass = false;
    }

    if (currHeading !== lastHeading) {
      var targetLink = $('.sidebar-toc a[href="#' + currHeading + '"]');

      // If the relevant "<a>" is not found, remain the state of the toc,
      //   either, remove styles for all active states.
      if (targetLink[0]) {
        $allTocItem.removeClass('active current');
      }
      targetLink.parents('li').addClass('active');
      targetLink.parent().addClass('current');
      lastHeading = currHeading;
    }
  }

  // Whether toc needs scrolling.
  var isTocScroll = false;
  // Scroll the post toc to the middle.
  function scrollTocToMiddle () {
    var $tocWrapperHeight = $('.sidebar-toc').height();
    var $tocHeight = $('.sidebar-toc .toc').height();

    if ($tocHeight <= $tocWrapperHeight) return;

    var $tocWrapper = $('.sidebar-toc');
    var $currTocItem = $('.sidebar-toc .current a');

    if ($currTocItem[0] && $tocWrapper[0]) {
      var tocTop = $currTocItem.offset().top - $tocWrapper.offset().top;

      isTocScroll = tocTop > $tocWrapperHeight || tocTop < 0;
    }

    if (isTocScroll) {
      $currTocItem
        .velocity('stop')
        .velocity('scroll', {
          container: $tocWrapper,
          offset: (-$tocWrapperHeight / 2),
          duration: 500,
          easing: 'easeOutQuart'
        });
    }
  }

  // Distance from sidebar to top.
  var SIDEBAR_STICKY_TOP = parseInt(CONFIG.sidebar.offsetTop);
  var isSidebarSticky = false;

  // Sticky the sidebar when it arrived the top.
  function sidebarSticky () {
    var mainInner = $('.main-inner')[0];

    if (mainInner) {
      var targetY = mainInner.getBoundingClientRect().top;

      if (targetY < SIDEBAR_STICKY_TOP) {
        if (!isSidebarSticky) {
          $('.sidebar-inner').addClass('sticky');
          isSidebarSticky = true;
        }
      } else {
        if (isSidebarSticky) {
          $('.sidebar-inner').removeClass('sticky');
          isSidebarSticky = false;
        }
      }
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

    $('.sidebar-progress-number').html(percent);
    $('.sidebar-progress-line').css(
      'transform', 'translateX(' + (percent - 100) + '%)'
    );
  }

  // Initial run
  autoSpreadToc();
  sidebarSticky();
  scrollTocToMiddle();
  readProgress();

  $(window).on('scroll', function () {
    sidebarSticky();
  });

  $(window).on('scroll', Stun.utils.throttle(function () {
    autoSpreadToc();
    scrollTocToMiddle();
    readProgress();
  }, 150));

  Stun.utils.pjaxReloadSidebar = function () {
    var $tocWrapper = $('.sidebar-toc');
    var $view = $('.sidebar-overview');

    $('.sidebar-nav-toc').on('click', function () {
      $('.sidebar-nav-toc').toggleClass('current');
      $('.sidebar-nav-overview').toggleClass('current');

      $tocWrapper.css('display', 'block');
      $tocWrapper.velocity('fadeIn');

      $view.css('display', 'none');
      $view.velocity('fadeOut');
    });

    $('.sidebar-nav-overview').on('click', function () {
      $('.sidebar-nav-toc').toggleClass('current');
      $('.sidebar-nav-overview').toggleClass('current');

      $tocWrapper.css('display', 'none');
      $tocWrapper.velocity('fadeOut');

      $view.css('display', 'block');
      $view.velocity('fadeIn');
    });
  };

  // Initialization
  Stun.utils.pjaxReloadSidebar();
});
