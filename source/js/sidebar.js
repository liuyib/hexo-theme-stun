$(document).ready(function () {
  var tocDepth = CONFIG.sidebar.renderTocDepth;
  // Optimize selector by theme config.
  var HEADING_SELECTOR = 'h1,h2,h3,h4,h5,h6,'.slice(0, tocDepth * 3).slice(0, -1);
  // The heading that reached the top currently.
  var currHeading = null;
  // The heading that reached the top last time.
  var lastHeading = null;
  var isRemoveTocClass = false;

  // Automatically expand items in the article directory
  //   based on the scrolling of heading in the article.
  function autoSpreadToc () {
    var $postBody = $('.post-body');
    var $allTocItem = $('.sidebar-toc li');
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
    }

    if (currHeading !== lastHeading) {
      var $targetLink = $('.sidebar-toc a[href="#' + currHeading + '"]');

      // If the relevant "<a>" is not found, remain the state of the toc,
      //   either, remove styles for all active states.
      if ($targetLink[0]) {
        $allTocItem.removeClass('active current');
      }
      $targetLink.parents('li').addClass('active');
      $targetLink.parent().addClass('current');
      lastHeading = currHeading;
    }
  }

  // Whether toc needs scrolling.
  var isTocScroll = false;

  // Scroll the post toc to the middle.
  function scrollTocToMiddle () {
    var $tocWrapHeight = $('.sidebar-toc').height();
    var $tocHeight = $('.sidebar-toc .toc').height();

    if ($tocHeight <= $tocWrapHeight) return;

    var $tocWrap = $('.sidebar-toc');
    var $currTocItem = $('.sidebar-toc .current a');

    if ($currTocItem[0] && $tocWrap[0]) {
      var tocTop = $currTocItem.offset().top - $tocWrap.offset().top;

      isTocScroll = tocTop > $tocWrapHeight || tocTop < 0;
    }

    if (isTocScroll) {
      $currTocItem
        .velocity('stop')
        .velocity('scroll', {
          container: $tocWrap,
          offset: (-$tocWrapHeight / 2),
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
    var $sidebar = $('.sidebar-inner');
    var targetY =
      document.getElementById('main').getBoundingClientRect().top;

    if (targetY < SIDEBAR_STICKY_TOP) {
      if (!isSidebarSticky) {
        $sidebar.addClass('sticky');
        isSidebarSticky = true;
      }
    } else {
      if (isSidebarSticky) {
        $sidebar.removeClass('sticky');
        isSidebarSticky = false;
      }
    }
  }

  // Update the reading progress lines of post.
  function readProgress () {
    var $post = $('#content-wrap');
    var scrollH = ($post[0] &&
      $post[0].getBoundingClientRect().top * -1) || 0;

    var percent = parseInt((scrollH /
      Math.abs($post.height() - $(window).height())) * 100);
    percent = percent > 100 ? 100 : percent < 0 ? 0 : percent;

    $('.sidebar-reading-info-num').html(percent);
    $('.sidebar-reading-line').css(
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
    var $navToc = $('.sidebar-nav-toc');
    var $navOv = $('.sidebar-nav-ov');
    var $tocWrap = $('.sidebar-toc');
    var $overview = $('.sidebar-ov');

    $navToc.on('click', function () {
      if ($(this).hasClass('current')) return;

      $navToc.addClass('current');
      $navOv.removeClass('current');

      $tocWrap.css('display', 'block');
      $tocWrap.velocity('stop').velocity('fadeIn');

      $overview.css('display', 'none');
      $overview.velocity('stop').velocity('fadeOut');
    });

    $navOv.on('click', function () {
      if ($(this).hasClass('current')) return;

      $navOv.addClass('current');
      $navToc.removeClass('current');

      $tocWrap.css('display', 'none');
      $tocWrap.velocity('stop').velocity('fadeOut');

      $overview.css('display', 'block');
      $overview.velocity('stop').velocity('fadeIn');
    });
  };

  // Initialization
  Stun.utils.pjaxReloadSidebar();
});
