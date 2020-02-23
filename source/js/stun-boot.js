$(document).ready(function () {
  Stun.utils.showThemeInConsole();

  if (CONFIG.shortcuts && CONFIG.shortcuts.switch_post) {
    Stun.utils.registerHotkeyToSwitchPost();
  }

  // Not reload this, because it's changeless.
  if (CONFIG.external_link) {
    Stun.utils.addIconToExternalLink('#footer');
  }

  Stun.utils.pjaxReloadBoot = function () {
    if (CONFIG.codeblock) {
      var codeStyle = CONFIG.codeblock.style;
      if (codeStyle === 'default') {
        this.addCodeHeader();
        this.addCopyButton();
      } else if (codeStyle === 'carbon') {
        this.addCodeHeader('carbon');
        this.addCopyButton('carbon');
      } else if (codeStyle === 'simple') {
        this.addCopyButton('simple');
      }
      this.registerCopyEvent();
    }
    if (CONFIG.reward) {
      this.registerShowReward();
    }
    if (CONFIG.lazyload) {
      this.lazyLoadImage();
    }
    if (CONFIG.gallery_waterfall) {
      this.showImageToWaterfall();
    }
    if (CONFIG.external_link) {
      var CONTAINER = '.archive, .post-title';
      this.addIconToExternalLink(CONTAINER);
    }
    if (CONFIG.fancybox) {
      this.wrapImageWithFancyBox();
    } else if (CONFIG.zoom_image) {
      this.registerZoomImage();
    }
  };

  // Initializaiton
  Stun.utils.pjaxReloadBoot();
});
