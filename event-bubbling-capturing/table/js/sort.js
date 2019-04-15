'use strict';

function handleTableClick(event) {

  if (event.target.tagName.toLowerCase() === 'th') {
    event.target.dataset.dir = event.target.dataset.dir === '1' ? '-1' : '1';
    console.log(event.target);
    event.currentTarget.dataset.sortBy = event.target.dataset.propName;
    sortTable(event.target.dataset.propName, event.target.dataset.dir);
  }
}