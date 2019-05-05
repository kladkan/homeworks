'use strict';

const url = {
  polling: 'https://neto-api.herokuapp.com/comet/pooling',
  longPolling: 'https://neto-api.herokuapp.com/comet/long-pooling',
  websocket: 'wss://neto-api.herokuapp.com/comet/websocket'
}

let xhrPolling = new XMLHttpRequest();

const pollingElements = document.querySelectorAll('.pooling div');

xhrPolling.addEventListener('load', getPoolingData);
xhrPolling.addEventListener('error', () => {
  console.log('Сработало событие error');
});

function getPoolingData() {
  if (xhrPolling.status !== 200) {
    console.log(`Ответ ${xhrPolling.status}: ${xhrPolling.statusText}`);
  } else {
    for (const pollingElement of pollingElements) {
      pollingElement.classList.remove('flip-it');
      if (Number(xhrPolling.responseText) === Number(pollingElement.textContent)) {
        pollingElement.classList.add('flip-it');
      }
    }
  }
};

setInterval(() => {
  xhrPolling.open('GET', url.polling, true);
  xhrPolling.send();
}, 5000);


