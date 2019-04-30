'use strict';

const starColor = [
  '#ffffff',
  '#ffe9c4',
  '#d4fbff'
];

const canvas = document.getElementsByTagName('canvas')[0];
const ctx = canvas.getContext('2d');

function rand(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

document.getElementsByTagName('body')[0].addEventListener('click', getStar);

getStar();

function getStar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i <= rand(200, 401); i++) {
    ctx.beginPath();
    ctx.globalAlpha = rand(8, 11) / 10;
    ctx.arc(rand(0, canvas.width), rand(0, canvas.height), rand(0, 12) / 10, 0, 2 * Math.PI);
    ctx.fillStyle = `${starColor[rand(0, starColor.length)]}`;
    ctx.fill();
  }
}
