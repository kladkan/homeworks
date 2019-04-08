const content = document.querySelector('#content');
const loader = document.querySelector('#loader');
const currencyRates = new XMLHttpRequest();
const source = document.querySelector('#source');
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
  for (const rate of rates) {
    fromList.innerHTML = fromList.innerHTML + `<option label="${rate.code}" value="${rate.value}"></option>`;
    toList.innerHTML = toList.innerHTML + `<option label="${rate.code}" value="${rate.value}"></option>`;
  }
  converter();
  fromList.addEventListener('input', converter);
  toList.addEventListener('input', converter);
  source.addEventListener('input', converter);
}

function converter() {
  const fromListOption = Array.from(fromList.querySelectorAll('option'));
  fromListOptionValue = fromListOption.find((element) => element.selected === true).value;

  const toListOption = Array.from(toList.querySelectorAll('option'));
  toListOptionValue = toListOption.find((element) => element.selected === true).value;

  culcResult = toListOptionValue / fromListOptionValue * source.value;
  result.innerHTML = parseFloat(culcResult.toFixed(2));
}