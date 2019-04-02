const galleryBattons = document.getElementById('nav').getElementsByTagName('a');
for (const button of galleryBattons) {
  button.addEventListener('click', selectButton);
}

const view = document.getElementById('view');

function selectButton(event) {
  event.preventDefault();
  if (this.classList.contains('gallery-current')) {
    return;
  }

  const currentButtons = document.getElementsByClassName('gallery-current');
  Array.from(currentButtons).forEach(button => {
    button.classList.remove('gallery-current');
  });

  this.classList.add('gallery-current');
  const resource = this.getElementsByTagName('img')[0];
  view.src = resource.src.replace(/thumb/, 'full');
  view.title = resource.title;
}