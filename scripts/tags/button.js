'use strict'

function button (args, content) {
  args = args.join(' ').split(',')

  const url = args[0]
  let icon = (args[1] || '').trim()
  let title = (args[2] || '').trim()
  let cnt = (content || '').trim()
  const isIconOnly = icon && !cnt

  if (!url) {
    hexo.log.warn('URL can NOT be empty.')
  }
  if (icon.length > 0) {
    if (!icon.startsWith('fas')) {
      icon = 'fas fa-' + icon
    }

    icon = `<span class="button-plugin__icon"><i class="${icon}"></i></span>`
  }
  if (title.length > 0) {
    title = ` title="${title}"`
  }
  if (cnt.length > 0) {
    cnt = `<span class="button-plugin__content">${content}</span>`
  }

  return `<a class="button-plugin${
    isIconOnly ? ' button-plugin--icon-only' : ''
  }" href="${url}"${title}>${icon}${cnt}</a>`
}

hexo.extend.tag.register('button', button, {
  ends: true,
  async: true
})
