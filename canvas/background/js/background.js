'use strict';

const timeFunct = [
  function nextPoint(x, y, time) {
    return {
      x: x + Math.sin((50 + x + (time / 10)) / 100) * 3,
      y: y + Math.sin((45 + x + (time / 10)) / 100) * 4
    };
  },

  function nextPoint(x, y, time) {
    return {
      x: x + Math.sin((x + (time / 10)) / 100) * 5,
      y: y + Math.sin((10 + x + (time / 10)) / 100) * 2
    }
  }
];

const canvas = document.getElementById('wall');
const ctx = canvas.getContext('2d');
const color = 'white';
const count = rand(50, 201);
const circles = [];
const crosses = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function rand(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

function size() {
  return rand(1, 7) / 10;
}

function circle(x, y) {
  /*
  ctx.lineWidth = 5 * size();
  ctx.strokeStyle = color;

  ctx.beginPath();
  ctx.arc(x, y, 12 * size(), 0, 2 * Math.PI);
  ctx.stroke();
*/
  circles.push({
    baseX: x,
    baseY: y,
    size: size(),
    tF: timeFunct[rand(0, 2)]
  });
}

function cross() {
  ctx.save();

  ctx.lineWidth = 5 * size();
  ctx.strokeStyle = color;
  ctx.lineCap = 'square';

  let x = rand(0, canvas.width);
  let y = rand(0, canvas.height);
  let crossSize = 20 * size();

  ctx.translate(x, y); // центр креста
  ctx.beginPath();
  ctx.rotate(rand(0, 360) * Math.PI / 180);

  ctx.moveTo(0 - crossSize / 2, 0);
  ctx.lineTo(crossSize / 2, 0);
  ctx.stroke();

  ctx.moveTo(0, 0 - crossSize / 2); 
  ctx.lineTo(0, crossSize / 2);
  ctx.stroke();

  ctx.restore();
}

for (let i = 0; i < count; i++) {
  circle(rand(0, canvas.width), rand(0, canvas.height));
  cross();
}


function paintCircles(x, y, size, timeFunct) {
  //console.log(timeFunct);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let dx = timeFunct(x, y, Date.now()).x;
  let dy = timeFunct(x, y, Date.now()).y;

  ctx.lineWidth = 5 * size;
  ctx.strokeStyle = color;

  ctx.beginPath();
  ctx.arc(dx, dy, 12 * size, 0, 2 * Math.PI);
  ctx.stroke();

  setTimeout(function () {
    paintCircles(x, y, size, timeFunct)
  }, 50);

}

for (let circle of circles) {
  //setInterval(function () {
    paintCircles(circle.baseX, circle.baseY, circle.size, circle.tF);
  //}, 50);
}

