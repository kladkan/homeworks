'use strict';

const baseUrl = 'https://neto-api.herokuapp.com';
const getUrl = url => `${baseUrl}${url}`;
const url = {
  color: getUrl('/cart/colors'),
  size: getUrl('/cart/sizes'),
  cart: getUrl('/cart'),
  removeCart: getUrl('/cart/remove')
};

function loadData(url, callback) {
  fetch(url)
    .then(res => res.json())
    .then(res => callback(res))
    .catch(error => console.log(error))
}

Promise.all([
  loadData(url.color, loadColors),
  loadData(url.size, loadSizes),
  loadData(url.cart, loadCart)

])

function loadColors(colors) {
  const colorSwatch = document.querySelector('#colorSwatch');
  for (const color of colors) {
    const colorAvailable = color.isAvailable ? 'available' : 'soldout';
    const colorDisabled = color.isAvailable ? '' : 'disabled';
    colorSwatch.innerHTML = colorSwatch.innerHTML + `
      <div data-value="${color.type}" class="swatch-element color ${color.type} ${colorAvailable}">
        <div class="tooltip">${color.title}</div>
        <input quickbeam="color" id="swatch-1-${color.type}" type="radio" name="color" value="${color.type}" ${colorDisabled}>
        <label for="swatch-1-${color.type}" style="border-color: red;">
          <span style="background-color: ${color.code};"></span>
          <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
        </label>
      </div>
    `;
  }
  colorSwatch.querySelector('.available').firstElementChild.nextElementSibling.checked = true;
}

function loadSizes(sizes) {
  const sizeSwatch = document.querySelector('#sizeSwatch');
  for (const size of sizes) {
    const sizeAvailable = size.isAvailable ? 'available' : 'soldout';
    const sizeDisabled = size.isAvailable ? '' : 'disabled';
    sizeSwatch.innerHTML = sizeSwatch.innerHTML + `
      <div data-value="${size.type}" class="swatch-element plain ${size.type} ${sizeAvailable}">
        <input id="swatch-0-${size.type}" type="radio" name="size" value="${size.type}" ${sizeDisabled}>
        <label for="swatch-0-${size.type}">
          ${size.title}
          <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
        </label>
      </div>
    `;
  }
  sizeSwatch.querySelector('.available').firstElementChild.checked = true;
}

const quickCart = document.querySelector('#quick-cart');

function loadCart(items) {
  console.log(items);
  for (const item of items) {

    quickCart.innerHTML = quickCart.innerHTML + `
      <div class="quick-cart-product quick-cart-product-static" id="quick-cart-product-${item.productId}" style="opacity: 1;">
        <div class="quick-cart-product-wrap">
          <img src="${item.pic}" title="${item.title}">
          <span class="s1" style="background-color: #000; opacity: .5">$800.00</span>
          <span class="s2"></span>
        </div>
        <span class="count hide fadeUp" id="quick-cart-product-count-${item.productId}">${item.quantity}</span>
        <span class="quick-cart-product-remove remove" data-id="${item.productId}"></span>
      </div>
    `;
  }

  quickCart.innerHTML = quickCart.innerHTML + `
    <a id="quick-cart-pay" quickbeam="cart-pay" class="cart-ico open">
      <span>
        <strong class="quick-cart-text">Оформить заказ<br></strong>
        <span id="quick-cart-price">$800.00</span>
      </span>
    </a>
  `;
}


//quickCart.addEventListener('click', cartAction); // пока нет повешанной функции

const addToCartForm = document.querySelector('#AddToCartForm');
addToCartForm.addEventListener('submit', addToCart);

function addToCart(event) {
  event.preventDefault();
  //console.log(event);

  const addToCartFormData = new FormData(addToCartForm);
  addToCartFormData.append('productId', addToCartForm.dataset.productId);
  /*
    for (const [k, v] of addToCartFormData) {
      console.log(k + ': ' + v);
    }
  */
  const xhrAddToCard = new XMLHttpRequest()
  xhrAddToCard.open('POST', 'https://neto-api.herokuapp.com/cart');
  xhrAddToCard.send(addToCartFormData);

  xhrAddToCard.addEventListener('load', (e) => {
    const addedItem = JSON.parse(xhrAddToCard.responseText);
    console.log(addedItem);
    loadCart(addedItem);

  });

}

quickCart.addEventListener('click', removeItem);
function removeItem(event) {
  if (event.target.classList.contains('remove')) {

    const removableItemFormData = new FormData();
    removableItemFormData.append('productId', event.target.dataset.id);

    const xhrRemoveItem = new XMLHttpRequest()
    xhrRemoveItem.open('POST', 'https://neto-api.herokuapp.com/cart/remove');
    xhrRemoveItem.send(removableItemFormData);

    /*
    xhrRemoveItem.addEventListener('load', (e) => {
      const removedItem = JSON.parse(xhrRemoveItem.responseText);
      loadCart(removedItem);

    });*/
  }

}
