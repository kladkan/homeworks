'use strict';
const img = document.getElementById('slider');
const resource = [
  'i/airmax-jump.png',
  'i/airmax-on-foot.png',
  'i/airmax-playground.png',
  'i/airmax-top-view.png',
  'i/airmax.png'
];
img.src = resource[0];        
let i = 1;
setInterval(() => {
  if (i === resource.length) {
    i = 0;
    img.src = resource[i++];
  } else {
    img.src = resource[i++];
  }
}, 5000);