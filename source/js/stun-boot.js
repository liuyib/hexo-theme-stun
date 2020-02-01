$(document).ready(function () {
  var _CONFIG = window.CONFIG;
  var _Stun = window.Stun;

  _Stun.utils.showThemeInConsole();

  if (_CONFIG.shortcuts && _CONFIG.shortcuts.switch_post) {
    _Stun.utils.registerHotkeyToSwitchPost();
  }

  // Not reload this, because it's changeless.
  if (_CONFIG.external_link) {
    _Stun.utils.addIconToExternalLink('#footer');
  }

  _Stun.utils.pjaxReloadBoot = function () {
    if (_CONFIG.codeblock) {
      var codeStyle = _CONFIG.codeblock.style;
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
    if (_CONFIG.reward) {
      this.registerShowReward();
    }
    if (_CONFIG.lazyload) {
      this.lazyLoadImage();
    }
    if (_CONFIG.gallery_waterfall) {
      this.showImageToWaterfall();
    }
    if (_CONFIG.external_link) {
      var CONTAINER = '.archive, .post-header-title';
      this.addIconToExternalLink(CONTAINER);
    }
    if (_CONFIG.fancybox) {
      this.wrapImageWithFancyBox();
    } else if (_CONFIG.zoom_image) {
      this.registerClickToZoomImage();
    }
  };

  // Initializaiton
  _Stun.utils.pjaxReloadBoot();
});
