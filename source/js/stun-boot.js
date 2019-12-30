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
    this.addCopyButton();
    this.registerCopyEvent();

    CONFIG.reward && this.registerShowReward();
    CONFIG.lazyload && this.lazyLoadImage();
    CONFIG.gallery_waterfall && this.showImageToWaterfall();

    if (CONFIG.external_link) {
      var CONTAINER = '.archive, .post-header-title';

      this.addIconToExternalLink(CONTAINER);
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
