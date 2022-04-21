export default function modalWindow(title, body, callback = null) {
  function closeModal(event) {
    event.preventDefault();
    event.stopPropagation();
    if (callback) {
      callback();
    }
    const div = document.querySelector('#modal-back');
    div.removeEventListener('click', div.clickHandler);
    const divW = document.querySelector('#modal-window');
    divW.removeEventListener('click', divW.clickHandler);
    const divC = document.querySelector('#modal-close');
    divC.removeEventListener('click', divC.clickHandler);
    document.body.removeChild(div);
  };

  const divBack = document.createElement('div');
  const divWindow = document.createElement('div');
  const divTitle = document.createElement('div');
  const divClose = document.createElement('div');
  const divHeader = document.createElement('div');
  const divBody = document.createElement('div');
  divBack.classList.add('modal-back');
  divBack.id = 'modal-back';
  divBack.clickHandler = closeModal;
  divBack.addEventListener('click', divBack.clickHandler);
  divWindow.classList.add('modal-window');
  divWindow.id = 'modal-window';
  divWindow.clickHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  divWindow.addEventListener('click', divWindow.clickHandler);
  divHeader.classList.add('flex');
  divHeader.classList.add('content-space-between');
  divTitle.classList.add('modal-title');
  divClose.classList.add('modal-close');
  divClose.id = 'modal-close';
  divClose.innerHTML = '&times;';
  divClose.clickHandler = closeModal;
  divClose.addEventListener('click', divClose.clickHandler);
  divBody.classList.add('modal-body');
  divTitle.innerHTML = title;
  divBody.innerHTML = body;
  divWindow.appendChild(divHeader);
  divHeader.appendChild(divTitle);
  divHeader.appendChild(divClose);
  divWindow.appendChild(divBody);
  divBack.appendChild(divWindow);
  document.body.appendChild(divBack);
}
