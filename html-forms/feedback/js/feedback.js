'use strict'
const contentform = document.querySelector('.contentform');
contentform.addEventListener('submit', showMessage);
//console.log(contentform);

const sendButton = document.querySelector('.contentform > .button-contact');

const messageWindow = document.querySelector('#output');
//console.log(messageWindow);


const changeButton = document.querySelector('#output > .button-contact');
changeButton.addEventListener('click', changeForm);
//console.log(changeButton);

const zipField = document.querySelector('input[name="zip"]');
zipField.addEventListener('input', checkZip);
//console.log(zipField);


const textareaText = document.querySelector('textarea');
textareaText.addEventListener('input', checkFields);


function checkZip() {
  const regular = /^\d{6}$/;
  if (regular.test(zipField.value)) {
    sendButton.innerHTML = 'Отправить сообщение';
    return true;
  } else {
    sendButton.innerHTML = 'почтовый индекс должен состоять из 6 цифр без лишних символов';
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
    sendButton.innerHTML = 'Отправить сообщение';
    sendButton.disabled = false;
  } else {
    sendButton.disabled = true;
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
