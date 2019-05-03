'use strict';

const counter = document.querySelector('.counter'),
      errors = document.querySelector('output.errors'),
      connection = new WebSocket('wss://neto-api.herokuapp.com/counter');

connection.addEventListener('message', event => {
  const message = JSON.parse(event.data);
  counter.textContent = message.connections;
  errors.textContent = message.errors;
});

window.addEventListener('beforeunload', () => {
  //connection.onclose = function () { };
  connection.close(1000, 'Работа закончена');
});
