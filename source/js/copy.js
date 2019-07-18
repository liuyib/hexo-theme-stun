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

      item.insertBefore(codeHeader, $(item).find('table')[0]);
    }
  });

  var $copyIcon = $(`
    <div class="copy-button">
      <i class="fa fa-clipboard"></i>
    </div>`);

  $('figure.highlight figcaption').append($copyIcon);
  $('.copy-button').on('click', function () {
    var codeContainer = $(this)
      .parent('figcaption')
      .siblings('table')
      .find('td.code')[0];

    if (copy(codeContainer)) {
      popAlert('success', '复制成功', 4);
    } else {
      popAlert('error', '复制失败');
    }
  });

  /**
   * Copy code
   * @param {HTMLElement} container Container of code.
   */
  function copy (container) {
    try {
      var selection = window.getSelection();
      var range = document.createRange();

      // Select text by the content of node.
      range.selectNodeContents(container);
      selection.removeAllRanges();
      selection.addRange(range);

      var text = selection.toString();
      var input = document.createElement('input');

      // Create a temporary input to make the
      // execCommand command take effect.
      input.style.display = 'none';
      input.setAttribute('readonly', 'readonly');
      input.setAttribute('value', text);
      document.body.appendChild(input);
      input.setSelectionRange(0, -1);

      if (document.execCommand('copy')) {
        document.execCommand('copy');
        document.body.removeChild(input);

        return true;
      }
      document.body.removeChild(input);
    } catch (e) {
      return false;
    }
  }
});
