$(document).ready(function () {
  $('img').each(function (index, img) {
    if (img.src.includes('?size=')) {
      var size =
        img.src.split('?size=')[1] && img.src.split('?size=')[1].toLowerCase();
      var w = size.split('x')[0];
      var h = size.split('x')[1];

      $(img).css('width', w);
      $(img).css('height', h);
    }
  });

  $('.reward-button').click(function () {
    if ($('.reward-qr-wrapper').css('display') === 'block') {
      $('.reward-qr-wrapper').css('display', 'none');
    } else {
      $('.reward-qr-wrapper')
        .velocity('stop')
        .velocity('transition.slideDownBigIn', {
          duration: 300
        });
    }
  });

  $(document).on('keydown', function (e) {
    var ev = e || window.event;

    if (ev.keyCode === codeToKeyCode('ArrowLeft')) {
      // ArrowLeft <=> 37
      $('.article-prev')
        .find('a')[0]
        .click();
    } else if (ev.keyCode === codeToKeyCode('ArrowRight')) {
      // ArrowRight <=> 39
      $('.article-next')
        .find('a')[0]
        .click();
    }
  });
});
