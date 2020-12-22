'use strict'

hexo.extend.filter.register(
  'after_post_render',
  function (data) {
    data.content = data.content.replace(
      // Match the innermost 'table' tag.
      /(<table[^>]*>(?:(?!<\/?table>)(?:\s|\S))*?<\/table>)/gim,
      function (match, table) {
        if (!table) {
          return match
        }

        return `<div class="table-container">${table}</div>`
      }
    )
  },
  0
)
