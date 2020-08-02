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

function safeArray (arr) {
  if (Array.isArray(arr)) {
    return arr
  }
  return []
}

// Add custom filters to nunjucks.
// The `s_` prefix is added to prevent conflicts with the built-in filters.
function addCustomFilters (ctx) {
  ctx.addFilter('s_dump', safeDump)
  ctx.addFilter('s_trim', safeTrim)
  ctx.addFilter('s_array', safeArray)
}

module.exports = {
  addCustomFilters
}
