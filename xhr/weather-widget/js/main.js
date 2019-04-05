const request = new XMLHttpRequest();

request.addEventListener('load', onLoad);
request.addEventListener('error', onError);

request.open('GET', 'https://neto-api.herokuapp.com/weather', true);
request.send();

function onLoad() {
  console.log('Сработало событие load');
  if (request.status === 200) {
    const response = JSON.parse(request.responseText);
    setData(response);
  }
  console.log(`Ответ ${request.status}, статус: ${request.statusText}`);
}

function onError() {
  console.log('Сработало событие error (сетевая ошибка, сервер не доступен)');
}
