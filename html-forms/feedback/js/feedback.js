'use strict'
const contentform = document.querySelector('.contentform');
//console.log(contentform);

const sendButton = document.querySelector('.contentform > .button-contact');
sendButton.classList.add('hidden');
//console.log(sendButton);

const messageWindow = document.querySelector('#output');
//console.log(messageWindow);

const changeButton = document.querySelector('#output > .button-contact');
//console.log(changeButton);

const zipField = document.querySelector('input[name="zip"]');
//console.log(zipField);

//zipField.addEventListener('keyup', checkZip);
function checkZip() {
  const regular = /^\d{6}$/;
  if (regular.test(zipField.value)) {
    console.log(`индекс ${zipField.value} правильный`);
    return true;
  }
}

const inputFields = document.querySelectorAll('input');
console.log(inputFields);
for (const inputField of inputFields) {
  inputField.addEventListener('input', checkFields);
}
function checkFields() {
  const checkInputFields = Array.from(inputFields).filter(field => field.value === '');
  if (checkInputFields.length === 0 && checkZip() === true) {
    sendButton.classList.remove('hidden');
  } else {
    sendButton.classList.add('hidden');
  }
}




/*
const formFields = document.querySelectorAll('.form-group');
console.log(formFields);

for (const formField of formFields) {
  formField.addEventListener('input', checkFields);
}

function checkFields(event) {
  const inputText = event.currentTarget.querySelector('input');
  if (inputText) {
    checkField(inputText);
  }
  const textareaText = event.currentTarget.querySelector('textarea');
  if (textareaText) {
    checkField(textareaText);
  }

  function checkField(fieldText) {
    if (fieldText.value) {
      console.log('значение поля не пустое');
      spanMarker();
    } else {
      console.log('значение поля пустое');
      spanMarker('*');
    }
  }

  function spanMarker(marker = '') {
    event.currentTarget.querySelector('span').innerHTML = `${marker}`;
  }
}

*/