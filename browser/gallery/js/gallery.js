'use strict';
const resource = [
  'i/breuer-building.jpg',
  'i/guggenheim-museum.jpg',
  'i/headquarters.jpg',
  'i/IAC.jpg',
  'i/new-museum.jpg'
];

const galleryImg = document.getElementById('currentPhoto');
galleryImg.src = resource[0];
let next = 0;
function nextPhFunc() {
  if (next + 1 === resource.length) {
    next = -1;
  }
  galleryImg.src = resource[++next];
  prev = next;
};
const nextPhoto = document.getElementById('nextPhoto');
nextPhoto.onclick = nextPhFunc;

let prev = 0;
function prevPhFunc() {
  if (prev - 1 < 0) {
    prev = resource.length;
  }
  galleryImg.src = resource[--prev];
  next = prev;
};
const prevPhoto = document.getElementById('prevPhoto');
prevPhoto.onclick = prevPhFunc;