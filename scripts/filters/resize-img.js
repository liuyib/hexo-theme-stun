/* global hexo */

'use strict';

hexo.extend.filter.register('after_post_render', function (data) {
  var cheerio;

  if (!cheerio) cheerio = require('cheerio');

  var $ = cheerio.load(data.content, { decodeEntities: false });

  $('img').each(function () {
    var $img = $(this);

    if (!$img.attr('src')) return;
    if ($img.attr('src').includes('?size=')) {
      var size = $img.attr('src').split('?size=')[1] && $img.attr('src').split('?size=')[1].toLowerCase();
      var w = size.split('x')[0] + 'px';
      var h = size.split('x')[1] + 'px';

      $img.css({ width: w, height: h });
    }
  });

  data.content = $.html();
}, 0);
