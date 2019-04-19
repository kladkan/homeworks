'use strict';

setColors();

function setColors() {
  const colorSwatch = document.querySelector('#colorSwatch');
  const xhrColors = new XMLHttpRequest();

  xhrColors.open('GET', 'https://neto-api.herokuapp.com/cart/colors', true);
  xhrColors.send();
  xhrColors.addEventListener('load', (e) => {

    const colors = JSON.parse(xhrColors.responseText);
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
  });
}

const sizeSwatch = document.querySelector('#sizeSwatch');

setSizes();

function setSizes() {
  const xhrSizes = new XMLHttpRequest();

  xhrSizes.open('GET', 'https://neto-api.herokuapp.com/cart/sizes', true);
  xhrSizes.send();
  xhrSizes.addEventListener('load', (e) => {
    const sizes = JSON.parse(xhrSizes.responseText);
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
  });
}

setCart();

function setCart() {
  const xhrCart = new XMLHttpRequest();
  xhrCart.open('GET', 'https://neto-api.herokuapp.com/cart', true);
  xhrCart.send();
  xhrCart.addEventListener('load', (e) => {
    //console.log(xhrCart);
    const items = JSON.parse(xhrCart.responseText);
    //console.log(items);

    for (const item of items) {
      //const sizeAvailable = size.isAvailable ? 'available' : 'soldout';
      //const sizeDisabled = size.isAvailable ? '' : 'disabled';

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
  });
}

const quickCart = document.querySelector('#quick-cart');
//quickCart.addEventListener('click', cartAction); // пока нет повешанной функции

const addToCartForm = document.querySelector('#AddToCartForm');
console.log(addToCartForm);
addToCartForm.querySelector('#AddToCart').addEventListener('click', addToCart);

function addToCart(event) {
  event.preventDefault();

  const addToCartFormData = new FormData(addToCartForm);
  console.log(addToCartFormData);
  const formDataObj = {};
  addToCartFormData.forEach((value, key) => { formDataObj[key] = value });

  const xhrAddToCard = new XMLHttpRequest()

  xhrAddToCard.open('POST', 'https://neto-api.herokuapp.com/cart');
  xhrAddToCard.setRequestHeader('Content-Type', 'application/json');
  xhrAddToCard.send(JSON.stringify(formDataObj));
  console.log(xhrAddToCard.responseText);
  /*
  xhrAddToCard.addEventListener('load', (e) => {
    event.target.parentElement.nextElementSibling.textContent = JSON.parse(xhrAddToCard.responseText).error ? JSON.parse(xhrAddToCard.responseText).message : `Пользователь ${JSON.parse(xhrAddToCard.responseText).name} успешно зарегистрирован`;
  });
  */
}
