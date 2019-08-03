/* global hexo */

'use strict';

hexo.extend.filter.register('after_post_render', function(data) {
  var theme = hexo.theme.config;
  if (!theme.external_link.icon.enable) return;

  var url = require('url');
  var cheerio;
  var config = this.config;

  if (!cheerio) cheerio = require('cheerio');

  var $ = cheerio.load(data.content, { decodeEntities: false });
  var siteHost = url.parse(config.url).hostname || config.url;

  $('a').each(function() {
    var href = $(this).attr('href');
    if (!href) return;
    var className = $(this).attr('class');
    if (className && className.indexOf('friends-item') !== -1) return;

    var data = url.parse(href);

    if (!data.protocol) return;
    if (data.hostname === siteHost) return;

    $(this).replaceWith(function() {
      return $(
        '<span class="external-link">' +
          '<a href="' + href + '" target="_blank" rel="noopener">' +
            $(this).html() +
          '</a>' +
          '<i class="fa fa-external-link"></i>' +
        '</span>'
      );
    });

  });
  data.content = $.html();
}, 0);
