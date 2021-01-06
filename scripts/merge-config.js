'use strict'

/**
 * Flatten nested object.
 * @param {Object} target
 * @returns {Object}
 * @example { a: { b: 1, c: 2 } }  =>  { 'a.b': 1, 'a.c': 2 }
 */
function flatten (target) {
  const output = {}

  function step (object, prev) {
    Object.keys(object).forEach(function (key) {
      const value = object[key]
      const type = Object.prototype.toString.call(value)
      const isArray = Array.isArray(value)
      const isObject = type === '[object Object]'
      const hasOwnPrototype = Object.keys(value).length
      const newKey = prev ? `${prev}.${key}` : key

      if (!isArray && isObject && hasOwnPrototype) {
        return step(value, newKey)
      }

      output[newKey] = value
    })
  }

  step(target)

  return output
}

hexo.on('generateBefore', function () {
  var rootConfig = hexo.config

  if (hexo.locals.get) {
    var data = hexo.locals.get('data')

    if (data && data.stun) {
      hexo.theme.config = data.stun
    }

    var usingLang = rootConfig.language
    var targetLangData = data[`languages/${usingLang}`]

    if (targetLangData) {
      var flattenData = flatten(targetLangData)

      if (Object.keys(flattenData).length) {
        hexo.theme.i18n.data[usingLang] = flattenData
      }
    }
  }

  hexo.theme.config.rootConfig = rootConfig
})
