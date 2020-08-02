'use strict'

const nunjucks = require('nunjucks')
const { dirname } = require('path')
const { addCustomFilters } = require('./filters')

const nunjucksCfg = {
  autoescape: false
}

function njkCompile (data) {
  let env
  if (data.path) {
    env = nunjucks.configure(dirname(data.path), nunjucksCfg)
  } else {
    env = nunjucks.configure(nunjucksCfg)
  }

  addCustomFilters(env)

  return nunjucks.compile(data.text, env, data.path)
}

function njkRenderer (data, options) {
  return njkCompile(data).render(options)
}

njkRenderer.compile = (data) => {
  // Need a closure to keep the compiled template.
  return (options) => njkCompile(data).render(options)
}

hexo.extend.renderer.register('njk', 'html', njkRenderer)
hexo.extend.renderer.register('j2', 'html', njkRenderer)
