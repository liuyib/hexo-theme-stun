$(document).ready(function () {
  CONFIG.shortcuts.switch_post && Stun.utils.registerSwitchPost();

  // Not reload this, because it's changeless.
  if (CONFIG.external_link) {
    Stun.utils.addIconToExternalLink('#footer');
  }

  Stun.utils.addCopyButtonToCopyright();
  Stun.utils.registerCopyEvent();
  CONFIG.reward && Stun.utils.registerShowReward();
  CONFIG.gallery_waterfall && Stun.utils.galleryWaterFall();
  CONFIG.lazyload && Stun.utils.lazyLoadImages();

  if (CONFIG.external_link) {
    var WRAPPER = '.archive-inner, .post-title';

    Stun.utils.addIconToExternalLink(WRAPPER);
  }

  if (CONFIG.fancybox) {
    Stun.utils.wrapImageWithFancyBox();
  } else if (CONFIG.zoom_image) {
    Stun.utils.registerClickToZoomImage();
  }
});
