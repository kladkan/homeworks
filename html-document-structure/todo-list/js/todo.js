'use strict'
const undoneBlock = document.querySelector('.undone');
const doneBlock = document.querySelector('.done');
const lebelElements = document.getElementsByTagName('label');
for (const lebelElement of lebelElements) {
  lebelElement.addEventListener('click', checkOperation);
}

function checkOperation(event) {
  if (event.target.parentElement.classList.contains('done')) {
    console.log('перенесли в невыполненные');
    undoneBlock.appendChild(event.target);
    undoneBlock.lastElementChild.firstElementChild.removeAttribute('checked');
    return;
  };
  if (event.target.parentElement.classList.contains('undone')) {
    console.log('перенесли в выполненные');
    doneBlock.appendChild(event.target);
    doneBlock.lastElementChild.firstElementChild.setAttribute('checked', 'checked');
  }
}
