$(document).ready(function () {
  CONFIG.shortcuts.switch_post && Stun.utils.registerSwitchPost();
  CONFIG.reward && Stun.utils.registerShowReward();
  CONFIG.fancybox && Stun.utils.wrapImageWithFancyBox();
  CONFIG.back2top && Stun.utils.back2Top();
  CONFIG.gallery_waterfall && Stun.utils.galleryWaterFall();

  if (CONFIG.external_link) {
    var EXTERNAL_LINK_CONTAINER = '.content, #footer';
    Stun.utils.addIconToExternalLink(EXTERNAL_LINK_CONTAINER);
  }
});
