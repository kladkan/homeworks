const addButtons = document.querySelectorAll('.box > .add');

const cardCount = document.getElementById('cart-count');

const cartTotalPrice = document.getElementById('cart-total-price');

for (const addButton of addButtons) {
  addButton.addEventListener('click', addProduct);
};

let count = 0;
let totalPrice = 0;
function addProduct(event) {
  cardCount.innerHTML = ++count;
  totalPrice = totalPrice + Number(event.currentTarget.dataset.price);
  cartTotalPrice.innerHTML = getPriceFormatted(totalPrice);
};
