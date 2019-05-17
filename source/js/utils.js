window.$ = function (selector) {
  return document.querySelector(selector);
}

function getScrollTop() {
  return window.pageYOffset || document.documentElement.scrollTop ||
    document.body.scrollTop || 0;
}
