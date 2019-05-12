'use strict';

let minDimention, // минимальное расстояние до края браузера от глаза
    leftEye = document.querySelector('.cat_position_for_left_eye'), //глаз
    leftPupil = document.querySelector('.cat_eye_left');// зрачок левого глаза

// координаты левого глаза
const leftEyeX = leftEye.getBoundingClientRect().x;
const leftEyeY = leftEye.getBoundingClientRect().y;

leftEyeX > leftEyeY ?
  minDimention = leftEyeY :
  minDimention = leftEyeX;

const moveLeftEye = throttle((x, y) => {

  leftPupil.style.left = (leftEye.offsetWidth / 2 - leftPupil.offsetWidth / 2) +
    (x - leftEyeX) / minDimention
    * (leftEye.offsetWidth / 2 - leftPupil.offsetWidth / 2) + 'px';
  
  leftPupil.style.top = (leftEye.offsetHeight / 2 - leftPupil.offsetHeight / 2) +
    (y - leftEyeY) / minDimention
    * (leftEye.offsetHeight / 2 - leftPupil.offsetHeight / 2) + 'px';

});

document.addEventListener('mousemove', event => moveLeftEye(event.pageX, event.pageY));

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