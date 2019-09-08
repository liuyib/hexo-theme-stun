/* global hexo */

'use strict';

hexo.extend.filter.register('after_post_render', function (data) {
  var cheerio;

  if (!cheerio) cheerio = require('cheerio');

  var $ = cheerio.load(data.content, { decodeEntities: false });

  $('h1,h2,h3,h4,h5,h6').each(function () {
    var $heading = $(this);
    var headingTxt = $heading.text().trim();

    $heading.html('<span class="heading-link">' + headingTxt + '</span>');
  });

  data.content = $.html();
}, 0);
