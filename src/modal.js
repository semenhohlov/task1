function _createModal(options) {
  const $modal = document.createElement('div');
  $modal.classList.add('modal-back');
  $modal.dataset.close = 'true';
  const template = `
    <div class="modal-box">
      <div class="modal-header">
        <div class="modal-title">${options.title || 'Modal title'}</div>
        <div class="modal-close-btn" data-close="true">&times;</div>
      </div>
      <div class="modal-content">${options.content || 'Some content'}</div>
    </div>
  `;
  $modal.insertAdjacentHTML('beforeend', template);
  document.body.appendChild($modal);
  return $modal;
}

export default function modalWindow(options) {
  const $modal = _createModal(options);
  let isDestroed = false;
  const buttons = [];
  const closeHandler = (event) => {
    if (event.target.dataset.close === 'true') {
      close();
    }
  };
  $modal.addEventListener('click', closeHandler);
  const close = () => {
    $modal.classList.remove('show');
    $modal.removeEventListener('click', closeHandler);
    buttons.forEach(btn => {
      btn.button.removeEventListener('click', btn.clickHandler);
    });
    isDestroed = true;
    $modal.parentNode.removeChild($modal);
  }
  if (options.buttons && options.buttons.length) {
    const $modalBox = $modal.querySelector('.modal-box');
    const $footer = document.createElement('div');
    $footer.classList.add('modal-footer');
    options.buttons.forEach(btn => {
      const $btnTmp = document.createElement('button');
      $btnTmp.innerHTML = btn.title;
      $btnTmp.className = btn.className;
      const clickHandler = () => {
        btn.handle();
        close();
      }
      $btnTmp.addEventListener('click', clickHandler);
      buttons.push({
        button: $btnTmp,
        clickHandler
      });
      $footer.appendChild($btnTmp);
    });
    $modalBox.appendChild($footer);
  }

  return {
    open() {
      if (!isDestroed){
        $modal.classList.add('show');
      } else {
        console.log('Modal is destroed.');
      }
    },
    close
  };
}

function noop() {
  console.log('noop');
}
