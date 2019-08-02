/* global hexo */

'use strict';

var pathFn = require('path');
var fs = require('hexo-fs');

function table(args) {
  args = args.join(' ').split(',');
  var path = pathFn.join(hexo.source_dir, args[0]);
  var headers = args.slice(1);

  fs.exists(path).then(function(exist) {
    if (!exist) {
      hexo.log.error('Include file not found!');
      return;
    }
  });

  return fs.readFile(path).then(function(data) {
    if (!data) {
      hexo.log.warn('Include file empty.');
      return;
    }    

    var data = JSON.parse(data);
    var result = '<table><thead><tr>';

    headers.forEach(item => {
      result += `<th>${item.trim()}</th>`;
    });
    result += '</tr></thead><tbody>';
    data.forEach(item => {
      result += '<tr style="text-align: center;">';
      for (const key in item) {
        if (item.hasOwnProperty(key)) {
          const value = item[key];
          
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
