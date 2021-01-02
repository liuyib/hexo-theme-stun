$(document).ready(function () {
  var tocDepth = (CONFIG.sidebar && CONFIG.sidebar.tocMaxDepth) || 4
  // Optimize selector by theme config.
  var HEADING_SELECTOR = 'h1,h2,h3,h4,h5,h6,'
    .slice(0, tocDepth * 3)
    .slice(0, -1)

  function initTocDisplay () {
    if ($('.post-body, .custompage').find(HEADING_SELECTOR)[0]) {
      return
    }
    $('.sidebar-nav').addClass('hide')
    $('.sidebar-toc').addClass('hide')
    $('.sidebar-ov').removeClass('hide')
  }

  // The heading that reached the top currently.
  var currHeading = null
  // The heading that reached the top last time.
  var lastHeading = null
  var isRemovedTocClass = false

  // Automatically expand items in the article directory
  //   based on the scrolling of heading in the article.
  function autoSpreadToc () {
    var $postBody = $('.post-body, .custompage')
    var $allTocItem = $('.sidebar-toc li')
    var $headings = $postBody.find(HEADING_SELECTOR)
    var $firsetChild = $headings.first()

    $headings.each(function () {
      var headingTop = this.getBoundingClientRect().top
      // The minimum distance from the top of the browser
      //   when heading is marked as active in toc.
      var MIN_HEIGHT_TO_TOP = 5

      if (headingTop <= MIN_HEIGHT_TO_TOP) {
        currHeading = window.encodeURIComponent(this.getAttribute('id'))
      }
    })

    // All heading are not to the top.
    if (
      $postBody[0] &&
      $firsetChild[0] &&
      $firsetChild[0].getBoundingClientRect().top > 0 &&
      $firsetChild.offset().top - $(window).scrollTop() > 0
    ) {
      if (!isRemovedTocClass) {
        $allTocItem.removeClass('active current')
        isRemovedTocClass = true
      }
      return
    }
    if (currHeading !== lastHeading) {
      var $targetLink = $('.sidebar-toc a[href="#' + currHeading + '"]')

      // In order to be compatible with Hexo under v5.0.0
      if (!$targetLink.length) {
        var anchorDecode = window.decodeURIComponent(currHeading)
        $targetLink = $('.sidebar-toc a[href="#' + anchorDecode + '"]')
      }

      $allTocItem.removeClass('active current')
      $targetLink.parents('li').addClass('active')
      $targetLink.parent().addClass('current')
      lastHeading = currHeading
      isRemovedTocClass = false
    }
  }

  // Whether toc needs scrolling.
  var isTocScroll = false
  // Scroll the post toc to the middle.
  function scrollTocToMiddle () {
    var $tocWrapHeight = $('.sidebar-toc').height()
    var $tocHeight = $('.sidebar-toc > div').height()

    if ($tocHeight <= $tocWrapHeight) {
      return
    }

    var $tocWrap = $('.sidebar-toc')
    var $currTocItem = $('.sidebar-toc .current a')

    if ($currTocItem[0] && $tocWrap[0]) {
      var tocTop = $currTocItem.offset().top - $tocWrap.offset().top
      isTocScroll = tocTop > $tocWrapHeight || tocTop < 0
    }

    if (isTocScroll) {
      $currTocItem.velocity('stop').velocity('scroll', {
        container: $tocWrap,
        offset: -$tocWrapHeight / 2,
        duration: 500,
        easing: 'easeOutQuart'
      })
    }
  }

  // Distance from sidebar to top.
  var sidebarToTop = 0
  if (CONFIG.sidebar && CONFIG.sidebar.offsetTop) {
    sidebarToTop = parseInt(CONFIG.sidebar.offsetTop)
  }

  // Sticky the sidebar when it arrived the top.
  function sidebarSticky () {
    var $sidebar = $('#sidebar')
    var targetY = document
      .getElementById('content-wrap')
      .getBoundingClientRect().top

    if (targetY < sidebarToTop) {
      $sidebar.addClass('sidebar--sticky')
    } else {
      $sidebar.removeClass('sidebar--sticky')
    }
  }

  // Update the reading progress lines of post.
  function readProgress () {
    // Not on post page.
    if ($('#is-post').length === 0) {
      return
    }

    var $post = $('.content')
    var postTop = $post.offset().top
    var postEndTop = 0
    var postEndHeight = 0
    var postReadingHeight = 0
    var isEnablePostEnd = false
    var percent = 0

    if (CONFIG.postWidget && CONFIG.postWidget.endText) {
      isEnablePostEnd = true
    }
    if (isEnablePostEnd) {
      postEndTop = $('.post-ending').offset().top
      postEndHeight = $('.post-ending').outerHeight()
      postReadingHeight = postEndTop - postTop + postEndHeight
    } else {
      postEndTop = $('.post-footer').offset().top
      postReadingHeight = postEndTop - postTop
    }

    var windowHeight = $(window).height()
    var postScrollTop = 0

    if ($post.length !== 0) {
      postScrollTop =
        parseInt($post[0].getBoundingClientRect().top * -1) + windowHeight
    }

    var percentNum = Number($('.sidebar-reading-info__num').text())
    postReadingHeight = parseInt(Math.abs(postReadingHeight))
    percent = parseInt((postScrollTop / postReadingHeight) * 100)
    percent = percent > 100 ? 100 : percent < 0 ? 0 : percent

    // Has reached the maximum or minimum
    if (
      (percent === 0 && percentNum === 0) ||
      (percent === 100 && percentNum === 100)
    ) {
      return
    }
    $('.sidebar-reading-info__num').text(percent)
    $('.sidebar-reading-line').css(
      'transform',
      'translateX(' + (percent - 100) + '%)'
    )
  }

  // Initial run
  autoSpreadToc()
  sidebarSticky()
  scrollTocToMiddle()
  readProgress()

  $(window).on('scroll', function () {
    sidebarSticky()
  })

  $(window).on(
    'scroll',
    Stun.utils.throttle(function () {
      autoSpreadToc()
      scrollTocToMiddle()
      readProgress()
    }, 150)
  )

  Stun.utils.pjaxReloadSidebar = function () {
    var $navToc = $('.sidebar-nav-toc')
    var $navOv = $('.sidebar-nav-ov')
    var $tocWrap = $('.sidebar-toc')
    var $overview = $('.sidebar-ov')

    $navToc.on('click', function (e) {
      e.stopPropagation()
      if ($(this).hasClass('current')) {
        return
      }
      $navToc.addClass('current')
      $navOv.removeClass('current')
      $tocWrap.css('display', 'block')
      $tocWrap.velocity('stop').velocity('fadeIn')
      $overview.css('display', 'none')
      $overview.velocity('stop').velocity('fadeOut')
    })
    $navOv.on('click', function (e) {
      e.stopPropagation()
      if ($(this).hasClass('current')) {
        return
      }
      $navOv.addClass('current')
      $navToc.removeClass('current')
      $tocWrap.css('display', 'none')
      $tocWrap.velocity('stop').velocity('fadeOut')
      $overview.css('display', 'block')
      $overview.velocity('stop').velocity('fadeIn')
    })
    initTocDisplay()
  }

  // Initialization
  Stun.utils.pjaxReloadSidebar()
})
