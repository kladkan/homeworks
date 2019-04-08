const content = document.querySelector('#content');
const loader = document.querySelector('#loader');
const currencyRates = new XMLHttpRequest();
const fromList = document.querySelector('#from');
const toList = document.querySelector('#to');
const result = document.querySelector('#result');

currencyRates.addEventListener("loadstart", onLoadStart);
currencyRates.addEventListener('load', onLoad);
currencyRates.addEventListener('error', onError);
currencyRates.addEventListener("loadend", onLoadEnd);
currencyRates.open('GET', 'https://neto-api.herokuapp.com/currency', true);
currencyRates.send();

function onLoadStart() {
  loader.classList.remove('hidden');
  console.log('Загрузка началась');
};

function onLoad() {
  console.log('Сработало событие load');
  if (currencyRates.status === 200) {
    const rates = JSON.parse(currencyRates.responseText);
    console.log(rates);
    setOptions(rates);
  }
  console.log(`Ответ ${currencyRates.status}, статус: ${currencyRates.statusText}`);
};

function onError() {
  console.log('Сработало событие error (сетевая ошибка, сервер не доступен)');
};

function onLoadEnd() {
  loader.classList.add('hidden');
  content.classList.remove('hidden');
  console.log('Загрузка завершилась');
};

function setOptions(rates) {
  const selectListOptions = [];
  for (const rate of rates) {
    selectListOptions.push(`<option label="${rate.code}" value="${rate.value}"></option>`);
  }
  fromList.innerHTML = selectListOptions.join('');
  toList.innerHTML = selectListOptions.join('');
}

