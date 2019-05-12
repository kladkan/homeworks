'use strict';

let leftEye = document.querySelector('.cat_position_for_left_eye'), //глаз
  leftPupil = document.querySelector('.cat_eye_left'),// зрачок левого глаза
  dist;

// координаты левого глаза
const leftEyeX = leftEye.getBoundingClientRect().x,
  leftEyeY = leftEye.getBoundingClientRect().y;

const moveLeftEye = throttle((x, y) => {

  dist = Math.sqrt( // считаем текущее растояние от центра левого глаза до курсора
    Math.pow((x - leftEyeX), 2) +
    Math.pow((y - leftEyeY), 2)
  )

  leftPupil.style.left = (leftEye.offsetWidth / 2 - leftPupil.offsetWidth / 2) +
    (x - leftEyeX) / dist
    * (leftEye.offsetWidth / 2 - leftPupil.offsetWidth / 2) + 'px';

  leftPupil.style.top = (leftEye.offsetHeight / 2 - leftPupil.offsetHeight / 2) +
    (y - leftEyeY) / dist
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