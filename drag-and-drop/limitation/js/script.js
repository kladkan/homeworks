'use strict';

const textArea = document.querySelector('.textarea'),
      block = document.querySelector('.block'),
      message = document.querySelector('.message');

textArea.addEventListener('focus', (event) => {
  block.classList.add('active');
});

textArea.addEventListener('blur', (event) => {
  block.classList.remove('active');
  message.classList.remove('view');
});

textArea.addEventListener('keyup', debounce(() => {
  message.classList.add('view');
  block.classList.remove('active');
}, 2000));

textArea.addEventListener('keydown', (event) => {
  message.classList.remove('view');
  block.classList.add('active');
});

function debounce(callback, delay) {
  let timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      timeout = null;
      callback();
    }, delay);
  };
};
