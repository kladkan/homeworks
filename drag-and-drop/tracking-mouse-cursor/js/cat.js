'use strict';

let leftEye = document.querySelector('.cat_position_for_left_eye'), //левый глаз
  leftPupil = document.querySelector('.cat_eye_left'),// зрачок левого глаза
  distToLeftEye,// растояние от центра левого глаза до курсора

  rightEye = document.querySelector('.cat_position_for_right_eye'), //правый глаз
  rightPupil = document.querySelector('.cat_eye_right'),// зрачок правого глаза
  distToRightEye;// растояние от центра правого глаза до курсора


const eyeRadius = leftEye.getBoundingClientRect().width / 2,// радиус глаза
  pupilRadius = leftPupil.getBoundingClientRect().width / 2,// радиус зрачка
  radius = eyeRadius - pupilRadius,// максимальное смещение зрачка от центра глаза

  // координаты центра левого глаза
  leftEyeX = leftEye.getBoundingClientRect().x + eyeRadius,
  leftEyeY = leftEye.getBoundingClientRect().y + eyeRadius,

  // координаты правого глаза
  rightEyeX = rightEye.getBoundingClientRect().x + eyeRadius, // крорректировать
  rightEyeY = rightEye.getBoundingClientRect().y + eyeRadius;

const movePupil = throttle((x, y) => {// x и y - текущие координаты корсора относительно экрана
  distToLeftEye = Math.sqrt( // считаем текущее растояние от центра левого глаза до курсора
    Math.pow((x - leftEyeX), 2) +
    Math.pow((y - leftEyeY), 2)
  );

  leftPupil.style.left = (eyeRadius - pupilRadius) +
    (x - leftEyeX) / distToLeftEye
    * radius + 'px';
 
  leftPupil.style.top = (eyeRadius - pupilRadius) +
    (y - leftEyeY) / distToLeftEye
    * radius + 'px';

    distToRightEye = Math.sqrt( // считаем текущее растояние от центра правого глаза до курсора
    Math.pow((x - rightEyeX), 2) +
    Math.pow((y - rightEyeY), 2)
  );

  rightPupil.style.left = (eyeRadius - pupilRadius) +
    (x - rightEyeX) / distToRightEye *
    radius + 'px';

  rightPupil.style.top = (eyeRadius - pupilRadius) +
    (y - rightEyeY) / distToRightEye *
    radius + 'px';
});

document.addEventListener('mousemove', event => movePupil(event.clientX, event.clientY));

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