$(document).ready(function () {
  CONFIG.shortcuts.switch_post && Stun.utils.registerSwitchPost();
  CONFIG.back2top && Stun.utils.back2Top();
  CONFIG.reward && Stun.utils.registerShowReward();
  CONFIG.fancybox && Stun.utils.wrapImageWithFancyBox();
  CONFIG.gallery_waterfall && Stun.utils.galleryWaterFall();

  if (CONFIG.external_link.icon) {
    var EXTERNAL_LINK_CONTAINER = '.content, #footer';
    Stun.utils.addIconToExternalLink(EXTERNAL_LINK_CONTAINER);
  }
});
