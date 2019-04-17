'use strict';

const loginWrap = document.querySelector('.login-wrap');
loginWrap.addEventListener('click', formsAction);

function formsAction(event) {
  if (event.target.value === 'Войти') {
    event.preventDefault();
    const signInForm = document.querySelector('.sign-in-htm');
    const signInFormData = new FormData(signInForm);
    const signInFormDataObjForSend = {};
    signInFormData.forEach((value, key) => {signInFormDataObjForSend[key] = value});

    const xhrSignIn = new XMLHttpRequest()

    xhrSignIn.open('POST', 'https://neto-api.herokuapp.com/signin');
    xhrSignIn.setRequestHeader('Content-Type', 'application/json');
    xhrSignIn.send(JSON.stringify(signInFormDataObjForSend));

    xhrSignIn.addEventListener('load', (e) => {
      event.target.parentElement.nextElementSibling.textContent = JSON.parse(xhrSignIn.responseText).error ? JSON.parse(xhrSignIn.responseText).message : `Пользователь ${JSON.parse(xhrSignIn.responseText).name} успешно авторизован`;
    });
  };

  if (event.target.value === 'Зарегистрироваться') {
    event.preventDefault();
    const signUpForm = document.querySelector('.sign-up-htm');
    const signUpFormData = new FormData(signUpForm);
    const signUpFormDataObjForSend = {};
    signUpFormData.forEach((value, key) => {signUpFormDataObjForSend[key] = value});
    
    const xhrSignUp = new XMLHttpRequest()

    xhrSignUp.open('POST', 'https://neto-api.herokuapp.com/signup');
    xhrSignUp.setRequestHeader('Content-Type', 'application/json');
    xhrSignUp.send(JSON.stringify(signUpFormDataObjForSend));
    
    xhrSignUp.addEventListener('load', (e) => {
      event.target.parentElement.nextElementSibling.textContent = JSON.parse(xhrSignUp.responseText).error ? JSON.parse(xhrSignUp.responseText).message : `Пользователь ${JSON.parse(xhrSignUp.responseText).name} успешно зарегистрирован`;
    });
  };
}


