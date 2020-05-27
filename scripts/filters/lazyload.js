'use strict'

hexo.extend.filter.register(
  'after_post_render',
  function (data) {
    var theme = hexo.theme.config
    if (!theme.lazyload || !theme.lazyload.enable) {
      return
    }

    data.content = data.content.replace(
      // Match 'img' tags width the src attribute.
      /<img([^>]*)src="([^"]*)"([^>]*)>/gim,
      function (match, attrBegin, src, attrEnd) {
        // Exit if the src doesn't exists.
        if (!src) {
          return match
        }

        // Smallest 1 * 1 pixel transparent gif
        var loadingBlock =
          'data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs='
        var loadingGIF = `/${theme.images}/loading.svg`
        var phClassName = theme.lazyload.placeholder
        var placeholder = ''

        if (phClassName === 'gif') {
          placeholder = loadingGIF
        } else if (phClassName === 'block') {
          placeholder = loadingBlock
        }

        var className = `lazyload lazyload-${phClassName}`
        return `
        <img ${attrBegin} class="${className}"
          src="${placeholder}" data-src="${src}" ${attrEnd}>
      `
      }
    )
  },
  1
)
