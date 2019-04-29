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
const objects = [];
const fps = 20;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function rand(min, max) {
  return Math.random() * (max - min) + min;
};

function size() {
  return rand(1, 7) / 10;
}

function circle(x, y, i) {
  objects.push({
    circleX: x,
    circleY: y,
    circleSize: size(),
    circleTF: timeFunct[Math.floor(rand(0, 2))]
  });

  cross(rand(0, canvas.width), rand(0, canvas.height), i);
}

function cross(x, y, i) {
  objects[i].crossX = x;
  objects[i].crossY = y;
  objects[i].crossSize = size();
  objects[i].crossAngle = rand(0, 360) * Math.PI / 180;
  objects[i].crossSpeed = rand(-2, 3) / 10;
  objects[i].crossTF = timeFunct[Math.floor(rand(0, 2))];
}

for (let i = 0; i < count; i++) {
  circle(rand(0, canvas.width), rand(0, canvas.height), i);
}

function paintCircle(x, y, size, timeFunct) {
  let dx = timeFunct(x, y, Date.now()).x;
  let dy = timeFunct(x, y, Date.now()).y;

  ctx.lineWidth = 5 * size;
  ctx.strokeStyle = color;

  ctx.beginPath();
  ctx.arc(dx, dy, 12 * size, 0, 2 * Math.PI);
  ctx.stroke();
}

function paintCrosses(x, y, size, angle, speed, timeFunct, n) {
  let dx = timeFunct(x, y, Date.now()).x;
  let dy = timeFunct(x, y, Date.now()).y;
  let crossSize = 20 * size;

  ctx.save();

  ctx.lineWidth = 5 * size;
  ctx.strokeStyle = color;
  ctx.lineCap = 'square';
 
  ctx.translate(dx, dy); // центр креста
  ctx.beginPath();
  ctx.rotate(angle + speed);

  ctx.moveTo(0 - crossSize / 2, 0);
  ctx.lineTo(crossSize / 2, 0);
  ctx.stroke();

  ctx.moveTo(0, 0 - crossSize / 2);
  ctx.lineTo(0, crossSize / 2);
  ctx.stroke();

  ctx.restore();

  objects[n].crossAngle = angle + speed;
}

function paint() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let n = 0; n < objects.length; n++) {
    paintCircle(
      objects[n].circleX,
      objects[n].circleY,
      objects[n].circleSize,
      objects[n].circleTF
    );

    paintCrosses(
      objects[n].crossX,
      objects[n].crossY,
      objects[n].crossSize,
      objects[n].crossAngle,
      objects[n].crossSpeed,
      objects[n].crossTF,
      n
    );
  }
}

function tick() {
  setTimeout(function () {
    requestAnimationFrame(tick);
    paint();
  }, 1000 / fps);
}

tick();