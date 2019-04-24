'use strict';
const content = document.querySelector('.content');
const profileinfo = content.querySelector('.profileinfo');

const dataName = profileinfo.querySelector('[data-name]');
const dataDescription = profileinfo.querySelector('[data-description]');
const dataPic = content.querySelector('[data-pic]');
const dataPosition = profileinfo.querySelector('[data-position]');
const dataTechnologies = content.querySelector('[data-technologies]');

function randName(max, min) {
  return `callback${Math.floor(Math.random() * (max - min)) + min}`;
}

function loadData(url) {
  const functionName = randName(10, 1000);
  return new Promise((done, fail) => {
    window[functionName] = done;

    //const script = document.scripts[0].cloneNode();
    const script = document.createElement('script');
    script.src = `${url}?jsonp=${functionName}`;
    document.body.appendChild(script);
  });
}

function showProfInfo(profInfo) {
  console.log(profInfo);
  dataName.textContent = profInfo.name;
  dataDescription.textContent = profInfo.description;
  dataPic.src = profInfo.pic;
  dataPosition.textContent = profInfo.position;
  const id = profInfo.id; // id тут = 90210 проверял
  return id;
}

function showTech(technologies) {
  console.log(technologies); // для проверки тут ожидаемый массив
  for (const technology of technologies) {
    dataTechnologies.innerHTML = dataTechnologies.innerHTML + `
    <span class="devicons devicons-${technology}"></span>
    `;
  }
  content.style = 'display: initial;'
}

loadData('https://neto-api.herokuapp.com/profile/me')
  .then(showProfInfo)
  .then(res => {
    loadData(`https://neto-api.herokuapp.com/profile/${res}/technologies`)
      .then(showTech)
  })
  .catch(error => console.log(error));
