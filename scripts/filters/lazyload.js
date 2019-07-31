/* global hexo */

'use strict';

hexo.extend.filter.register('after_post_render', function(data) {
  var theme = hexo.theme.config;
  if (!theme.lazyload.enable) return;

  var cheerio;

  if (!cheerio) cheerio = require('cheerio');

  var $ = cheerio.load(data.content, { decodeEntities: false });

  $('img').each(function () {
    var $img = $(this);
    // 最小 1 * 1 像素的透明 gif 图片
    var loadingGIF = `/${(theme.images && theme.images.replace(/^\/+|\/+$/gm,'')) || 'images'}/loading.svg`;
    var loadingBlock = 'data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=';
    var placeholder;

    if (theme.lazyload.placeholder === 'gif') {
      placeholder = loadingGIF;
    } else if (theme.lazyload.placeholder === 'block') {
      placeholder = loadingBlock;
    }

    $img.addClass('lazyload');
    $img.attr('data-src', $img.attr('src'));
    $img.attr('src', placeholder);

    if (theme.lazyload.placeholder) {
      $img.addClass(theme.lazyload.placeholder);
    }
  });
  data.content = $.html();
}, 1);
