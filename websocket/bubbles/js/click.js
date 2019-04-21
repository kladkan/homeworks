'use strict';

const connection = new WebSocket('wss://neto-api.herokuapp.com/mouse');
document.addEventListener('click', addClickCoord);

function addClickCoord(event) {
  connection.send(JSON.stringify({
    x: event.clientX,
    y: event.clientY
  }));
}

showBubbles(connection);