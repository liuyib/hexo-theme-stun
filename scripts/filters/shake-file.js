/* global hexo */

'use strict';

hexo.extend.filter.register('after_generate', () => {
  var theme = hexo.theme.config;

  if (!theme.shake_file) return;

  if (!theme.sidebar.enable) {
    hexo.route.remove('js/sidebar.js');
  }
});
