'use strict';

let brushRadius = 5;

const canvas = document.getElementById('draw');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let curves = [];
let drawing = false;
let needsPaint = false;
let hue = 0;

function circle(point) {
  ctx.beginPath();
  ctx.arc(...point, brushRadius / 2, 0, 2 * Math.PI);

  ctx.fillStyle = `hsl(${hue},100%,25%)`;
  ctx.fill();
}

function smoothCurveBetween(p1, p2) {
  // Bezier control point
  const cp = p1.map((coord, idx) => (coord + p2[idx]) / 2);
  ctx.quadraticCurveTo(...p1, ...cp);
}

function smoothCurve(points) {
  ctx.beginPath();
  ctx.lineWidth = brushRadius;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';

  ctx.moveTo(...points[0]);

  for (let i = 1; i < points.length - 1; i++) {
    smoothCurveBetween(points[i], points[i + 1]);
  }
  
  ctx.strokeStyle = `hsl(${hue},100%,25%)`;
  ctx.stroke();
}

window.addEventListener('resize', (evt) => {
  canvasClear();
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

canvas.addEventListener('mousedown', (evt) => {
  drawing = true;
  const curve = [];
  
  curve.push([evt.offsetX, evt.offsetY]);
  curves.push(curve);
  needsPaint = true;
});

canvas.addEventListener('mouseup', (evt) => {
  drawing = false;
});

canvas.addEventListener('mouseleave', (evt) => {
  drawing = false;
});

canvas.addEventListener('dblclick', canvasClear);

canvas.addEventListener('mousemove', (evt) => {
  if (drawing) {
    const point = [evt.offsetX, evt.offsetY];
    curves[curves.length - 1].push(point);
    needsPaint = true;
  }
});

function canvasClear() {
  drawing = false;
  curves = [];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  needsPaint = false;
}

function paint() {
  curves
    .forEach((curve) => {
      circle(curve[0]);

      smoothCurve(curve);
    });
}

function tick() {
  if (needsPaint) {
    hue++;
    console.log(hue);
    paint();
    needsPaint = false;
  }
  window.requestAnimationFrame(tick);
}

tick();
