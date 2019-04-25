'use strict';

const baseUrl = 'https://neto-api.herokuapp.com/food';
const getUrl = url => `${baseUrl}${url}`;
const url = {
  recipe: getUrl('/42'),
  rating: getUrl('/42/rating'),
  consumers: getUrl('/42/consumers')
};

function randName(max, min) {
  return `callback${Math.floor(Math.random() * (max - min)) + min}`;
};

function loadData(url) {
  const functionName = randName(10, 1000);
  return new Promise((done, fail) => {
    window[functionName] = done;

    //const script = document.scripts[0].cloneNode();
    const script = document.createElement('script');
    script.src = `${url}?jsonp=${functionName}`;
    document.body.appendChild(script);
  });
};

function showData(data) {
  const food = document.querySelector('.food');
  const dataPic = food.querySelector('[data-pic]');
  const dataTitle = food.querySelector('[data-title]');
  const dataIngredients = food.querySelector('[data-ingredients]');
  const dataRating = food.querySelector('[data-rating]');
  const dataStar = food.querySelector('[data-star]');
  const dataVotes = food.querySelector('[data-votes]');
  const dataConsumers = food.querySelector('[data-consumers]');

  if (data.id) {
    dataPic.style.background = `url(${data.pic})`;
    dataTitle.textContent = data.title;
    dataIngredients.textContent = data.ingredients.join(', ');
  };

  if (data.rating) {
    dataRating.textContent = data.rating.toFixed(2);
    dataStar.style.width = `${dataRating.textContent * 100 / 10}%`;
    dataVotes.textContent = `(${data.votes} оценок)`;
  };

  if (data.consumers) {
    for (let consumer of data.consumers) {
      dataConsumers.innerHTML = dataConsumers.innerHTML + `
        <img src="${consumer.pic}" title="${consumer.name}"></img>
      `;
    };
    dataConsumers.appendChild(document.createElement('span'));
    dataConsumers.lastElementChild.textContent = `(+${data.total})`;
  };
};

for (let key in url) {
  loadData(url[key])
    .then(showData)
    .catch(error => console.log(error));
};

