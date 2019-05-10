'use strict';

if (navigator.mediaDevices === undefined) {
  navigator.mediaDevices = {};
}

if (navigator.mediaDevices.getUserMedia === undefined) {
  navigator.mediaDevices.getUserMedia = function (constraints) {
    var getUserMedia = navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;

    if (!getUserMedia) {
      return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
    }
    return new Promise((resolve, reject) => {
      getUserMedia.call(navigator, constraints, resolve, reject);
    });
  }
}

function createThumbnail(video) {
  return new Promise((done, fail) => {
    const preview = document.createElement('video');
    preview.src = URL.createObjectURL(video);
    preview.addEventListener('loadeddata', () => preview.currentTime = 2);
    preview.addEventListener('seeked', () => {
      const snapshot = document.createElement('canvas');
      const context = snapshot.getContext('2d');
      snapshot.width = preview.videoWidth;
      snapshot.height = preview.videoHeight;
      context.drawImage(preview, 0, 0);
      snapshot.toBlob(done);
    });
  });
}

function record(app) {
  console.log(app.config);
  return new Promise((done, fail) => {
    app.mode = 'preparing';
    navigator.mediaDevices.getUserMedia(app.config)
      .then((stream) => {
        app.preview.srcObject = stream;
        app.preview.onloadedmetadata = (e) => {
          app.preview.play();
        };
        app.mode = 'recording';

        app.preview.addEventListener('canplay', (event) => {
          setTimeout(() => {
            let recorder = new MediaRecorder(stream);
            let chunks = [];

            recorder.addEventListener('dataavailable',
              (e) => chunks.push(e.data)
            );

            recorder.addEventListener('stop', (e) => {
              const recorded = new Blob(chunks, { type: recorder.mimeType });
              chunks = null;
              recorder = stream = null;
              app.preview.srcObject = null;// отключаем предварительный просмотр с камеры
              stream.getTracks().forEach(track => track.stop());// выключаем камеру по инструкци см. задание

              const res = {};
              res.video = recorded;
              createThumbnail(recorded) // получаем кадр из видео (по заданию)
                .then(pict => {
                  res.frame = pict
                  done(res);
                });
            });

            recorder.start();
            setTimeout(() => {// запуск таймера до окончания времени заданного в app.limit
              recorder.stop();
            }, app.limit);

          }, 1000);
        });

      })
      .catch(err => {
        fail(err); //перевод промиса в статус rejected
        console.warn(`Ошибка: ${err.message}`)
      });
    /*
    setTimeout(() => {
      fail('Не удалось записать видео');
    }, app.limit);
    */
  });
}