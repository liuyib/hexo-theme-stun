$(document).ready(function () {
  CONFIG.shortcuts.switch_post && Stun.utils.registerSwitchPost();
  CONFIG.back2top && Stun.utils.back2Top();
  CONFIG.reward && Stun.utils.registerShowReward();
  CONFIG.fancybox && CONFIG.utils.wrapImageWithFancyBox();

  if (CONFIG.external_link.icon) {
    var EXTERNAL_LINK_CONTAINER = '.content, #footer';
    Stun.utils.addIconToExternalLink(EXTERNAL_LINK_CONTAINER);
  }
});
