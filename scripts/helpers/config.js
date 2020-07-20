'use strict'

const { URL } = require('url')

/**
 * Export theme config to JavaScript
 */
hexo.extend.helper.register('stun_config', function () {
  const { config, theme, version } = this
  const exportConfig = {
    root: config.root,
    hostname: new URL(config.url).hostname || config.url,
    version: {
      hexo: version.hexo,
      stun: version.stun
    },
    fancybox: theme.fancybox
  }

  return `<script class="stun-configurations">
    var Stun = window.Stun || {};
    var CONFIG = window.CONFIG || ${JSON.stringify(exportConfig)};
  </script>`
})
