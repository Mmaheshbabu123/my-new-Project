let alertText = '';

/**
 * [alert description]
 * @param  {String} [alertType]               [success/error/info/warning]
 * @param  {String} [text]                    [description]
 * @param  {Number} [timeout]                  [description]
 * @return {[void]}                [description]
 */
export default function customAlert(alertType = '', text = '', timeout = 0) {
  alertText = text;
  showAlert(alertType)
  setTimeout(() => document.getElementById('custom-alert-div-id').remove(), timeout)
}


function showAlert(alertType) {
  let alertClass = ''
  switch (alertType) {
    case 'success':
     alertClass = 'alert-success';
    break;
    case 'error':
     alertClass = 'alert-danger';
    break;
    case 'warning':
     alertClass = 'alert-warning';
    break;
    case 'info':
     alertClass = 'alert-info';
    break;
    default:
      alertClass = 'd-none';
  }
  if(document) {
    appendHtml(alertClass);
  }
}

function appendHtml(alertClass) {
  const el = document.getElementById('__next')
  var div = document.createElement('div');
  div.style.cssText = 'position: relative;';
  div.innerHTML = `<div
      style="position:absolute; top:75px; z-index:2000; width:85%; text-align:center; margin-left:8%"
      class="alert ${alertClass}"
      role="alert"
      id="custom-alert-div-id"
    >
     <span class="fw-bold">${alertText}</span>
  </div>`;
  if (div.children.length > 0) {
    el.appendChild(div.children[0]);
  }
}
