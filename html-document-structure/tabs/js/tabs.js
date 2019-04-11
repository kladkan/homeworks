'use strict'
const tabs = document.getElementById('tabs');
const tabsContent = tabs.querySelector('.tabs-content');
const articles = Array.from(tabsContent.children);
let tabsNavLi = tabs.querySelector('.tabs-nav > li');

articles.forEach(article => {
  article.classList.add('hidden');
  const newLi = tabsNavLi.cloneNode(true);
  tabsNavLi.parentElement.appendChild(newLi);
})
tabsNavLi.parentElement.removeChild(tabsNavLi);

tabsNavLi = Array.from(tabs.querySelectorAll('.tabs-nav > li'));

for (let i = 0; i < tabsNavLi.length; i++) {
  tabsNavLi[i].firstElementChild.textContent = articles[i].dataset.tabTitle;
  tabsNavLi[i].firstElementChild.classList.add(`${articles[i].dataset.tabIcon}`);
  tabsNavLi[i].addEventListener('click', showArticle);
}
articles[0].classList.remove('hidden');
tabsNavLi[0].classList.add('ui-tabs-active');

function showArticle(event) {
  const getCurrentTab = tabs.querySelector('.ui-tabs-active');
  getCurrentTab.classList.remove('ui-tabs-active');
  event.target.parentElement.classList.add('ui-tabs-active');
  const getCurrentArticle = tabsContent.querySelector(`[data-tab-icon="${getCurrentTab.firstElementChild.classList[1]}"]`);
  getCurrentArticle.classList.add('hidden');
  const activeArticle = tabsContent.querySelector(`[data-tab-icon="${event.target.classList[1]}"]`);
  activeArticle.classList.remove('hidden');
}
