'use strict';

const ws = new WebSocket('wss://neto-api.herokuapp.com/draw');

editor.addEventListener('update', event => {
  event.canvas.toBlob(blob => {
    ws.send(blob);
  });
});
