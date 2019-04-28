'use strict';

const canvas = document.getElementById('draw');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let brushRadius = 100;
let curvePointsCoord = [];
let drawing = false;
let hue = 0;
let direction;

window.addEventListener('resize', (evt) => {
  canvasClear();
});

canvas.addEventListener('mousedown', (evt) => {
  drawing = true;
  circle(evt.offsetX, evt.offsetY);

});

canvas.addEventListener('mouseup', (evt) => {
  drawing = false;
  curvePointsCoord = [];
});

canvas.addEventListener('mouseleave', (evt) => {
  drawing = false;
});

canvas.addEventListener('dblclick', canvasClear);

canvas.addEventListener('mousemove', (evt) => {
  if (drawing) {
    curvePointsCoord.push([evt.offsetX, evt.offsetY]);

    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    if (curvePointsCoord.length === 3) {
      ctx.beginPath();
      brashSize();
      brashColor()
      paint(evt);

    } else if (curvePointsCoord.length === 4) {
      curvePointsCoord = curvePointsCoord.splice(2);
    }
  }
});

function circle(x, y) {
  curvePointsCoord.push([x, y]);
  ctx.beginPath();
  ctx.arc(x, y, brushRadius / 2, 0, 2 * Math.PI);
  ctx.fillStyle = `hsl(${hue},100%,50%)`;
  ctx.fill();
}

function paint(evt) {
  ctx.moveTo(...curvePointsCoord[0]);
  ctx.strokeStyle = `hsl(${hue},100%,50%)`;
  evt.shiftKey ? hue-- : hue++;
  ctx.quadraticCurveTo(...curvePointsCoord[1], ...curvePointsCoord[2]);
  ctx.stroke();
}

function brashColor() {
  if (hue === 360) {
    hue = 0;
  };
  if (hue === -1) {
    hue = 359
  };
}

function brashSize() {
  ctx.lineWidth = brushRadius;
  if (brushRadius === 100 || direction === 'minus') {
    brushRadius--;
    direction = 'minus';
  }

  if (brushRadius === 4 || direction === 'plus') {
    brushRadius++;
    direction = 'plus';
  }
}

function canvasClear() {
  drawing = false;
  curvePointsCoord = [];
  brushRadius = 100;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
