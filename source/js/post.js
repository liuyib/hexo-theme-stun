(function () {
  'use strict';
  
domready(function () {
  var rewardBtn = document.querySelector('.reward-button');
  var rewardQr = document.querySelector('.reward-qr');

  rewardBtn.onclick = function () {
    rewardQr.classList.toggle('qr-show');
    rewardQr.classList.toggle('qr-hide');
  };
});
})();
  