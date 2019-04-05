const request = new XMLHttpRequest();

request.addEventListener("load", onLoad); // проверка загрузился ли запрос

request.open('GET', 'https://neto-api.herokuapp.com/weather', true);
request.send();

function onLoad() {

  if (request.status === 200) {
    const response = JSON.parse(request.responseText);
    setData(response);
  }
}
