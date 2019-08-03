$(document).ready(function () {
  CONFIG.shortcuts.switch_post && Stun.utils.registerSwitchPost();
  CONFIG.reward && Stun.utils.registerShowReward();
  CONFIG.back2top && Stun.utils.back2top();
  CONFIG.gallery_waterfall && Stun.utils.galleryWaterFall();
  CONFIG.lazyload && Stun.utils.lazyLoadImages();

  if (CONFIG.external_link) {
    var WRAPPER = '.archive-inner, .post-title, #footer';

    Stun.utils.addIconToExternalLink(WRAPPER);
  }

  if (CONFIG.fancybox) {
    Stun.utils.wrapImageWithFancyBox();
  } else if (CONFIG.zoom_image) {
    Stun.utils.registerClickToZoomImage();
  }
});
