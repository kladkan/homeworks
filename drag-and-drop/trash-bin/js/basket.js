'use strict';

let muvedLogo = null;
let centerX = 0;
let centerY = 0;

const dragStart = event => {
  if (event.target.classList.contains('logo')) {
    muvedLogo = event.target;
    const logo = event.target.getBoundingClientRect();
    // находим смещение от начала координат иконки до ее середины
    centerX = logo.width / 2;
    centerY = logo.height / 2;
  }
};

const drag = throttle((x, y) => {
  if (muvedLogo) {
    event.preventDefault();// Предотвращаем выделение текста

    muvedLogo.style.left = x - centerX + 'px';
    muvedLogo.style.top = y - centerY + 'px';
    muvedLogo.classList.add('moving');
  }
});

const drop = event => {
  if (muvedLogo) {
    muvedLogo.style.visibility = 'hidden';
    const trashBin = document
      .elementFromPoint(event.clientX, event.clientY)
      .closest('#trash_bin');
    if (trashBin) {
      muvedLogo.classList.remove('moving');
      muvedLogo.style.display = 'none';
      muvedLogo = null;
    };
  };
};

//для десктопов
document.addEventListener('mousedown', dragStart);
document.addEventListener('mousemove', event => drag(event.pageX, event.pageY));
document.addEventListener('mouseup', drop);

//для сенсорных экранов
document.addEventListener('touchstart', event => dragStart(event.touches[0]));
document.addEventListener('touchmove', event => drag(event.touches[0].pageX, event.touches[0].pageY));
document.addEventListener('touchend', event => drop(event.changedTouches[0]));

function throttle(callback) {
  let isWaiting = false;
  return function () {
    if (!isWaiting) {
      callback.apply(this, arguments);
      isWaiting = true;
      requestAnimationFrame(() => {
        isWaiting = false;
      });
    };
  };
};