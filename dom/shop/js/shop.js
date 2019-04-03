const addButtons = document.querySelectorAll('.box > .add');

const cardCount = document.getElementById('cart-count');

const cartTotalPrice = document.getElementById('cart-total-price');

for (const addButton of addButtons) {
  addButton.addEventListener('click', addProduct);
};

let count = 0;
let totalPrice = 0;
function addProduct() {
  cardCount.innerHTML = ++count;
  totalPrice = totalPrice + Number(this.dataset.price);
  cartTotalPrice.innerHTML = getPriceFormatted(totalPrice);
};
