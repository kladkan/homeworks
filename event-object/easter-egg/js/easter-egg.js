const secretNav = document.getElementsByTagName('nav')[0];

function showNav(event) {
  if (!event.ctrlKey) {
    return;
  }

  if (!event.altKey) {
    return;
  }

  if (event.code === 'KeyT') {
    secretNav.classList.toggle('visible');
  }
}

document.addEventListener('keydown', showNav);

const secretContent = document.getElementsByTagName('main')[0].getElementsByClassName('secret')[0];

document.addEventListener('keydown', showSecret);

const secretWord = [
  'KeyY',
  'KeyT',
  'KeyN',
  'KeyJ',
  'KeyK',
  'KeyJ',
  'KeyU',
  'KeyB',
  'KeyZ'
]

let secretWordLength = 0;

function showSecret(event) {
  console.log(event.code);
  if (event.code === secretWord[secretWordLength]) {
    ++secretWordLength;
  } else {
    secretWordLength = 0;
  };
  if (secretWordLength === secretWord.length) {
    secretContent.classList.add('visible');
  }
}

  