'use strict';

const signInForm = document.querySelector('.sign-in-htm');
const signUpForm = document.querySelector('.sign-up-htm');

const loginWrap = document.querySelector('.login-wrap');
loginWrap.addEventListener('click', formsAction);

function formsAction(event) {
  if (event.target.value === 'Войти') {
    const signInFormData = new FormData(signInForm);
    const xhrSignIn = new XMLHttpRequest()

    xhrSignIn.open('POST', 'https://neto-api.herokuapp.com/signin');
    xhrSignIn.setRequestHeader('Content-Type', 'application/json');
    xhrSignIn.send(JSON.stringify(signInFormData));

    xhrSignIn.addEventListener('load', (e) => {
      console.log(xhrSignIn);
      event.target.parentElement.nextElementSibling.textContent = JSON.parse(xhrSignIn.responseText).error ? JSON.parse(xhrSignIn.responseText).message : 'Пользователь Иван успешно авторизован';
    });
  };

  if (event.target.value === 'Зарегистрироваться') {
    event.preventDefault();
    const signUpFormData = new FormData(signUpForm);
    const xhrSignUp = new XMLHttpRequest()

    xhrSignUp.open('POST', 'https://neto-api.herokuapp.com/signup');
    xhrSignUp.setRequestHeader('Content-Type', 'application/json');
    xhrSignUp.send(JSON.stringify(signUpFormData));

    xhrSignUp.addEventListener('load', (e) => {
      event.target.parentElement.nextElementSibling.textContent = JSON.parse(xhrSignUp.responseText).error ? JSON.parse(xhrSignUp.responseText).message : `Пользователь ${JSON.parse(xhrSignUp.responseText).name} успешно зарегистрирован`;
    });
  };

}


