'use strict';

let video = document.createElement('video');
const canvas = document.createElement('canvas'),
  ctx = canvas.getContext('2d'),
  shootBtn = document.getElementById('take-photo'),
  controls = document.querySelector('.controls'),
  errorMessage = document.getElementById('error-message');

let image = document.createElement('img');

controls.style.display = 'flex';

document.querySelector('.app').appendChild(video);

navigator.mediaDevices.getUserMedia({ video: true, audio: false })
  .then((stream) => {
    video.srcObject = stream;
    video.onloadedmetadata = (e) => {
      video.play();
    };

    shootBtn.addEventListener('click', (event) => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0);
      image.src = canvas.toDataURL();
      video.display = 'none';
      stream.getVideoTracks().map(track => track.stop());
    })
  })
  .catch(err => {
    errorMessage.style.display = 'flex';
    errorMessage.textContent = `Ошибка доступка к камере: ${err.message}`;
    console.warn(`Ошибка доступка к камере: ${err.message}`)
  });


