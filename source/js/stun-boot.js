$(document).ready(function () {
  CONFIG.shortcuts.switch_post && Stun.utils.registerHotkeyToSwitchPost();

  // Not reload this, because it's changeless.
  if (CONFIG.external_link) {
    Stun.utils.addIconToExternalLink('#footer');
  }

  Stun.utils.pjaxReloadBoot = function () {
    this.initTocDisplay();
    this.addCopyButtonToCopyright();
    this.registerCopyEvent();
    CONFIG.reward && this.registerShowReward();
    CONFIG.gallery_waterfall && this.showImageToWaterfall();
    CONFIG.lazyload && this.lazyLoadImage();

    if (CONFIG.external_link) {
      var WRAPPER = '.archive-inner, .post-title';

      this.addIconToExternalLink(WRAPPER);
    }

    if (CONFIG.fancybox) {
      this.wrapImageWithFancyBox();
    } else if (CONFIG.zoom_image) {
      this.registerClickToZoomImage();
    }
  };

  // Initializaiton
  Stun.utils.pjaxReloadBoot();
});
