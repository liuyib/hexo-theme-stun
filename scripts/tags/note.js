/* global hexo */

'use strict';

function note(args, content) {
  var noteClassName = args.join(' ');
  return `
    <div class="note-plugin ${noteClassName}">
      ${hexo.render
        .renderSync({ text: content, engine: 'markdown' })
        .split('\n')
        .join('')}
    </div>
  `;
}

hexo.extend.tag.register('note', note, { ends: true });
