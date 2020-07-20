// https://support.google.com/webmasters/answer/139066
hexo.extend.helper.register('canonical', function () {
  const { permalink } = hexo.config
  let url = this.url.replace(/index\.html$/, '')

  if (!permalink.endsWith('.html')) {
    url = url.replace(/\.html$/, '')
  }

  return `<link rel="canonical" href="${url}">`
})
