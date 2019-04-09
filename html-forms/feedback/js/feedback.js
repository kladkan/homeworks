'use strict'
const contentform = document.querySelector('.contentform');
contentform.addEventListener('submit', showMessage);
//console.log(contentform);

const sendButton = document.querySelector('.contentform > .button-contact');
sendButton.classList.add('hidden');

//console.log(sendButton);

const messageWindow = document.querySelector('#output');
//console.log(messageWindow);


const changeButton = document.querySelector('#output > .button-contact');
changeButton.addEventListener('click', changeForm);
//console.log(changeButton);

const zipField = document.querySelector('input[name="zip"]');
//console.log(zipField);

const textareaText = document.querySelector('textarea');
textareaText.addEventListener('input', checkFields);

function checkZip() {
  const regular = /^\d{6}$/;
  if (regular.test(zipField.value)) {
    return true;
  }
}

const inputFields = document.querySelectorAll('input');
for (const inputField of inputFields) {
  inputField.addEventListener('input', checkFields);
}
function checkFields(event) {
  if (document.getElementById(`${event.currentTarget.name}`)) {
    document.getElementById(`${event.currentTarget.name}`).innerHTML = event.currentTarget.value;
  };
  const checkInputFields = Array.from(inputFields).filter(field => field.value === '');
  if (checkInputFields.length === 0 && checkZip() === true && textareaText.value !== '') {
    sendButton.classList.remove('hidden');
    sendButton.disabled = false;
  } else {
    sendButton.classList.add('hidden');
  }
}

function showMessage(event) {
  event.preventDefault();
  messageWindow.classList.remove('hidden');
  contentform.classList.add('hidden');
}

function changeForm() {
  messageWindow.classList.add('hidden');
  contentform.classList.remove('hidden');
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