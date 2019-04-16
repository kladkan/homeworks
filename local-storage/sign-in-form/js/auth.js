'use strict';

const signInForm = document.querySelector('.sign-in-htm');
const signUnForm = document.querySelector('.sign-up-htm');
const signInFormData = new FormData(signInForm);

const loginWrap = document.querySelector('.login-wrap');
loginWrap.addEventListener('click', formsAction);

function formsAction(event) {
  //event.preventDefault();
  if (event.target.value === 'Войти') {
    const signInFormData = new FormData(signInForm); //вместо signInForm можно попробовать написать ролителя текущего тега
    const xhr = new XMLHttpRequest()
    xhr.addEventListener('load', (e) => {
      try {
        console.log('Всё круто');
        alert(xhr.response);
      } catch(error) {
        console.log('Какая-то ошибка');
        alert(error);
      }
      
    });
    xhr.open('POST', 'https://neto-api.herokuapp.com/signin');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(signInFormData));
  };
}


