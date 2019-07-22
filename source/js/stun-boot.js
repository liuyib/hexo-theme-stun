$(document).ready(function () {
  CONFIG.shortcuts.switch_post && Stun.utils.registerSwitchPost();
  CONFIG.back2top && Stun.utils.back2Top();
  CONFIG.reward && Stun.utils.registerShowReward();

  if (CONFIG.external_link.icon) {
    var EXTERNAL_LINK_CONTAINER =
      '.home-content, .main-content, .main-content-layout, #footer';
    Stun.utils.addIconToExternalLink(EXTERNAL_LINK_CONTAINER);
  }
});
