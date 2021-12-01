'use strict'

var pathFn = require('path')
var fs = require('hexo-fs')

function rewards (args) {
  var path = pathFn.join(hexo.source_dir, args[0])

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

    var friends = JSON.parse(data)
    var renderHtml = `<style>td{text-align:center}</style>` + 
    `<div class="rewards-plugin"><table><thead><tr><th>时间</th><th>昵称</th><th>渠道</th><th>金额</th><th>备注</th></tr></thead><tbody>`
    friends.forEach(f => {
      renderHtml +=
        `<tr>` + 
        `<td>${f.time}</td>` + 
        `<td>${f.name}</td>` + 
        `<td>${f.from}</td>` + 
        `<td>${f.money}</td>` + 
        `<td>${f.mark}</td>` + 
        `</tr>`
    })
    renderHtml += '</tbody></table></div>'

    return renderHtml
  })
}

hexo.extend.tag.register('rewards', rewards, { ends: false, async: true })