'use strict'

function linkcard (args) {

    var imgClassName = ''
    var theme = hexo.theme.config
    if (theme.lazyload && theme.lazyload.enable) {
        imgClassName += `lazyload lazyload-${theme.lazyload.placeholder}`
    }

    var renderHtml =
    `<a href="${args[1]}" name="${args[2]}" class="LinkCard">`+
        `<span class="LinkCard-backdrop"></span>`+
        `<span class=LinkCard-content>`+
            `<span class=LinkCard-text>`+
                `<span class=LinkCard-title>${args[0]}</span>`+
                `<span class=LinkCard-meta><i class="fas fa-link"></i>${args[1]}</span>`+
            `</span>`+
            `<span class=LinkCard-imageCell><img class="${imgClassName} LinkCard-image" alt=logo src="${args[2]}"></span>`+
        `</span>`+
    `</a>`
    return renderHtml
}

hexo.extend.tag.register('linkcard', linkcard, { ends: false, async: true })
