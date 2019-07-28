$(document).ready(function () {
  CONFIG.shortcuts.switch_post && Stun.utils.registerSwitchPost();
  CONFIG.reward && Stun.utils.registerShowReward();
  CONFIG.back2top && Stun.utils.back2Top();
  CONFIG.gallery_waterfall && Stun.utils.galleryWaterFall();
  CONFIG.external_link && Stun.utils.addIconToExternalLink();

  if (CONFIG.fancybox) {
    Stun.utils.wrapImageWithFancyBox();
  } else if (CONFIG.zoom_image) {
    Stun.utils.registerClickToZoomImage();
  }
});
