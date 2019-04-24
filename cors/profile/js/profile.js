'use strict';
const content = document.querySelector('.content');
const profileinfo = content.querySelector('.profileinfo');

const dataName = profileinfo.querySelector('[data-name]');
const dataDescription = profileinfo.querySelector('[data-description]');
const dataPic = content.querySelector('[data-pic]');
const dataPosition = profileinfo.querySelector('[data-position]');

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
let id;
function showProfInfo(profInfo) {
  console.log(profInfo);
  dataName.textContent = profInfo.name;
  dataDescription.textContent = profInfo.description;
  dataPic.src = profInfo.pic;
  dataPosition.textContent = profInfo.position;
  id = profInfo.id
}

function showTech(technologies) {
  console.log(technologies);
}

loadData('https://neto-api.herokuapp.com/profile/me')
  .then(showProfInfo)
  .catch(error => console.log(error));

console.log(id);
loadData(`https://neto-api.herokuapp.com/profile/${id}/technologies`)
  .then(showTech)
  .catch(error => console.log(error));
