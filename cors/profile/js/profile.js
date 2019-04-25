'use strict';

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

function showProfInfo(profInfo) {
  const dataName = document.querySelector('[data-name]');
  const dataDescription = document.querySelector('[data-description]');
  const dataPic = document.querySelector('[data-pic]');
  const dataPosition = document.querySelector('[data-position]');

  dataName.textContent = profInfo.name;
  dataDescription.textContent = profInfo.description;
  dataPic.src = profInfo.pic;
  dataPosition.textContent = profInfo.position;
  const id = profInfo.id;
  return id;
};

function showTech(technologies) {
  const dataTechnologies = document.querySelector('[data-technologies]');

  for (const technology of technologies) {
    dataTechnologies.innerHTML = dataTechnologies.innerHTML + `
    <span class="devicons devicons-${technology}"></span>
    `;
  };
  document.querySelector('.content').style.display = 'initial';
};

loadData('https://neto-api.herokuapp.com/profile/me')
  .then(showProfInfo)
  .then(res => {
    loadData(`https://neto-api.herokuapp.com/profile/${res}/technologies`)
      .then(showTech)
  })
  .catch(error => console.log(error));
