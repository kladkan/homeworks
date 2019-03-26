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
playstateButton.onclick = function () {
  const method = player.classList.contains('is-playing') ? 'pause' : 'play';
  player.classList.toggle('is-playing');
  playstateButton.classList.toggle('playstate');
  playstateButton.classList.toggle(method);
	console.log(playstateButton.classList.toggle(method));
  player[method]();
}
/*
const stopButton = document.getElementsByClassName('stop')[0];
stopButton.onclick = function () {
  playstateButton.classList.toggle('playstate');
  player.pause();
  player.currentTime = 0;
}
*/