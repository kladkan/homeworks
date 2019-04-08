'use strict'
const contentform = document.querySelector('.contentform');
console.log(contentform);

const sendButton = document.querySelector('.contentform > .button-contact');
console.log(sendButton);

const messageWindow = document.querySelector('#output');
console.log(messageWindow);

const changeButton = document.querySelector('#output > .button-contact');
console.log(changeButton);

const zipField = document.querySelector('input[name="zip"]');
console.log(zipField);

zipField.addEventListener('input', checkNumber);

function checkNumber() {
  if (!typeof zipField.value === Number) {
    zipField.value = 'Только цифры!';
  }
}