/* global Stun, CONFIG */

Stun.utils = Stun.$u = {
  /**
   * Debounce
   * @param {Object} func Callback function
   * @param {Number} wait Waiting time
   * @param {Boolean} immediate Run immediately
   */
  debounce: function (func, wait, immediate) {
    var timeout;

    return function () {
      var context = this;
      var args = arguments;

      if (timeout) clearTimeout(timeout);
      if (immediate) {
        var callNow = !timeout;
        timeout = setTimeout(function () {
          timeout = null;
        }, wait);
        if (callNow) func.apply(context, args);
      } else {
        timeout = setTimeout(function () {
          func.apply(context, args);
        }, wait);
      }
    };
  },
  /**
   * Throttle
   * @param {Object} func Callback function
   * @param {Number} wait Waiting time
   * @param {Object} options leading: Boolean, trailing: Boolean
   */
  throttle: function (func, wait, options) {
    var timeout, context, args;
    var previous = 0;
    if (!options) options = {};

    var later = function () {
      previous = options.leading === false ? 0 : new Date().getTime();
      timeout = null;
      func.apply(context, args);
      if (!timeout) context = args = null;
    };

    var throttled = function () {
      var now = new Date().getTime();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
    };
    return throttled;
  },
  hasMobileUA: function () {
    var nav = window.navigator;
    var ua = nav.userAgent;
    var pa = /iPad|iPhone|Android|Opera Mini|BlackBerry|webOS|UCWEB|Blazer|PSP|IEMobile|Symbian/g;

    return pa.test(ua);
  },
  isTablet: function () {
    return window.screen.width > 767 && window.screen.width < 992 && this.hasMobileUA();
  },
  isMobile: function () {
    return window.screen.width < 767 && this.hasMobileUA();
  },
  isDesktop: function () {
    return !this.isTablet() && !this.isMobile();
  },
  showThemeInConsole: function () {
    var stunInfo = '主题不错？⭐star 支持一下 ->';
    var stunURL = 'https://github.com/liuyib/hexo-theme-stun';
    var stunNameStr = '\n\n      ___          ___            ___            ___      \n     /\\  \\        /\\  \\          /\\__\\          /\\__\\     \n    /::\\  \\       \\:\\  \\        /:/  /         /::|  |    \n   /:/\\ \\  \\       \\:\\  \\      /:/  /         /:|:|  |    \n  _\\:\\ \\ \\  \\      /::\\  \\    /:/  /  ___    /:/|:|  |__  \n /\\ \\:\\ \\ \\__\\    /:/\\:\\__\\  /:/__/  /\\__\\  /:/ |:| /\\__\\ \n \\:\\ \\:\\ \\/__/   /:/  \\/__/  \\:\\  \\ /:/  /  \\/__|:|/:/  / \n  \\:\\ \\:\\__\\    /:/  /        \\:\\  /:/  /       |:/:/  /  \n   \\:\\/:/  /    \\/__/          \\:\\/:/  /        |::/  /   \n    \\::/  /                     \\::/  /         /:/  /    \n     \\/__/                       \\/__/          \\/__/     \n                                                          \n';
    var stunInfoStyle = 'background-color: #49b1f5; color: #fff; padding: 8px; font-size: 14px;';
    var stunURLStyle = 'background-color: #ffbca2; padding: 8px; font-size: 14px;';
    var stunNameStyle = 'background-color: #eaf8ff;';

    console.log('%c%s%c%s%c%s', stunInfoStyle, stunInfo, stunURLStyle, stunURL, stunNameStyle, stunNameStr);
  },
  /**
   * Change the event code to keyCode.
   * @param {String} code Event code
   */
  codeToKeyCode: function (code) {
    var codes = {
      ArrowLeft: 37,
      ArrowRight: 39,
      Escape: 27,
      Enter: 13
    };

    return codes[code];
  },
  /**
   * "Alert" component
   * @param {String} status The Status of message. Values: success / info / warning / error.
   * @param {String} text The text to show.
   * @param {Number} delay Message stay time (unit is 's', default 5s).
   */
  popAlert: function (status, text, delay) {
    var icon = {
      success: 'check-circle',
      info: 'exclamation-circle',
      warning: 'exclamation-circle',
      error: 'times-circle'
    };

    if (!$('.stun-alert')[0]) {
      var faPrefix = CONFIG.fontawesome.prefix;
      var $alert = $(
        '<div class="stun-message">' +
          '<div class="stun-alert stun-alert-' + status + '">' +
            '<i class="stun-alert-icon ' + faPrefix + ' fa-' + icon[status] + '"></i>' +
            '<span class="stun-alert-description">' + text + '</span>' +
          '</div>' +
        '</div>'
      );

      $('body').append($alert);
    }

    $(document).ready(function () {
      $('.stun-alert')
        .velocity('stop')
        .velocity('transition.slideDownBigIn', {
          duration: 300
        })
        .velocity('reverse', {
          delay: delay * 1000 || 5000,
          duration: 260,
          complete: function () {
            $('.stun-alert').css('display', 'none');
          }
        });
    });
  },
  /**
   * Copy any text.
   * @param {HTMLElement} container Container of text.
   */
  copyText: function (container) {
    try {
      var selection = window.getSelection();
      var range = document.createRange();

      // Select text by the content of node.
      range.selectNodeContents(container);
      selection.removeAllRanges();
      selection.addRange(range);

      var text = selection.toString();
      var input = document.createElement('input');

      // Create a temporary input to make the
      // execCommand command take effect.
      input.style.display = 'none';
      input.setAttribute('readonly', 'readonly');
      input.setAttribute('value', text);
      document.body.appendChild(input);
      input.setSelectionRange(0, -1);

      if (document.execCommand('copy')) {
        document.execCommand('copy');
        document.body.removeChild(input);

        return true;
      }
      document.body.removeChild(input);
    } catch (e) {
      return false;
    }
  },
  // Wrap images with fancybox support.
  wrapImageWithFancyBox: function () {
    $('.content img').not(':hidden').each(function () {
      var $img = $(this);
      var imgTitle = $img.attr('title') || $img.attr('alt');
      var $imgWrap = $img.parent('a');
      var imgSource = ['data-src', 'data-original', 'src'];
      var imgSrc = '';

      if (!$imgWrap[0]) {
        for (var i = 0; i < imgSource.length; i++) {
          if ($img.attr(imgSource[i])) {
            imgSrc = $img.attr(imgSource[i]);
            break;
          }
        }

        $imgWrap = $img.wrap('<a class="fancybox" href="' + imgSrc +
          '" itemscope itemtype="http://schema.org/ImageObject" itemprop="url"></a>'
        ).parent('a');

        if ($img.is('.gallery img')) {
          $imgWrap.attr('data-fancybox', 'gallery');
        } else {
          $imgWrap.attr('data-fancybox', 'default');
        }
      }

      if (imgTitle) {
        $imgWrap.attr('title', imgTitle).attr('data-caption', imgTitle);
      }
    });

    $().fancybox({
      selector: '[data-fancybox]',
      loop: true,
      transitionEffect: 'slide',
      hash: false,
      buttons: [
        'share',
        'slideShow',
        'fullScreen',
        'download',
        'thumbs',
        'close'
      ]
    });
  },
  // Display the image in the gallery as a waterfall.
  showImageToWaterfall: function () {
    var gConfig = CONFIG.gallery_waterfall;
    var colWidth = parseInt(gConfig.col_width);
    var colGapX = parseInt(gConfig.gap_x);
    var GALLERY_IMG_SELECTOR = '.gallery__img';

    this.waitAllImageLoad(GALLERY_IMG_SELECTOR, function () {
      $('.gallery').masonry({
        itemSelector: GALLERY_IMG_SELECTOR,
        columnWidth: colWidth,
        percentPosition: true,
        gutter: colGapX,
        transitionDuration: 0
      });
    });
  },
  // Lazy load the images of post.
  lazyLoadImage: function () {
    $('img.lazyload').lazyload();
  },
  // Add a mark icon to the link with `target="_blank"` attribute.
  addIconToExternalLink: function (container) {
    if (!$(container)[0]) {
      return;
    }

    var faPrefix = CONFIG.fontawesome.prefix;
    var $wrapper = $('<span class="external-link"></span>');
    var $icon = $(
      '<i class="' + faPrefix + ' fa-' +
        CONFIG.external_link.icon.name +
      '"></i>'
    );

    $(container)
      .find('a[target="_blank"]')
      .wrap($wrapper)
      .parent('.external-link')
      .append($icon);
  },
  // Switch to the prev / next post by shortcuts.
  registerHotkeyToSwitchPost: function () {
    var _this = this;

    $(document).on('keydown', function (e) {
      var isPrev = e.keyCode === _this.codeToKeyCode('ArrowLeft');
      var isNext = e.keyCode === _this.codeToKeyCode('ArrowRight');

      if (e.ctrlKey && isPrev) {
        var prev = $('.paginator-post-prev').find('a')[0];
        prev && prev.click();
      } else if (e.ctrlKey && isNext) {
        var next = $('.paginator-post-next').find('a')[0];
        next && next.click();
      }
    });
  },
  // Show / Hide the reward QR.
  registerShowReward: function () {
    $('.reward-button').on('click', function () {
      var $container = $('.reward-qr');

      if ($container.is(':visible')) {
        $container.css('display', 'none');
      } else {
        $container
          .velocity('stop')
          .velocity('transition.slideDownIn', {
            duration: 300
          });
      }
    });
  },
  // Click to zoom in image, without fancybox.
  registerClickToZoomImage: function () {
    $('#content-wrap img').not(':hidden').each(function () {
      $(this).addClass('zoom-image');
    });

    var $newImgMask = $('<div class="zoom-image-mask"></div>');
    var $newImg = $('<img>');
    var isZoom = false;

    $(window).on('scroll', function () {
      if (isZoom) {
        isZoom = false;
        setTimeout(closeZoom, 200);
      }
    });

    $(document).on('click', function () {
      closeZoom();
    });

    $('.zoom-image').on('click', function (e) {
      e.stopPropagation();
      isZoom = true;

      var imgRect = this.getBoundingClientRect();
      var imgW = $(this).width();
      var imgH = $(this).height();
      var imgOuterW = $(this).outerWidth();
      var imgOuterH = $(this).outerHeight();
      var winW = $(window).width();
      var winH = $(window).height();
      var scaleX = winW / imgW;
      var scaleY = winH / imgH;
      var scale = (scaleX < scaleY ? scaleX : scaleY) || 1;
      var translateX = winW / 2 - (imgRect.x + imgOuterW / 2);
      var translateY = winH / 2 - (imgRect.y + imgOuterH / 2);

      $newImg.attr('class', this.className);
      $newImg.attr('src', this.src);
      $newImg.addClass('show');
      $newImg.css({
        left: $(this).offset().left + (imgOuterW - imgW) / 2,
        top: $(this).offset().top + (imgOuterH - imgH) / 2,
        width: imgW,
        height: imgH
      });

      $(this).addClass('hide');
      $('body').append($newImgMask).append($newImg);
      $newImgMask.velocity({ opacity: 1 });
      $newImg.velocity({
        translateX: translateX,
        translateY: translateY,
        scale: scale
      }, {
        duration: 300,
        easing: [0.2, 0, 0.2, 1]
      });
    });

    function closeZoom () {
      $newImg.velocity('reverse');
      $newImgMask.velocity('reverse', {
        complete: function () {
          $('.zoom-image.show').remove();
          $('.zoom-image-mask').remove();
          $('.zoom-image').removeClass('hide');
        }
      });
    }
  },
  addCopyButton: function () {
    $('figure.highlight').each(function () {
      if (!$(this).find('figcaption')[0]) {
        var CODEBLOCK_CLASS_NAME = 'highlight';
        var lang = $(this)
          .attr('class')
          .split(/\s/)
          .filter(function (e) { return e !== CODEBLOCK_CLASS_NAME; });
        var $codeHeader = $(
          '<figcaption class="custom">' +
            '<div class="custom-lang">' + lang + '</div>' +
          '</figcaption>'
        );

        $codeHeader.insertBefore($(this).children().first());
      }
    });

    var faPrefix = CONFIG.fontawesome.prefix;
    var $copyIcon = $(
      '<div class="copy-button" data-popover=' +
        CONFIG.prompt.copy_button +
        ' data-popover-pos="up">' +
        '<i class="' + faPrefix + ' fa-clipboard"></i>' +
      '</div>'
    );

    var COPY_BUTTON_CONTAINER =
      'figure.highlight figcaption, .post-copyright';
    // Add a copy button to the selected elements.
    $(COPY_BUTTON_CONTAINER).append($copyIcon);
  },
  registerCopyEvent: function () {
    $('.copy-button').on('click', function () {
      var container = null;
      // Select the container of code block.
      var codeContainer =
        $(this).parents('figure.highlight').find('td.code')[0];

      if (codeContainer) {
        container = codeContainer;
      } else {
        // Select the container of text.
        container = $(this).parent()[0];
      }

      if (Stun.utils.copyText(container)) {
        Stun.utils.popAlert('success', CONFIG.prompt.copy_success);
      } else {
        Stun.utils.popAlert('error', CONFIG.prompt.copy_error);
      }
    });
  },
  /**
   * Wait for all images to load.
   * @param {String} selector jQuery selector.
   * @param {Function} callback Callback.
   */
  waitAllImageLoad: function (selector, callback) {
    var imgDefereds = [];

    $(selector).each(function () {
      var dfd = $.Deferred();
      $(this).bind('load', function () {
        dfd.resolve();
      });

      if (this.complete) {
        setTimeout(function () {
          dfd.resolve();
        }, 500);
      }
      imgDefereds.push(dfd);
    });
    $.when.apply(null, imgDefereds).then(callback);
  }
};
