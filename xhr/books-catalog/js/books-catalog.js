const requestBooks = new XMLHttpRequest();

requestBooks.addEventListener('load', onLoad);
requestBooks.addEventListener('error', onError);

requestBooks.open('GET', 'https://neto-api.herokuapp.com/book/', true);
requestBooks.send();

function onLoad() {
  console.log('Сработало событие load');
  if (requestBooks.status === 200) {
    const books = JSON.parse(requestBooks.responseText);
    setData(books);
  }
  console.log(`Ответ ${requestBooks.status}, статус: ${requestBooks.statusText}`);
};

function onError() {
  console.log('Сработало событие error (сетевая ошибка, сервер не доступен)');
};

const booksContent = [];

function setData(books) {

  for (const book of books) {
    booksContent.push(`<li data-title="${book.title}" data-author="${book.author.name}" data-info="${book.info}" data-price="${book.price}"><img src="${book.cover.small}"></li>`);
  }
  document.getElementById('content').innerHTML = booksContent.join('');
};

