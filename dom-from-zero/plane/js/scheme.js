'use strict'

const formInline = document.querySelector('.form-inline');
const formControl = document.querySelector('.form-control');

const baseUrl = 'https://neto-api.herokuapp.com/plane/';

const seatMapTitle = document.getElementById('seatMapTitle');
const seatMapDiv = document.getElementById('seatMapDiv');
const btnSetFull = document.getElementById('btnSetFull');
const btnSetEmpty = document.getElementById('btnSetEmpty');
//const seats = document.getElementsByClassName('.seat');
let seats;

btnSetFull.disabled = true;
btnSetEmpty.disabled = true;

formInline.addEventListener('click', (event) => {
  event.preventDefault();
  if (event.target.id === 'btnSeatMap') {
    //console.log(formControl.value);
    getScheme(`${baseUrl}${formControl.value}`)

  }
  if (event.target.id === 'btnSetFull') {
    //console.log(event.target);
    for (const seat of seats) {
      //console.log(333);
      seat.classList.add('adult');
    };

    calcSeats();
  }
  if (event.target.id === 'btnSetEmpty') {
    //console.log(event.target);
    for (const seat of seats) {
      //console.log(333);
      seat.classList.remove('adult');
      seat.classList.remove('half');
    }

    calcSeats();
  }
});

function calcSeats() {
  const adultSeats = document.getElementsByClassName('adult').length;
  const totalAdult = document.getElementById('totalAdult');
  totalAdult.textContent = adultSeats;

  const halfSeats = document.getElementsByClassName('half').length;
  const totalHalf = document.getElementById('totalHalf');
  totalHalf.textContent = halfSeats;

  const totalPaxSeats = adultSeats + halfSeats;
  const totalPax = document.getElementById('totalPax');
  totalPax.textContent = totalPaxSeats;
}

function getScheme(url) {
  fetch(url)
    .then(res => res.json())
    .then(res => showScheme(res))
    .catch(error => console.log(error));
}

function showScheme(airInfo) {
  seatMapTitle.innerText = `${airInfo.title} (${airInfo.passengers} пассажиров)`;
  seatMapDiv.textContent = '';
  for (let i = 0; i < airInfo.scheme.length; i++) {
    seatMapDiv.appendChild(genRowElement(seatingRow(airInfo, i)));
  }

  calcSeats();

  btnSetFull.disabled = false;
  btnSetEmpty.disabled = false;
  seats = Array.from(document.getElementsByClassName('seat'));

  for (const seat of seats) {
    seat.addEventListener('click', (event) => {
      if (event.altKey) {
        event.currentTarget.classList.add('half');
        event.currentTarget.classList.remove('adult');
      } else {
        if (event.currentTarget.classList.contains('half')) {
          event.currentTarget.classList.remove('half');
        } else {
          if (event.currentTarget.classList.contains('adult')) {
            event.currentTarget.classList.remove('adult');
          } else {
            if (!event.currentTarget.classList.contains('adult')) {
              event.currentTarget.classList.add('adult');
            }
          }
        }
      }

      calcSeats();

    }, true);
  }
}

function seatingRow(airInfo, i) {
  return {
    tag: 'div',
    cls: ['row', 'seating-row', 'text-center'],
    content: [
      {
        tag: 'div',
        cls: ['col-xs-1', 'row-number'],
        content: { tag: 'h2', content: `${i + 1}` }
      },
      (airInfo.scheme[i] === 6 || airInfo.scheme[i] === 4) && {
        tag: 'div',
        cls: 'col-xs-5',
        content: [
          {
            tag: 'div',
            cls: ['col-xs-4', `${(airInfo.scheme[i] === 4) ? 'no-seat' : 'seat'}`],
            content: airInfo.scheme[i] === 6 && { tag: 'span', cls: 'seat-label', content: airInfo.letters6[0] }
          },
          {
            tag: 'div',
            cls: ['col-xs-4', 'seat'],
            content: { tag: 'span', cls: 'seat-label', content: airInfo.letters6[1] }
          },
          {
            tag: 'div',
            cls: ['col-xs-4', 'seat'],
            content: { tag: 'span', cls: 'seat-label', content: airInfo.letters6[2] }
          }
        ]
      },
      (airInfo.scheme[i] === 6 || airInfo.scheme[i] === 4) && {
        tag: 'div',
        cls: 'col-xs-5',
        content: [
          {
            tag: 'div',
            cls: ['col-xs-4', 'seat'],
            content: { tag: 'span', cls: 'seat-label', content: airInfo.letters6[3] }
          },
          {
            tag: 'div',
            cls: ['col-xs-4', 'seat'],
            content: { tag: 'span', cls: 'seat-label', content: airInfo.letters6[4] }
          },
          {
            tag: 'div',
            cls: ['col-xs-4', `${(airInfo.scheme[i] === 4) ? 'no-seat' : 'seat'}`],
            content: airInfo.scheme[i] === 6 && { tag: 'span', cls: 'seat-label', content: airInfo.letters6[5] }
          }
        ]
      }
    ]
  }
}

function genRowElement(block) {
  if ((block === undefined) || (block === null) || (block === false)) {
    return document.createTextNode('');
  }
  if ((typeof block === 'string') || (typeof block === 'number') || (block === true)) {
    return document.createTextNode(block);
  }
  if (Array.isArray(block)) {
    const fragment = document.createDocumentFragment();
    block.forEach(el => {
      fragment.appendChild(genRowElement(el));
    });
    return fragment;
  }
  const element = document.createElement(block.tag);

  const classes = Array.isArray(block.cls) ? block.cls : [block.cls];
  classes.forEach(cls => {
    if (!cls) return;
    element.classList.add(cls);
  });
  //element.classList.add(...[].concat(block.cls).filter(Boolean));
  if (block.attrs) {
    Object.keys(block.attrs).forEach(key => {
      element.setAttribute(key, block.attrs[key]);
    });
  }

  element.appendChild(genRowElement(block.content));

  return element;
}
