'use strict'

hexo.extend.filter.register('after_generate', function () {
  var theme = hexo.theme.config
  if (!theme.shake_file) {
    return
  }

  if (!(theme.sidebar && theme.sidebar.enable)) {
    hexo.route.remove('js/sidebar.js')
  }
})
