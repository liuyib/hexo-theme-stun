/* global hexo */

'use strict';

hexo.extend.filter.register('after_post_render', function (data) {
  var cheerio;
  
  if (!cheerio) cheerio = require('cheerio');

  var $ = cheerio.load(data.content, { decodeEntities: false });
  var $wrapper = $('<div style="overflow: auto"></div>');

  $('table').wrap($wrapper);
  data.content = $.html();
}, 0);
