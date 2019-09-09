/* global hexo */

'use strict';

var pathFn = require('path');
var fs = require('hexo-fs');

function friends(args) {
  var path = pathFn.join(hexo.source_dir, args[0]);

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
    var result = '<div class="friends-plugin">';

    datas.forEach(data => {
      result += `<a class="friends-plugin__item" href="${data.url}">`;
      result += `<img class="friends-plugin__item-avatar" src="${data.avatar}">`;
      result += '<div class="friends-plugin__item-info">';
      result += `<p class="friends-plugin__item-info__name">${data.name}</p>`;
      result += `<p class="friends-plugin__item-info__intro">${data.introduction}</p>`;
      result += '</div>';
      result += '</a>';
    });

    result += '</div>';

    return result;
  });
}

hexo.extend.tag.register('friends', friends, { ends: false, async: true });
