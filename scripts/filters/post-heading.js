/* global hexo */

'use strict';

hexo.extend.filter.register('after_post_render', function (data) {
  var tagName = `h[1-6]`;
  var attrId = `id="([^"]*)"`;
  var tagNotEnd = `([^>]*)`;
  var regAttrId = tagNotEnd + attrId + tagNotEnd;
  var regHTagInnermost = new RegExp(
    `<${tagName}${regAttrId}>((?:(?!<\\/?${tagName}${regAttrId}>)(?:\\s|\\S))*?)<\/${tagName}>`,
    'gim'
  );

  data.content = data.content.replace(
    regHTagInnermost,
    function (match, attrBegin, id, attrEnd, html) {
      if (!id) {
        return match;
      }

      var filterHtml = (html.replace(/<[^>]+>/gim, '') || '').trim();
      return `
        <h2 ${attrBegin} id="${id}" ${attrEnd}>
          <span class="heading-link">${filterHtml}</span>
        </h2>
      `;
    }
  );
}, 0);
