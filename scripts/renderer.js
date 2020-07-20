'use strict'

const nunjucks = require('nunjucks')
const { dirname } = require('path')

const nunjucksCfg = {
  autoescape: false
}

function safeDump (json, spacer = undefined) {
  if (typeof json !== 'undefined' && json !== null) {
    return JSON.stringify(json, null, spacer)
  }
  return '""'
}

function safeTrim (value) {
  if (typeof value === 'string') {
    return value.trim()
  }
  return value
}

function njkCompile (data) {
  let env
  if (data.path) {
    env = nunjucks.configure(dirname(data.path), nunjucksCfg)
  } else {
    env = nunjucks.configure(nunjucksCfg)
  }

  // Add custom filter
  env.addFilter('safedump', safeDump)
  env.addFilter('safetrim', safeTrim)

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
