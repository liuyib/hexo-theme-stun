$(document).ready(function test () {
  var CODEBLOCK_CLASS_NAME = 'highlight';
  var $codeBlocks = $('figure.highlight');

  $codeBlocks.each(function test (index, item) {
    if (!$(item).find('figcaption')[0]) {
      var lang = item
        .getAttribute('class')
        .split(/\s/)
        .filter(e => e !== CODEBLOCK_CLASS_NAME);
      var codeHeader = $(`
        <figcaption class="custom">
          <span>${lang}</span>
        </figcaption>`)[0];

      item.insertBefore(codeHeader, $(item).children().first()[0]);
    }
  });

  var $copyIcon = $(`
    <div class="copy-button">
      <i class="fa fa-clipboard"></i>
    </div>`);

  $('figure.highlight figcaption').append($copyIcon);
  $('.copy-button').on('click', function () {
    var codeContainer =
      $(this).parent('figcaption').parent('figure').find('td.code')[0];

    if (Stun.utils.copyText(codeContainer)) {
      Stun.utils.popAlert('success', CONFIG.notification.copy_success);
    } else {
      Stun.utils.popAlert('error', CONFIG.notification.copy_error);
    }
  });
});
