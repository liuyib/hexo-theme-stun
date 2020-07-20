'use strict'

// https://hexo.io/api/filter.html#template-locals
hexo.extend.filter.register('template_locals', locals => {
  const { env, config } = hexo
  const { __ } = locals

  // Hexo & Stun version
  locals.version = {
    hexo: env.version,
    stun: require('../../package.json').version
  }

  // Language & Config
  locals.title = __('title') !== 'title' ? __('title') : config.title
  locals.subtitle = __('subtitle') !== 'subtitle' ? __('subtitle') : config.subtitle
  locals.author = __('author') !== 'author' ? __('author') : config.author
  locals.description = __('description') !== 'description' ? __('description') : config.description
})
