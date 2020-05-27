'use strict'

hexo.extend.filter.register(
  'after_post_render',
  function (data) {
    data.content = data.content.replace(
      // Match 'img' tags width the src attribute.
      /<img([^>]*)src="([^"]*)"([^>]*)>/gim,
      function (match, attrBegin, src, attrEnd) {
        // Exit if the src doesn't exists.
        if (!src) {
          return match
        }

        var search = src.split('?')[1]
        // Exit if the src doesn't include query parameter.
        if (!search) {
          return match
        }

        var params = search.split('&').filter(i => i !== '')
        // Exit if the query parameter is empty.
        if (!params.length) {
          return match
        }

        var size = ''
        var show = ''
        var style = ''

        params.forEach(param => {
          if (param.includes('size')) {
            size = param.split('=')[1] || ''
          }
          if (param.includes('show')) {
            show = param.split('=')[1] || ''
          }
        })

        if (size !== '') {
          // The sign between width and height.
          var MULTIPLY_SIGN = 'x'
          var w = size.split(MULTIPLY_SIGN)[0]
          var h = size.split(MULTIPLY_SIGN)[1]

          if (w) {
            style += `width: ${w}px;`
          }
          if (h) {
            style += `height: ${h}px;`
          }
        }
        if (show === 'inline') {
          style += 'display: inline-block;'
        }

        return `<img ${attrBegin} src="${src}" style="${style}" ${attrEnd}>`
      }
    )
  },
  0
)
