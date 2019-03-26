// Список песен:
// 1. LA Chill Tour, 
// https://netology-code.github.io/hj-homeworks/html-element-collection/audioplayer/mp3/LA%20Chill%20Tour.mp3

// 2. This is it band, 
// https://netology-code.github.io/hj-homeworks/html-element-collection/audioplayer/mp3/This%20is%20it%20band.mp3

// 3. LA Fusion Jam,
// https://netology-code.github.io/hj-homeworks/html-element-collection/audioplayer/mp3/LA%20Fusion%20Jam.mp3

const audioSrc = [
	'https://netology-code.github.io/hj-homeworks/html-element-collection/audioplayer/mp3/LA%20Chill%20Tour.mp3',
	'https://netology-code.github.io/hj-homeworks/html-element-collection/audioplayer/mp3/This%20is%20it%20band.mp3',
	'https://netology-code.github.io/hj-homeworks/html-element-collection/audioplayer/mp3/LA%20Fusion%20Jam.mp3'
];

const player = document.getElementsByTagName('audio')[0];
const playstateButton = document.getElementsByClassName('playstate')[0];
const mediaplayer = document.getElementsByClassName('mediaplayer')[0];
playstateButton.onclick = function () {
  const method = player.classList.contains('is-playing') ? 'pause' : 'play';
  player.classList.toggle('is-playing');
  mediaplayer.classList.toggle('play');
  player[method]();

}

const stopButton = document.getElementsByClassName('stop')[0];
stopButton.onclick = function () {
  if (player.classList.contains('is-playing')) {
    player.classList.toggle('is-playing');
    mediaplayer.classList.toggle('play');   
  }
  player.pause();
  player.currentTime = 0;
}

let next = 0;
function nextAudio() {
  if (next === audioSrc.length) {
    next = 0;
    player.src = audioSrc[next++];
    //title.title = player.src;
  } else {
    player.src = audioSrc[next++];
  };
  prev = next-2;
};
const nextButton = document.getElementsByClassName('next')[0];
nextButton.onclick = nextAudio;

let prev = 0;
function prevAudio() {
  if (prev < 0) {
    prev = audioSrc.length - 1;
    player.src = audioSrc[prev--];
  } else {
    player.src = audioSrc[prev--];
  };
  next = prev + 2;
};
const backButton = document.getElementsByClassName('back')[0];
backButton.onclick = prevAudio;

const title = document.getElementsByClassName('title')[0];