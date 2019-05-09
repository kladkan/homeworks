'use strict';
/*
--pupil-x — смещение зрачка от центра по оси X;
--pupil-y — смещение зрачка от центра по оси Y;
--pupil-size — размер зрачка; Размер зрачка должен меняться в диапазоне от 1 до 3
*/
const maxSize = 3,
      minSize = 1;

let currentSizeX,
    currentSizeY;


const pupil = document.querySelector('.big-book__pupil');
//pupil.style.setProperty('--pupil-size', 2);
//pupil.style.setProperty('--pupil-x', '-30px');

document.addEventListener('mousemove', (event) => {
  currentSizeX = (Math.abs(document.body.clientWidth - pupil.getBoundingClientRect().x) - Math.abs(event.clientX - pupil.getBoundingClientRect().x)) /
    Math.abs(document.body.clientWidth - pupil.getBoundingClientRect().x) *
    (maxSize - minSize) + 1;

  currentSizeY = (Math.abs(document.body.clientHeight - pupil.getBoundingClientRect().y) - Math.abs(event.clientY - pupil.getBoundingClientRect().y)) /
    Math.abs(document.body.clientHeight - pupil.getBoundingClientRect().y) *
    (maxSize - minSize) + 1;

  pupil.style.setProperty('--pupil-size', (currentSizeX + currentSizeY) / 2);

  //console.log(event.clientX);
  //console.log(event.clientX);
});

/*
console.log(document.body.clientWidth);

console.log(pupil.getBoundingClientRect());

console.log(pupil.clientWidth);
console.log(pupil.offsetWidth);
console.log(pupil.getBoundingClientRect().width);
*/