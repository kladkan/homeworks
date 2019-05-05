'use strict';

const websocketElements = document.querySelectorAll('.websocket div');

let connection = new WebSocket(url.websocket);
connection.addEventListener('open', () => {
  console.log('Вебсокет-соединение открыто');
});

connection.addEventListener('message', event => {
  console.log(event.data);
  for (const websocketElement of websocketElements) {
    websocketElement.classList.remove('flip-it');
    if (Number(xhrPolling.responseText) === Number(websocketElement.textContent)) {
      websocketElement.classList.add('flip-it');
    }
  }
});

connection.addEventListener('close', event => {
  console.log(event.code);
});