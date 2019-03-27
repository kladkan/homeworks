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
const mediaplayer = document.getElementsByClassName('mediaplayer')[0];
const playstateButton = document.getElementsByClassName('playstate')[0];

player.src = audioSrc[0];
function playPause() {
  title.title = getAudioFileName(player.src);
  const method = mediaplayer.classList.contains('play') ? 'pause' : 'play';
  mediaplayer.classList.toggle('play');
  player[method]();
}
playstateButton.onclick = playPause;

const stopButton = document.getElementsByClassName('stop')[0];
function stop() {
  if (mediaplayer.classList.contains('play')) {
    mediaplayer.classList.toggle('play');   
  }
  player.pause();
  player.currentTime = 0;
}
stopButton.onclick = stop;


let next = 0;
function nextAudio() {
  function nextSrc() {
    if (next + 1 === audioSrc.length) {
      next = -1;
    };
    player.src = audioSrc[++next];
    title.title = getAudioFileName(player.src);
    prev = next;
  }
  if (mediaplayer.classList.contains('play')) {
    stop();
    nextSrc();
    playPause();
  } else {
    nextSrc();
  }
};
const nextButton = document.getElementsByClassName('next')[0];
nextButton.onclick = nextAudio;

let prev = 0;
function prevAudio() {
  function prevSrc() {
	  if (prev - 1 < 0) {
      prev = audioSrc.length;
	  };
    player.src = audioSrc[--prev];
	  title.title = getAudioFileName(player.src);
	  next = prev;
  }
  if (mediaplayer.classList.contains('play')) {
    stop();
	  prevSrc();
	  playPause();
  } else {
	  prevSrc();
  }
};
const backButton = document.getElementsByClassName('back')[0];
backButton.onclick = prevAudio;

const title = document.getElementsByClassName('title')[0];

function getAudioFileName(link) {
  let fileName = link.split('/').pop();
  return fileName = fileName.split('%20').join(' ');
}