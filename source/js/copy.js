$(document).ready(function() {
  var $copyIcon = $(
    `<div class="copy-button">
      <i class="fa fa-clipboard"></i>
    </div>`);
  $('figure.highlight').append($copyIcon);

  $('.copy-button i').on('click', function() {
    if (copy(this)) {
      popAlert('success', '复制成功', 4);
    } else {
      popAlert('error', '复制失败');
    }
  });

  function copy(btn) {
    try {
      var $codeWrapper =
        $(btn).parent('.copy-button').siblings('table');
      var selection = window.getSelection();
      var range = document.createRange();
      
      // Select text by the content of node.
      range.selectNodeContents($codeWrapper[0]);
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
