'use strict';

let video = document.createElement('video');
let canvas = document.createElement('canvas'),
  ctx = canvas.getContext('2d'),
  shootBtn = document.getElementById('take-photo'),
  controls = document.querySelector('.controls'),
  errorMessage = document.getElementById('error-message'),
  list = document.querySelector('.list');

controls.style.display = 'flex';

document.querySelector('.app').appendChild(video);

navigator.mediaDevices.getUserMedia({ video: true, audio: false })
  .then((stream) => {
    video.srcObject = stream;
    video.onloadedmetadata = (e) => {
      video.play();
    };

    shootBtn.addEventListener('click', getPhoto);

  })
  .catch(err => {
    errorMessage.style.display = 'flex';
    errorMessage.textContent = `Ошибка доступка к камере: ${err.message}`;
    console.warn(`Ошибка доступка к камере: ${err.message}`)
  });

list.addEventListener('click', actions);

function actions(event) {
  if (event.target.classList.contains('material-icons')) {
    console.log(event.target.parentElement.parentElement.previousElementSibling.clientWidth);
    //const imgLink = event.target.parentElement.parentElement.firstElementChild.href;
    //let miniCanvas = document.createElement('canvas');
    canvas.width = event.target.parentElement.parentElement.previousElementSibling.clientWidth;
    canvas.height = event.target.parentElement.parentElement.previousElementSibling.clientHeight;
    ctx.drawImage(event.target.parentElement.parentElement.previousElementSibling, 0, 0);
    console.log(canvas);
    canvas.toBlob(blob => {
      const formData = new FormData();
      formData.append("image", blob);
      sendPhoto('https://neto-api.herokuapp.com/photo-booth', formData);
    })
  }
}

//------
function sendPhoto(url, formData) {

  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    body: formData
  })
    //.then(res => res.json())
    .then(res => {
      console.log(res); // по условию задачи сервер должен вернуться URL-адрес изображения
      return res;
    })
    .catch(error => console.log(error.message));
}






function getPhoto() {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0);
  const imageSrc = canvas.toDataURL();

  list.insertBefore(genPhotoCard(photoCard(imageSrc)), list.firstElementChild); // помещаем снимок в начало списка list

}

function genPhotoCard(block) { // генерируем блок с одним  снимком
  if ((block === undefined) || (block === null) || (block === false)) {
    return document.createTextNode('');
  }
  if ((typeof block === 'string') || (typeof block === 'number') || (block === true)) {
    return document.createTextNode(block);
  }
  if (Array.isArray(block)) {
    const fragment = document.createDocumentFragment();
    block.forEach(el => {
      fragment.appendChild(genPhotoCard(el));
    });
    return fragment;
  }
  const element = document.createElement(block.tag);

  const classes = Array.isArray(block.cls) ? block.cls : [block.cls];
  classes.forEach(cls => {
    if (!cls) return;
    element.classList.add(cls);
  });
  //element.classList.add(...[].concat(block.cls).filter(Boolean)); // альтернативный способ для классов
  if (block.attrs) {
    Object.keys(block.attrs).forEach(key => {
      element.setAttribute(key, block.attrs[key]);
    });
  }

  element.appendChild(genPhotoCard(block.content));

  return element;
}

function photoCard(imageSrc) {// передаем в функцию ссылку на текущий снимок
  return {
    tag: 'figure',
    content: [
      {
        tag: 'img',
        attrs: { src: imageSrc }
      },
      {
        tag: 'figcaption',
        content: [
          {
            tag: 'a',
            attrs: {
              href: imageSrc,
              download: 'snapshot.png'
            },
            content: [
              {
                tag: 'i',
                cls: 'material-icons',
                content: 'file_download'
              }
            ]
          },
          {
            tag: 'a',
            content: [
              {
                tag: 'i',
                cls: 'material-icons',
                content: 'file_upload'
              }
            ]
          },
          {
            tag: 'a',
            content: [
              {
                tag: 'i',
                cls: 'material-icons',
                content: 'delete'
              }
            ]
          }
        ]
      }
    ]
  }
}

/*
<figure>
  <img src="path/to/pic.png">
  <figcaption>
    <a href="path/to/pic.png" download="snapshot.png">
      <i class="material-icons">file_download</i>
    </a>
    <a><i class="material-icons">file_upload</i></a>
    <a><i class="material-icons">delete</i></a>
  </figcaption>
</figure>
*/