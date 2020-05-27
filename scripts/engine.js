'use strict'

hexo.extend.helper.register('hexo_env', function (type) {
  return this.env[type]
})

hexo.extend.helper.register('stun_env', function (type) {
  var env = require('../package.json')
  return env[type]
})
