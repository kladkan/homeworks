'use strict'
const sliders = document.querySelectorAll('.slider');
Array.from(sliders).forEach(item => slider(item));

function slider(container) {
  container.querySelector('li').classList.add('slide-current');
  const prevButton = container.querySelector('[data-action="prev"]');
  const nextButton = container.querySelector('[data-action="next"]');
  const firstButton = container.querySelector('[data-action="first"]');
  const lastButton = container.querySelector('[data-action="last"]');
  prevButton.classList.add('disabled');
  firstButton.classList.add('disabled');

  const navButtons = container.querySelectorAll('.slider-nav > a');
  for (const navButton of navButtons) {
    navButton.addEventListener('click', navAction);
  }

  function navAction(event) {
    console.log(event.target.getAttribute('data-action'));
    if (event.target.getAttribute('data-action') === 'next' && !event.target.classList.contains('disabled')) {
      moveSlide(true);
    }
    if (event.target.getAttribute('data-action') === 'prev' && !event.target.classList.contains('disabled')) {
      moveSlide(false);
    }
    if ((event.target.getAttribute('data-action') === 'last' || event.target.getAttribute('data-action') === 'first') && !event.target.classList.contains('disabled')) {
      moveSlide(event.target.getAttribute('data-action'));
    }

    function moveSlide(isForward) {
      const currentSlide = container.querySelector('.slide-current');
      let activatedSlide;
      if (isForward === 'last') {
        activatedSlide = currentSlide.parentElement.lastElementChild;
      } else if (isForward === 'first') {
        activatedSlide = currentSlide.parentElement.firstElementChild;
      } else {
        activatedSlide = isForward ? currentSlide.nextElementSibling : currentSlide.previousElementSibling;
      }
      currentSlide.classList.remove('slide-current');
      activatedSlide.classList.add('slide-current');
      if (activatedSlide.nextElementSibling === null) {
        nextButton.classList.add('disabled');
        lastButton.classList.add('disabled');
      } else {
        nextButton.classList.remove('disabled');
        lastButton.classList.remove('disabled');
      }

      if (activatedSlide.previousElementSibling === null) {
        prevButton.classList.add('disabled');
        firstButton.classList.add('disabled');
      } else {
        prevButton.classList.remove('disabled');
        firstButton.classList.remove('disabled');
      }
    }
  }
}