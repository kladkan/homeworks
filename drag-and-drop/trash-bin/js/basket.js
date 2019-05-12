'use strict';

let muvedLogo = null;
let centerX = 0;
let centerY = 0;

document.addEventListener('mousedown', event => {
  if (event.target.classList.contains('logo')) {
    muvedLogo = event.target;
    const logo = event.target.getBoundingClientRect();
    centerX = logo.width / 2;
    centerY = logo.height / 2;
  }
});

document.addEventListener('mousemove', event => {
  if (muvedLogo) {
    event.preventDefault();// Предотвращаем выделение текста
    muvedLogo.style.left = event.pageX - centerX + 'px';
    muvedLogo.style.top = event.pageY - centerY + 'px';
    muvedLogo.classList.add('moving');
  }
});

document.addEventListener('mouseup', event => {
  if (muvedLogo) {
    muvedLogo.style.visibility = 'hidden';
    const trashBin = document
      .elementFromPoint(event.clientX, event.clientY)
      .closest('#trash_bin');
    if (trashBin) {
      muvedLogo.classList.remove('moving');
      muvedLogo.style.display = 'none';
      muvedLogo = null;
    }
  }
});
