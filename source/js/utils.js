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
    return (
      window.screen.width > 767 &&
      window.screen.width < 992 &&
      this.hasMobileUA()
    );
  },
  isMobile: function () {
    return window.screen.width < 767 && this.hasMobileUA();
  },
  isDesktop: function () {
    return !this.isTablet() && !this.isMobile();
  },
  Cookies: function () {
    function extend () {
      var i = 0;
      var result = {};
      for (; i < arguments.length; i++) {
        var attributes = arguments[i];
        for (var key in attributes) {
          result[key] = attributes[key];
        }
      }
      return result;
    }

    function init (converter) {
      function api (key, value, attributes) {
        var result;
        if (typeof document === 'undefined') {
          return;
        }
        // Write
        if (arguments.length > 1) {
          attributes = extend({ path: '/' }, api.defaults, attributes);
          if (typeof attributes.expires === 'number') {
            var expires = new Date();
            expires.setMilliseconds(
              expires.getMilliseconds() + attributes.expires * 864e5
            );
            attributes.expires = expires;
          }
          // We're using "expires" because "max-age" is not supported by IE
          attributes.expires = attributes.expires
            ? attributes.expires.toUTCString()
            : '';
          try {
            result = JSON.stringify(value);
            if (/^[{[]/.test(result)) {
              value = result;
            }
          } catch (e) {}
          if (!converter.write) {
            value = encodeURIComponent(String(value)).replace(
              /%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,
              decodeURIComponent
            );
          } else {
            value = converter.write(value, key);
          }
          key = encodeURIComponent(String(key));
          key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
          key = key.replace(/[()]/g, escape);

          var stringifiedAttributes = '';
          for (var attributeName in attributes) {
            if (!attributes[attributeName]) {
              continue;
            }
            stringifiedAttributes += '; ' + attributeName;
            if (attributes[attributeName] === true) {
              continue;
            }
            stringifiedAttributes += '=' + attributes[attributeName];
          }
          return (document.cookie = key + '=' + value + stringifiedAttributes);
        }
        // Read
        if (!key) {
          result = {};
        }
        // To prevent the for loop in the first place assign an empty array
        // in case there are no cookies at all. Also prevents odd result when
        // calling "get()"
        var cookies = document.cookie ? document.cookie.split('; ') : [];
        var rdecode = /(%[0-9A-Z]{2})+/g;
        var i = 0;

        for (; i < cookies.length; i++) {
          var parts = cookies[i].split('=');
          var cookie = parts.slice(1).join('=');

          if (cookie.charAt(0) === '"') {
            cookie = cookie.slice(1, -1);
          }
          try {
            var name = parts[0].replace(rdecode, decodeURIComponent);
            cookie = converter.read
              ? converter.read(cookie, name)
              : converter(cookie, name) ||
                cookie.replace(rdecode, decodeURIComponent);
            if (this.json) {
              try {
                cookie = JSON.parse(cookie);
              } catch (e) {}
            }
            if (key === name) {
              result = cookie;
              break;
            }
            if (!key) {
              result[name] = cookie;
            }
          } catch (e) {}
        }
        return result;
      }
      api.set = api;
      api.get = function (key) {
        return api.call(api, key);
      };
      api.getJSON = function () {
        return api.apply({ json: true }, [].slice.call(arguments));
      };
      api.defaults = {};
      api.remove = function (key, attributes) {
        api(key, '', extend(attributes, { expires: -1 }));
      };
      api.withConverter = init;
      return api;
    }
    return init(function () {});
  },
  showThemeInConsole: function () {
    var stunInfo = '主题不错？⭐star 支持一下 ->';
    var stunURL = 'https://github.com/liuyib/hexo-theme-stun';
    var stunNameStr =
      '\n\n      ___          ___            ___            ___      \n     /\\  \\        /\\  \\          /\\__\\          /\\__\\     \n    /::\\  \\       \\:\\  \\        /:/  /         /::|  |    \n   /:/\\ \\  \\       \\:\\  \\      /:/  /         /:|:|  |    \n  _\\:\\ \\ \\  \\      /::\\  \\    /:/  /  ___    /:/|:|  |__  \n /\\ \\:\\ \\ \\__\\    /:/\\:\\__\\  /:/__/  /\\__\\  /:/ |:| /\\__\\ \n \\:\\ \\:\\ \\/__/   /:/  \\/__/  \\:\\  \\ /:/  /  \\/__|:|/:/  / \n  \\:\\ \\:\\__\\    /:/  /        \\:\\  /:/  /       |:/:/  /  \n   \\:\\/:/  /    \\/__/          \\:\\/:/  /        |::/  /   \n    \\::/  /                     \\::/  /         /:/  /    \n     \\/__/                       \\/__/          \\/__/     \n                                                          \n';
    var stunInfoStyle =
      'background-color: #49b1f5; color: #fff; padding: 8px; font-size: 14px;';
    var stunURLStyle =
      'background-color: #ffbca2; padding: 8px; font-size: 14px;';
    var stunNameStyle = 'background-color: #eaf8ff;';

    console.log(
      '%c%s%c%s%c%s',
      stunInfoStyle,
      stunInfo,
      stunURLStyle,
      stunURL,
      stunNameStyle,
      stunNameStr
    );
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
    if ($('.stun-message').length !== 0) {
      $('.stun-message').remove();
    }

    var $alert = $(
      '<div class="stun-message">' +
        `<div class="stun-alert stun-alert-${status}">` +
        `<i class="stun-alert-icon ${CONFIG.fontIcon.prompt[status]}"></i>` +
        `<span class="stun-alert-description">${text}</span>` +
        '</div>' +
        '</div>'
    );

    $('body').append($alert);
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
    $('.content img')
      .not(':hidden')
      .each(function () {
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
          $imgWrap = $img
            .wrap(`<a class="fancybox" href="${imgSrc}"></a>`)
            .parent('a');
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
    var gConfig = CONFIG.galleryWaterfall;
    var colWidth = parseInt(gConfig.colWidth);
    var colGapX = parseInt(gConfig.gapX);
    var GALLERY_IMG_SELECTOR = '.gallery img';

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

    var $wrapper = $('<span class="exturl"></span>');
    var $icon = $(
      '<span class="exturl__icon">' +
        `<i class="${CONFIG.externalLink.icon.name}"></i>` +
        '</span>'
    );

    $(container)
      .find('a[target="_blank"]')
      .addClass('exturl__link')
      .wrap($wrapper)
      .parent('.exturl')
      .append($icon);
  },
  // Switch to the prev / next post by shortcuts.
  registerSwitchPost: function () {
    var keyLeft = this.codeToKeyCode('ArrowLeft');
    var keyRight = this.codeToKeyCode('ArrowRight');

    $(document).on('keydown', function (e) {
      var isPrev = e.keyCode === keyLeft;
      var isNext = e.keyCode === keyRight;

      if (e.ctrlKey) {
        if (isPrev) {
          var prevElem = $('.paginator-prev a')[0];
          prevElem && prevElem.click();
        } else if (isNext) {
          var nextElem = $('.paginator-next a')[0];
          nextElem && nextElem.click();
        }
      }
    });
  },
  // Show / Hide the reward QR.
  registerShowReward: function () {
    $('.reward-button').on('click', function () {
      var $container = $('.reward-qrcode');
      if ($container.is(':visible')) {
        $container.css('display', 'none');
      } else {
        $container.velocity('stop').velocity('transition.slideDownIn', {
          duration: 300
        });
      }
    });
  },
  // Click to zoom in image, without fancybox.
  registerZoomImage: function () {
    $('#content-wrap img')
      .not(':hidden')
      .each(function () {
        if ($(this).attr('data-zoom') === 'none') return;
        $(this).addClass('zoomimg');
      });

    var $imgMask = $('<div class="zoomimg-mask"></div>');
    var $imgClone = null;
    var isZoom = false;

    $(window).on('scroll', closeZoom);
    $(document).on('click', closeZoom);

    $('.zoomimg').on('click', function (e) {
      e.stopPropagation();
      if (isZoom) {
        closeZoom();
        return;
      }
      isZoom = true;
      $imgClone = $(this)
        .clone()
        .addClass('zoomimg-clone');

      var SIDE_GAP = parseInt(CONFIG.zoomImage.gapAside || 20);
      var imgRect = this.getBoundingClientRect();
      var imgOuterW = $(this).outerWidth();
      var imgOuterH = $(this).outerHeight();
      var imgW = $(this).width();
      var imgH = $(this).height();
      var imgL = $(this).offset().left + (imgOuterW - imgW) / 2;
      var imgT = $(this).offset().top + (imgOuterH - imgH) / 2;
      var winW = $(window).width() - SIDE_GAP * 2;
      var winH = $(window).height() - SIDE_GAP * 2;
      var scaleX = winW / imgW;
      var scaleY = winH / imgH;
      var scale = (scaleX < scaleY ? scaleX : scaleY) || 1;
      var translateX = winW / 2 - (imgRect.x + imgOuterW / 2) + SIDE_GAP;
      var translateY = winH / 2 - (imgRect.y + imgOuterH / 2) + SIDE_GAP;

      $(this).addClass('zoomimg--hide');
      $('body')
        .append($imgMask)
        .append($imgClone);
      $imgMask.velocity({
        opacity: 1
      });
      $imgClone.css({
        left: imgL,
        top: imgT,
        width: imgW,
        height: imgH
      });
      $imgClone.velocity(
        {
          translateX: translateX,
          translateY: translateY,
          scale: scale
        },
        { duration: 300 }
      );
    });

    function closeZoom () {
      if (!isZoom) {
        return;
      }

      isZoom = false;
      $imgClone.velocity('reverse');
      $imgMask.velocity('reverse', {
        complete: function () {
          $imgMask.remove();
          $imgClone.remove();
          $('.zoomimg').removeClass('zoomimg--hide');
        }
      });
    }
  },
  /**
   * Add the header to code block.
   * @param {string} type The type of header. value: 'carbon' | null.
   */
  addCodeHeader: function (type) {
    $('figure.highlight').each(function () {
      if (!$(this).find('figcaption')[0]) {
        var content = '';
        if (!type) {
          var CODEBLOCK_CLASS_NAME = 'highlight';
          var lang = $(this)
            .attr('class')
            .split(/\s/)
            .filter(function (e) {
              return e !== CODEBLOCK_CLASS_NAME;
            });

          content += `<div class="custom-lang">${lang}</div>`;
        } else if (type === 'carbon') {
          content += `
            <div class="custom-carbon">
              <div class="custom-carbon-dot custom-carbon-dot--red"></div>
              <div class="custom-carbon-dot custom-carbon-dot--yellow"></div>
              <div class="custom-carbon-dot custom-carbon-dot--green"></div>
            </div>
          `;
        }

        $(`<figcaption class="custom">${content}</figcaption>`).insertBefore(
          $(this)
            .children()
            .first()
        );
      }
    });
  },
  addCopyButton: function (type) {
    var btnContainer = '.post-copyright,';
    var $copyIcon = $(
      `<div class="copy-button" data-popover="${CONFIG.prompt.copyButton}" data-popover-pos="up">` +
        `<i class="${CONFIG.fontIcon.copyBtn}"></i>` +
        '</div>'
    );

    if (type === 'simple' || type === 'carbon') {
      btnContainer += '.highlight figcaption:not(".custom")';
    } else {
      btnContainer += '.highlight figcaption';
    }
    // Add a copy button to the selected elements.
    $(btnContainer).append($copyIcon);
  },
  registerCopyEvent: function () {
    $('.copy-button').on('click', function () {
      var container = null;
      // Select the container of code block.
      var codeContainer = $(this)
        .parents('figure.highlight')
        .find('td.code')[0];

      if (codeContainer) {
        container = codeContainer;
      } else {
        // Select the container of text.
        container = $(this).parent()[0];
      }
      if (Stun.utils.copyText(container)) {
        Stun.utils.popAlert('success', CONFIG.prompt.copySuccess);
      } else {
        Stun.utils.popAlert('error', CONFIG.prompt.copyError);
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
