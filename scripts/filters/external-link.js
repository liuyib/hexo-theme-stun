/* global hexo */

'use strict';

hexo.extend.filter.register('after_post_render', function (data) {
  var theme = hexo.theme.config;
  if (
    !theme.external_link ||
    !theme.external_link.icon ||
    !theme.external_link.icon.enable
  ) {
    return;
  }

  var url = require('url');
  var config = this.config;
  var siteHost = url.parse(config.url).hostname || config.url;

  data.content = data.content.replace(
    /(<a([^>]*)href="([^"]*)"([^>]*)>([^<]*)<\/a>)/gim,
    function (match, all, attrBegin, href, attrEnd, html) {
      // Exit if the href attribute doesn't exists.
      if (!href) {
        return match;
      }

      // Exit if the url has same host with `config.url`, which means isn't an external link.
      var link = url.parse(href);
      if (!link.protocol || link.hostname === siteHost) {
        return match;
      };

      var attrOther = attrBegin + attrEnd;
      var className = '';

      attrOther.split(/\s/gim).forEach(attr => {
        var nAttr = attr.replace(/["']*/gim, '');
        var aKey = (nAttr.split('=')[0] || '').trim();
        var aValue = (nAttr.split('=')[1] || '').trim();

        if (aKey === 'class') {
          className = aValue;
        }
      });

      // Exit if the class name is in whitelist.
      var whiteList = ['friends-plugin__item'];
      if (className && whiteList.includes(className)) {
        return match;
      }

      var fa_prefix = theme.fa_prefix || 'fa';
      return (
        '<span class="external-link">' +
          `<a ${attrBegin} href="${href}" ${attrEnd}>${html}</a>` +
          `<i class="${fa_prefix} fa-external-link"></i>` +
        '</span>'
      );
    }
  );
}, 0);
