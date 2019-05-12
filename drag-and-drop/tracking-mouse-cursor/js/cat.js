'use strict';

let leftEye = document.querySelector('.cat_position_for_left_eye'), //левый глаз
  leftPupil = document.querySelector('.cat_eye_left'),// зрачок левого глаза
  distToLeftEye,// растояние от центра левого глаза до курсора
  rightEye = document.querySelector('.cat_position_for_right_eye'), //правый глаз
  rightPupil = document.querySelector('.cat_eye_right'),// зрачок правого глаза
  distToRightEye;// растояние от центра правого глаза до курсора

// координаты левого глаза
const leftEyeX = leftEye.getBoundingClientRect().x,
  leftEyeY = leftEye.getBoundingClientRect().y,

// координаты правого глаза
  rightEyeX = rightEye.getBoundingClientRect().x,
  rightEyeY = rightEye.getBoundingClientRect().y;

const movePupil = throttle((x, y) => {
  distToLeftEye = Math.sqrt( // считаем текущее растояние от центра левого глаза до курсора
    Math.pow((x - leftEyeX), 2) +
    Math.pow((y - leftEyeY), 2)
  );

  leftPupil.style.left = (leftEye.offsetWidth / 2 - leftPupil.offsetWidth / 2) +
    (x - leftEyeX) / distToLeftEye
    * (leftEye.offsetWidth / 2 - leftPupil.offsetWidth / 2) + 'px';

  leftPupil.style.top = (leftEye.offsetHeight / 2 - leftPupil.offsetHeight / 2) +
    (y - leftEyeY) / distToLeftEye
    * (leftEye.offsetHeight / 2 - leftPupil.offsetHeight / 2) + 'px';

  distToRightEye = Math.sqrt( // считаем текущее растояние от центра правого глаза до курсора
    Math.pow((x - rightEyeX), 2) +
    Math.pow((y - rightEyeY), 2)
  );

  rightPupil.style.left = (rightEye.offsetWidth / 2 - rightPupil.offsetWidth / 2) +
    (x - rightEyeX) / distToRightEye *
    (rightEye.offsetWidth / 2 - rightPupil.offsetWidth / 2) + 'px';

  rightPupil.style.top = (rightEye.offsetHeight / 2 - rightPupil.offsetHeight / 2) +
    (y - rightEyeY) / distToRightEye *
    (rightEye.offsetHeight / 2 - rightPupil.offsetHeight / 2) + 'px';
});

document.addEventListener('mousemove', event => movePupil(event.pageX, event.pageY));

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