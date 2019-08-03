/* global hexo */

'use strict';

function note(args, content) {
  var args = args.join(' ');

  return `<div class="note-plugin ${args}">
            ${hexo.render
              .renderSync({ text: content, engine: 'markdown' })
              .split('\n')
              .join('')}
          </div>`;
}

hexo.extend.tag.register('note', note, { ends: true });
