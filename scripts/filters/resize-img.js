/* global hexo */

'use strict';

hexo.extend.filter.register('after_post_render', function (data) {
  data.content = data.content.replace(
    // Match 'img' tags width the src attribute.
    /<img([^>]*)src="([^"]*)"([^>]*)>/gim,
    function (match, attrBegin, src, attrEnd) {
      // Exit if the src doesn't exists.
      if (!src) {
        return match;
      }

      // A flag that sets the size of image.
      var RESIZE_IMG_SIGN = '?size=';
      var srcLower = src.toLowerCase();
      // Exit if the src doesn't include the sign of resize.
      if (!srcLower.includes(RESIZE_IMG_SIGN)) {
        return match;
      }

      var size = srcLower.split(RESIZE_IMG_SIGN)[1];
      // Exit if hasn't the value of width or height.
      if (!size) {
        return match;
      }

      // The sign between width and height.
      var MULTIPLY_SIGN = 'x';
      var w = size.split(MULTIPLY_SIGN)[0];
      var h = size.split(MULTIPLY_SIGN)[1];
      var style = '';

      if (!w || !h) {
        return;
      }
      if (w) {
        style += `width: ${w}px;`;
      }
      if (h) {
        style += `height: ${h}px;`;
      }

      return `<img ${attrBegin} src="${src}" style="${style}" ${attrEnd}>`;
    }
  );
}, 0);
