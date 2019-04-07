const currentContent = document.querySelector('#content');

const tabs = document.querySelectorAll('.tabs > nav > a');
for (const tab of tabs) {
  tab.addEventListener('click', activeTab);
  if (tab.classList.contains('active')) {
    getRequest(tab.href);
  }
}

function getRequest(link) {

  const preloader = document.querySelector('#preloader');
  const request = new XMLHttpRequest();

  request.addEventListener("loadstart", onLoadStart);
  request.addEventListener('load', onLoad);
  request.addEventListener('error', onError);
  request.addEventListener("loadend", onLoadEnd);
  request.open('GET', link, true);
  request.send();

  function onLoadStart() {
    preloader.classList.remove('hidden');
    console.log('Загрузка началась');
  }

  function onLoadEnd() {
    preloader.classList.add('hidden');
    console.log('Загрузка завершилась');
  }

  function onLoad() {
    if (request.status === 200) {
      currentContent.innerHTML = request.responseText;
    }
    console.log(`Ответ ${request.status}, статус: ${request.statusText}`);
  }

  function onError() {
    console.log('Сработало событие error (сетевая ошибка, сервер не доступен)');
  }
}

function activeTab(event) {
  event.preventDefault();
  if (this.classList.contains('active')) {
    return;
  }

  const currentTabs = document.getElementsByClassName('active');
  Array.from(currentTabs).forEach(tab => {
    tab.classList.remove('active');
  });

  this.classList.add('active');
  getRequest(this.href);
}