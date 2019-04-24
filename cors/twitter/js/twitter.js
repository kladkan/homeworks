'use strict';
/*
function callback(data) {
  console.log(data);
}
*/
//======================================

function randName(max, min) {
  return `callback${Math.floor(Math.random() * (max - min)) + min}`;
}

function loadData(url) {
  const functionName = randName(100, 1000);
  return new Promise((done, fail) => {
    window[functionName] = done;

    const script = document.scripts[0].cloneNode();
    script.src = `${url}?jsonp=${functionName}`;
    document.body.appendChild(script);
  });
}

function showData(twitterUser) {
  console.log('Проверка');

  /*
  const target = document.querySelector('.book');
  target.innerHTML = `Книга ${book.title}, автор ${book.author.name}`;
  */
}

loadData('https://neto-api.herokuapp.com/twitter/jsonp')
  .then(showData)
  .catch(error => console.log(error));
  

