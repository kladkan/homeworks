'use strict';

const colorSwatch = document.querySelector('#colorSwatch');
const xhrColors = new XMLHttpRequest();

xhrColors.open('GET', 'https://neto-api.herokuapp.com/cart/colors', true);
xhrColors.send();
xhrColors.addEventListener('load', setColors);

function setColors() {
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
}

const sizeSwatch = document.querySelector('#sizeSwatch');
const xhrSizes = new XMLHttpRequest();

xhrSizes.open('GET', 'https://neto-api.herokuapp.com/cart/sizes', true);
xhrSizes.send();
xhrSizes.addEventListener('load', setSizes);

function setSizes() {
  const sizes = JSON.parse(xhrSizes.responseText);
  console.log(sizes);
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