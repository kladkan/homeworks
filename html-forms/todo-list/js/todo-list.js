document.addEventListener('DOMContentLoaded', check);
const inputs = document.getElementsByTagName('input');
for (const inp of inputs) {
  inp.addEventListener('click', check);
};

const totalOutput = document.getElementsByTagName('output')[0];
const listBlock = document.querySelector('.list-block');

function check() {
  const total = [];
  for (const inp of inputs) {
    if (inp.checked) {
      total.push('ok');
    };
    totalOutput.innerHTML = `${total.length} из ${inputs.length}`;
  };
  if (total.length === inputs.length) {
    listBlock.classList.add('complete');
  } else {
    listBlock.classList.remove('complete');
  };
}
