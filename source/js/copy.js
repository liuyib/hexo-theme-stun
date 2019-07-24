$(document).ready(function () {
  var CODEBLOCK_CLASS_NAME = 'highlight';
  var $codeBlocks = $('figure.highlight');

  $codeBlocks.each(function () {
    if (!$(this).find('figcaption')[0]) {
      var lang = this
        .getAttribute('class')
        .split(/\s/)
        .filter(function (e) { return e !== CODEBLOCK_CLASS_NAME; });
      var codeHeader = $(
        '<figcaption class="custom">' +
          '<span>' + lang + '</span>' +
        '</figcaption>'
      )[0];

      this.insertBefore(codeHeader, $(this).children().first()[0]);
    }
  });

  var $copyIcon = $(
    '<div class="copy-button">' +
      '<i class="fa fa-clipboard"></i>' +
    '</div>'
  );
  var COPY_BUTTON_WRAPPER =
    'figure.highlight figcaption, .post-footer-copyright';

  // Add a copy button to the selected elements.
  $(COPY_BUTTON_WRAPPER).append($copyIcon);
  $('.copy-button').on('click', function () {
    var container = null;
    var codeContainer =
      $(this).parent('figcaption').parent('figure').find('td.code')[0];

    if (codeContainer) { // Copy code.
      container = codeContainer;
    } else { // Copy text.
      container = $(this).parent()[0];
    }

    if (Stun.utils.copyText(container)) {
      Stun.utils.popAlert('success', CONFIG.notification.copy_success);
    } else {
      Stun.utils.popAlert('error', CONFIG.notification.copy_error);
    }
  });
});
