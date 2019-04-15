'use strict';

const wrap = document.querySelector('.wrap');
const counter = wrap.querySelector('#counter')
wrap.addEventListener('click', buttAction);
if (localStorage.counterValue === undefined) {
  localStorage.counterValue = 0;
};
counter.textContent = localStorage.counterValue;

function buttAction(event) {
  switch (event.target.id) {
    case 'increment':
      counter.textContent = ++counter.textContent;
      break;
    case 'decrement':
      if (counter.textContent > 0) {
        counter.textContent = --counter.textContent;
      };
      break;
    case 'reset':
      counter.textContent = 0;
      break;

    default:
      break;
  }

  localStorage.counterValue = counter.textContent;
}
