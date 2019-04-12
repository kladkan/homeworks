'use strict';

list.addEventListener('click', addItem);

function addItem(event) {
  const itemObj = new Object();
  itemObj.title = event.target.dataset.title;
  itemObj.price = event.target.dataset.price;
  addToCart(itemObj);
}