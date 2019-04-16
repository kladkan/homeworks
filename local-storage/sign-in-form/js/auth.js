'use strict';

const signInForm = document.querySelector('.sign-in-htm');
const signUnForm = document.querySelector('.sign-up-htm');
const signInFormData = new FormData(signInForm);

const loginWrap = document.querySelector('.login-wrap');
loginWrap.addEventListener('click', formsAction);

function formsAction(event) {
  if (event.target.value === 'Войти') {
    const signInFormData = new FormData(signInForm);
    const xhr = new XMLHttpRequest()

    xhr.addEventListener('load', (e) => {
      console.log(xhr.responseText);
      event.target.parentElement.nextElementSibling.textContent = 'Пользователь Иван успешно авторизован';
    });
    xhr.addEventListener('error', (e) => {
      console.log(xhr.responseText);
    });
    xhr.open('POST', 'https://neto-api.herokuapp.com/signin');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(signInFormData));
  };
}


