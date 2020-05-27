$(document).ready(function () {
  Stun.utils.showThemeInConsole()

  if (CONFIG.shortcuts && CONFIG.shortcuts.switchPost) {
    Stun.utils.registerSwitchPost()
  }

  // Not reload this, because it's changeless.
  if (CONFIG.externalLink) {
    Stun.utils.addIconToExternalLink('#footer')
  }

  Stun.utils.pjaxReloadBoot = function () {
    if (CONFIG.codeblock) {
      var codeStyle = CONFIG.codeblock.style
      if (codeStyle === 'default') {
        this.addCodeHeader()
        this.addCopyButton()
      } else if (codeStyle === 'carbon') {
        this.addCodeHeader('carbon')
        this.addCopyButton('carbon')
      } else if (codeStyle === 'simple') {
        this.addCopyButton('simple')
      }
      this.registerCopyEvent()
    }
    if (CONFIG.reward) {
      this.registerShowReward()
    }
    if (CONFIG.lazyload) {
      this.lazyLoadImage()
    }
    if (CONFIG.galleryWaterfall) {
      this.showImageToWaterfall()
    }
    if (CONFIG.externalLink) {
      var CONTAINER = '.archive, .post-title'
      this.addIconToExternalLink(CONTAINER)
    }
    if (CONFIG.fancybox) {
      this.wrapImageWithFancyBox()
    } else if (CONFIG.zoomImage) {
      this.registerZoomImage()
    }
  }

  // Initializaiton
  Stun.utils.pjaxReloadBoot()
})
