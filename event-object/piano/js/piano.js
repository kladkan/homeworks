const lowerList = [
	'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/lower/first.mp3',
	'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/lower/second.mp3',
	'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/lower/third.mp3',
	'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/lower/fourth.mp3',
	'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/lower/fifth.mp3'
];

const middleList = [
	'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/middle/first.mp3',
	'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/middle/second.mp3',
	'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/middle/third.mp3',
	'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/middle/fourth.mp3',
	'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/middle/fifth.mp3'
]

const higherList = [
	'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/higher/first.mp3',
	'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/higher/second.mp3',
	'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/higher/third.mp3',
	'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/higher/fourth.mp3',
	'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/higher/fifth.mp3'
];

const pianoKeys = Array.from(document.getElementsByClassName('set')[0].getElementsByTagName('li'));
console.log(pianoKeys);

function player(event, i) {
	const keyAudio = event.currentTarget.getElementsByTagName('audio')[0];
	if (event.shiftKey) {
		keyAudio.src = lowerList[i];
	} else if (event.altKey) {
		keyAudio.src = higherList[i];
	} else {
		keyAudio.src = middleList[i];
	};
	keyAudio.play();
};

for (let i = 0; i < pianoKeys.length; i++) {
	pianoKeys[i].addEventListener('click', function () {
		player(event, i)
	});
}