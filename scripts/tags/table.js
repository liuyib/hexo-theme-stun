'use strict'

var pathFn = require('path')
var fs = require('hexo-fs')

// {% table [path] [thead1,thead2,...] %}
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

// {% blocktable title %}
// content
// {% endblocktable %}
function postTableBlock(args, content) {
  if(/::/g.test(args)){
    args = args.join(' ').split('::');
  }
  else{
    args = args.join(' ').split(',');
  }
  let ret = '';
  // wrap
  ret += '<div class="table-wrap">';
  // caption
  if (args.length > 0) {
    const caption = args[0].trim();
    ret += '<span class="table-caption">' + caption + '</span>';
  }
  // content
  ret += hexo.render.renderSync({text: content, engine: 'markdown'}).split('\n').join('');
  ret += '</div>';
  return ret;
}

hexo.extend.tag.register('table', table, { ends: false, async: true })
hexo.extend.tag.register('blocktable', postTableBlock, { ends: true })
