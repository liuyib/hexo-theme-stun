/* global hexo */

'use strict';

var pathFn = require('path');
var fs = require('hexo-fs');

function table(args) {
  var path = pathFn.join(hexo.source_dir, args[0]);
  var headers = args[1].split(',');

  fs.exists(path).then(function(exist) {
    if (!exist) {
      hexo.log.error('Include file not found!');
      return;
    }
  });

  return fs.readFile(path).then(function(datas) {
    if (!datas) {
      hexo.log.warn('Include file empty.');
      return;
    }    

    var datas = JSON.parse(datas);
    var result = '<table class="table-plugin"><thead><tr>';

    headers.forEach(header => {
      result += `<th>${header}</th>`;
    });
    result += '</tr></thead><tbody>';
    datas.forEach(data => {
      result += '<tr style="text-align: center;">';
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const value = data[key];
          
          result += `<td>${value}</td>`
        }
      }
      result += '</tr>';
    });
    result += '</tbody></table>';

    return result;
  });
}

hexo.extend.tag.register('table', table, { ends: false, async: true });
