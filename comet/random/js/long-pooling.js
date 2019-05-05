'use strict';

const longPollingElements = document.querySelectorAll('.long-pooling div');

function getLongPollingData(url) {
  let xhrLongPolling = new XMLHttpRequest();
  xhrLongPolling.open('GET', url, true);
  xhrLongPolling.addEventListener('error', () => {
    console.log('Сработало событие error');
  });
  xhrLongPolling.addEventListener('load', getData);
  
  function getData() {
    let data = xhrLongPolling.responseText.trim();

    for (const longPollingElement of longPollingElements) {
      longPollingElement.classList.remove('flip-it');
      if (Number(data) === Number(longPollingElement.textContent)) {
        longPollingElement.classList.add('flip-it');
      }
    }
    getLongPollingData(url);
  }

  xhrLongPolling.send();
};

getLongPollingData(url.longPolling);