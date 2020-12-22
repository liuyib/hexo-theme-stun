'use strict'

function note (args, content) {
  var theme = hexo.theme.config
  var icon = theme.icon && theme.icon.notetag_default
  var iconType = 'default'
  var isIcon = true

  if (args.includes('no-icon')) {
    isIcon = false
  }
  if (isIcon && theme.icon) {
    var tagTypes = ['default', 'success', 'info', 'warning', 'danger']
    tagTypes.forEach(type => {
      if (args.includes(type)) {
        icon = theme.icon[`notetag_${type}`]
        iconType = type
      }
    })
  }

  var className = args.join(' ')
  return `
    <div class="note-plugin ${className}">
      ${
        isIcon
          ? `<span class="note-plugin__icon note-plugin__icon--${iconType}">
              <i class="${icon}"></i>
            </span>`
          : ''
      }
      ${hexo.render
        .renderSync({ text: content, engine: 'markdown' })
        .split('\n')
        .join('')}
    </div>
  `
}

hexo.extend.tag.register('note', note, { ends: true })
