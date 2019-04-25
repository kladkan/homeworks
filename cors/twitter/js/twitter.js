'use strict';

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

function showData(data) {
  const dataWallpaper = document.querySelector('.bio').firstElementChild;
  const dataUsername = document.querySelector('.desc').firstElementChild;
  const datadescription = document.querySelector('.desc').lastElementChild;
  const dataPic = document.querySelector('.avatarcontainer > .avatar');
  const contentData = document.querySelector('.content > .data');
  const dataTweets = contentData.querySelector('[data-tweets]');
  const dataFollowers = contentData.querySelector('[data-followers]');
  const dataFollowing = contentData.querySelector('[data-following]');
  
  dataWallpaper.src = data.wallpaper;
  dataUsername.textContent = data.username;
  datadescription.textContent = data.description;
  dataPic.src = data.pic;
  dataTweets.textContent = data.tweets;
  dataFollowers.textContent = data.followers;
  dataFollowing.textContent = data.following;
}

loadData('https://neto-api.herokuapp.com/twitter/jsonp')
  .then(showData)
  .catch(error => console.log(error));
