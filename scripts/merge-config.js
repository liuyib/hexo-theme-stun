'use strict'

hexo.on('generateBefore', function () {
  var rootConfig = hexo.config

  if (hexo.locals.get) {
    var data = hexo.locals.get('data')

    if (data && data.stun) {
      hexo.theme.config = data.stun
    }
  }

  hexo.theme.config.rootConfig = rootConfig
})
