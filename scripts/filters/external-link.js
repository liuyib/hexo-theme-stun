'use strict'

hexo.extend.filter.register(
  'after_post_render',
  function (data) {
    var theme = hexo.theme.config
    if (
      !theme.external_link ||
      !theme.external_link.icon ||
      !theme.external_link.icon.enable
    ) {
      return
    }

    var config = this.config
    var url = new URL(config.url)
    var siteHost = url.hostname || config.url
    // Match 'a' tags that don't contain html children.
    var regPureATag = /<a([^>]*)href="([^"]*)"([^>]*)>([^<]*)<\/a>/gim

    data.content = data.content.replace(regPureATag, function (
      match,
      attrBegin,
      href,
      attrEnd,
      html
    ) {
      // Exit if the href attribute doesn't exists.
      if (!href) {
        return match
      }

      var link = ''
      try {
        link = new URL(href)
      } catch (e) {
        // Invalid url, e.g. Anchor link.
        return match
      }

      // Exit if the url has same host with `config.url`, which means isn't an external link.
      if (!link.protocol || link.hostname === siteHost) {
        return match
      }

      return (
        '<span class="exturl">' +
        `<a class="exturl__link" ${attrBegin} href="${href}" ${attrEnd}>${html}</a>` +
        `<span class="exturl__icon"><i class="${theme.external_link.icon.name}"></i></span>` +
        '</span>'
      )
    })
  },
  0
)
