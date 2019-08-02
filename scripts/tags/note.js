/* global hexo */

'use strict';

function note(args, content) {
  return `<div class="note-plugin ${args.join(' ')}">
            ${hexo.render
              .renderSync({ text: content, engine: 'markdown' })
              .split('\n')
              .join('')}
          </div>`;
}

hexo.extend.tag.register('note', note, { ends: true });
