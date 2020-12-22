'use strict'

var pathFn = require('path')
var fs = require('hexo-fs')

function table (args) {
  var path = pathFn.join(hexo.source_dir, args[0])
  var headers = args[1].split(',')

  fs.exists(path).then(function (exist) {
    if (!exist) {
      hexo.log.error('Include file not found!')
    }
  })

  return fs.readFile(path).then(function (data) {
    if (!data) {
      hexo.log.warn('Include file empty.')
      return
    }

    var tableData = JSON.parse(data)
    var result = '<table class="table-plugin"><thead><tr>'

    headers.forEach(header => (result += `<th>${header}</th>`))
    result += '</tr></thead><tbody>'
    tableData.forEach(item => {
      result += '<tr style="text-align: center;">'

      for (var key in item) {
        if (Object.prototype.hasOwnProperty.call(item, key)) {
          var value = item[key]
          result += `<td>${value}</td>`
        }
      }

      result += '</tr>'
    })
    result += '</tbody></table>'

    return result
  })
}

hexo.extend.tag.register('table', table, { ends: false, async: true })
