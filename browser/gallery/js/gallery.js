'use strict';
const resource = [
  'i/breuer-building.jpg',
  'i/guggenheim-museum.jpg',
  'i/headquarters.jpg',
  'i/IAC.jpg',
  'i/new-museum.jpg'
];

const galleryImg = document.getElementById('currentPhoto');

let next = 0;
function nextPhFunc() {
  if (next === resource.length) {
    next = 0;
    galleryImg.src = resource[next++];
  } else {
    galleryImg.src = resource[next++];
  };
  prev = next-2;
};
const nextPhoto = document.getElementById('nextPhoto');
nextPhoto.onclick = nextPhFunc;

let prev = 0;
function prevPhFunc() {
  if (prev < 0) {
    prev = resource.length - 1;
    galleryImg.src = resource[prev--];
  } else {
    galleryImg.src = resource[prev--];
  };
  next = prev + 2;
};
const prevPhoto = document.getElementById('prevPhoto');
prevPhoto.onclick = prevPhFunc;