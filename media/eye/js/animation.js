'use strict';

const maxSize = 3,
  minSize = 1,
  maxOffset = 30, // максимальное смещение зрачка
  pupil = document.querySelector('.big-book__pupil');

let currentSize, // текущий размер зрачка
  minDimention, // минимальное расстояние до края браузера от глаза
  dist, // расстояние от глаза до курсора
  dX, // смещение от центра зрачка
  dY, // смещение от центра зрачка
  pupilX, // координата центра зрачка
  pupilY; // координата центра зрачка

function calcPupilProperties(event) {
  pupilX = pupil.getBoundingClientRect().x + pupil.getBoundingClientRect().width / 2;
  pupilY = pupil.getBoundingClientRect().y + pupil.getBoundingClientRect().height / 2;

  pupilX > pupilY ?
    minDimention = pupilY :
    minDimention = pupilX;

  dist = Math.sqrt( // считаем текущее растояние от зрачка до курсора
    Math.pow((event.clientX - pupilX), 2) +
    Math.pow((event.clientY - pupilY), 2)
  )

  dist > minDimention ? currentSize = minSize :
    currentSize = (minDimention - dist) / minDimention * (maxSize - minSize) + 1;

  pupil.style.setProperty('--pupil-size', currentSize);

  // расчет смещения зрачка
  dX = (event.clientX - pupilX) / dist * maxOffset;
  dY = (event.clientY - pupilY) / dist * maxOffset;
   
  if (dX > 0 ) {
    dX > maxOffset ? dX = maxOffset : dX = dX;
  } else if (dX < 0) {
    Math.abs(dX) > maxOffset ? dX = -maxOffset : dX = dX;
  }

  pupil.style.setProperty('--pupil-x', `${dX}px`); 

  if (dY > 0 ) {
    dY > maxOffset ? dY = maxOffset : dY = dY;
  } else if (dY < 0) {
    Math.abs(dY) > maxOffset ? dY = -maxOffset : dY = dY;
  }

  pupil.style.setProperty('--pupil-y', `${dY}px`); 
}

document.addEventListener('mousemove', calcPupilProperties);