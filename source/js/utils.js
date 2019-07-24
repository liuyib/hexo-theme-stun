/* global Stun, CONFIG */

Stun.utils = Stun.$u = {
  /**
   * Debounce
   * @param {Object} func Callback function
   * @param {Number} wait Waiting time
   * @param {Number} immediate Time interval for immediate run
   */
  debounce: function (func, wait, immediate) {
    var timeout;

    return function () {
      var context = this;
      var args = arguments;
      var later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);

      if (callNow) func.apply(context, args);
    };
  },
  /**
   * Throttle
   * @param {Object} func Callback function
   * @param {Number} wait Waiting time
   * @param {Number} mustRun Time interval for must run
   */
  throttle: function (func, wait, mustRun) {
    var timeout;
    var startTime = new Date();

    return function () {
      var context = this;
      var args = arguments;
      var curTime = new Date();

      clearTimeout(timeout);

      if (curTime - startTime >= mustRun) {
        func.apply(context, args);
        startTime = curTime;
      } else {
        timeout = setTimeout(func, wait);
      }
    };
  },
  /**
   * Change the event code to keyCode.
   * @param {String} code Event code
   */
  codeToKeyCode: function (code) {
    var codes = {
      ArrowLeft: 37,
      ArrowRight: 39,
      Escape: 27
    };

    return codes[code];
  },
  /**
   * A UI component for notification prompts.
   * @param {String} status The Status of message.
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
      var $alert = $(
        '<div class="stun-message">' +
          '<div class="stun-alert stun-alert-' + status + '">' +
            '<i class="stun-alert-icon fa fa-' + icon[status] + '"></i>' +
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

      if (!$imgWrap[0]) {
        var imgSrc = $img.attr('data-original') || $img.attr('src');

        $imgWrap = $img.wrap('<a class="fancybox" href="' + imgSrc +
          '" itemscope itemtype="http://schema.org/ImageObject" itemprop="url"></a>'
        ).parent('a');

        if ($img.is('.post-gallery img')) {
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
  galleryWaterFall: function () {
    var colWidth = parseInt(CONFIG.waterfall_col_width);
    var colGap = parseInt(CONFIG.waterfall_gap.x);
    
    $('.post-gallery').masonry({
      itemSelector: '.post-g-img',
      columnWidth: colWidth,
      percentPosition: true,
      gutter: colGap,
      transitionDuration: 0
    });
  },
  // Add a container outside the tables to make it scroll when needed.
  addContainerToTable: function () {
    var $wrapper = $('<div style="overflow: auto"></div>');
    $('table').wrap($wrapper);
  },
  // Adjust the size of images by the parameter "size".
  adjustImageSize: function () {
    $('img').each(function () {
      if (this.src.includes('?size=')) {
        var size = this.src.split('?size=')[1] &&
          this.src.split('?size=')[1].toLowerCase();
        var w = size.split('x')[0];
        var h = size.split('x')[1];

        $(this).css('width', w);
        $(this).css('height', h);
      }
    });
  },
  /**
   * Add a mark icon to the link with `target="_blank"` attribute.
   * @param {String} wrapper Any Jquery wrapper.
   */
  addIconToExternalLink: function (wrapper) {
    if (!$(wrapper)[0]) return;

    var $icon = $(
      '<i class="external-link fa fa-' +
        CONFIG.external_link.icon_name +
      '"></i>'
    );
    // Insert icon after link.
    // $icon.insertAfter($(wrapper).find('a[target="_blank"]'));

    // Insert icon inner link.
    $(wrapper).find('a[target="_blank"]').append($icon);
  },
  // Back the page to top.
  back2Top: function () {
    function runBack2Top () {
      var $top = $('#back-top');
      var scrollTop = $(window).scrollTop();

      if (scrollTop !== 0) {
        $top.css('visibility', 'visible');
      } else {
        $top.css('visibility', 'hidden');
      }
    }

    $(window).on('load', function () {
      runBack2Top();
    });

    $(window).on('scroll', function () {
      runBack2Top();
    });

    $('#back-top').on('click', function () {
      $('body').velocity('stop').velocity('scroll');

      if (CONFIG.back2top_animation) {
        $('#back-top')
          .velocity({ translateY: '-100vh' }, { duration: 500 })
          .velocity('reverse', { duration: 10 });
      }
    });
  },
  // Switch to the prev / next post by shortcuts.
  registerSwitchPost: function () {
    var _this = this;

    $(document).on('keydown', function (ev) {
      var e = ev || window.event;
      var isPrev = e.keyCode === _this.codeToKeyCode('ArrowLeft');
      var isNext = e.keyCode === _this.codeToKeyCode('ArrowRight');

      if (e.ctrlKey && isPrev) {
        var prev = $('.article-prev').find('a')[0];
        prev && prev.click();
      } else if (e.ctrlKey && isNext) {
        var next = $('.article-next').find('a')[0];
        next && next.click();
      }
    });
  },
  // Show / Hide the reward QR.
  registerShowReward: function () {
    $('.reward-button').on('click', function () {
      var $container = $('.reward-qr-wrapper');

      if ($container.css('display') === 'block') {
        $container.css('display', 'none');
      } else {
        $container
          .velocity('stop')
          .velocity('transition.slideDownBigIn', {
            duration: 300
          });
      }
    });
  }
};

$(document).ready(function () {
  Stun.utils.addContainerToTable();
  Stun.utils.adjustImageSize();
  Stun.utils.copyText();
});
