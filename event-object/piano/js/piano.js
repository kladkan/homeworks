const lowerList = [
	'sounds/lower/first.mp3',
	'sounds/lower/second.mp3',
	'sounds/lower/third.mp3',
	'sounds/lower/fourth.mp3',
	'sounds/lower/fifth.mp3'
];

const middleList = [
	'sounds/middle/first.mp3',
	'sounds/middle/second.mp3',
	'sounds/middle/third.mp3',
	'sounds/middle/fourth.mp3',
	'sounds/middle/fifth.mp3'
]

const higherList = [
	'sounds/higher/first.mp3',
	'sounds/higher/second.mp3',
	'sounds/higher/third.mp3',
	'sounds/higher/fourth.mp3',
	'sounds/higher/fifth.mp3'
];

const piano = document.getElementsByClassName('set')[0];

const pianoKeys = Array.from(piano.getElementsByTagName('li'));

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

document.addEventListener('keydown', lowerMode);
function lowerMode(event) {
	if (event.shiftKey) {
    piano.classList.remove('middle');
		piano.classList.add('lower');
  };
  
  if (event.altKey) {
    piano.classList.remove('middle');
		piano.classList.add('higher');
  }
  
}

document.addEventListener('keyup', middleMode);
function middleMode(event) {
  if (!event.shiftKey) {
    piano.classList.remove('lower');
		piano.classList.add('middle');
  };
  if (!event.altKey) {
    piano.classList.remove('higher');
		piano.classList.add('middle');
  };
}
