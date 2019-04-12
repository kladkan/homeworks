'use strict';

function handleTableClick(event) {

  if (event.target.tagName === 'TH') {
    console.log(event.target.tagName);
    if (event.target.dataset.dir) {
      event.target.dataset.dir = event.target.dataset.dir * (-1);
    } else {
      Array.from(document.querySelectorAll('th')).forEach(element => element.dataset.dir = '');
      event.target.dataset.dir = 1;
    };
    document.querySelector('table').dataset.sortBy = event.target.dataset.propName;
    sortTable(event.target.dataset.propName, event.target.dataset.dir);
  }
}