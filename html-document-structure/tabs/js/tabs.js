'use strict'
const tabsContent = document.querySelector('.tabs-content');
console.log(tabsContent);

const articles = Array.from(tabsContent.children);
console.log(articles);

const tabsNavLi = document.querySelector('.tabs-nav > li');
console.log(tabsNavLi);

articles.forEach(article => {
  article.classList.add('hidden');
  const newLi = tabsNavLi.cloneNode(true);
  tabsNavLi.parentElement.insertBefore(newLi, tabsNavLi);
  console.log(newLi);
})

tabsContent.firstElementChild.classList.remove('hidden');





/*

let tabsNav = document.querySelector('.tabs-nav');
console.log(tabsNav);

articles.forEach(article => {

  //tabsNav.firstElementChild.classList.add(`${article.getAttribute('data-tab-icon')}`).textContent = article.getAttribute('data-tab-title');
  //tabsNav.textContent = article.getAttribute('data-tab-title');
  const newLi = tabsNav.firstElementChild.cloneNode(true);
  //document.querySelector('.tabs-nav').insertBefore(newLi, tabsNav);
  tabsNav.appendChild(newLi);
  console.log(newLi);
});

*/




/*
Метод parentElement.insertBefore(newNode,
referenceNode) добавляет newNode внутри parentElement ,
перед referenceNode .
Если referenceNode равен null ,то узел добавится последним, как и
в случае с appendChild .

*/

