'use strict';
/*
--pupil-x — смещение зрачка от центра по оси X;
--pupil-y — смещение зрачка от центра по оси Y;
--pupil-size — размер зрачка; Размер зрачка должен меняться в диапазоне от 1 до 3
*/
const maxSize = 3,
  minSize = 1;

let currentSize,
  minDimention, // минимальное расстояние до края браузера от глаза
  dist; // расстояние от глаза до курсора

const pupil = document.querySelector('.big-book__pupil');
//pupil.style.setProperty('--pupil-size', 2);
//pupil.style.setProperty('--pupil-x', '-30px');

document.addEventListener('mousemove', (event) => {

  if (pupil.getBoundingClientRect().x > pupil.getBoundingClientRect().y) {
    minDimention = pupil.getBoundingClientRect().y;
  } else {
    minDimention = pupil.getBoundingClientRect().x;
  }

  dist = Math.sqrt(
    Math.pow((event.clientX - pupil.getBoundingClientRect().x), 2) +
    Math.pow((event.clientY - pupil.getBoundingClientRect().y), 2)
  )

  if (dist > minDimention) {
    currentSize = minSize;
  } else {
    currentSize = (minDimention - dist) / minDimention * (maxSize - minSize) + 1;
  }

  pupil.style.setProperty('--pupil-size', currentSize);

});

console.log(document.body.clientWidth);

console.log(pupil.getBoundingClientRect());

console.log(pupil.clientWidth);
console.log(pupil.offsetWidth);
console.log(pupil.getBoundingClientRect().width);

