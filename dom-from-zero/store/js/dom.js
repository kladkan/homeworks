'use strict';

function createElement(block) {
  console.log(block);
  if ((block === undefined) || (block === null) || (block === false)) {
    return document.createTextNode('');
  }
  if ((typeof block === 'string') || (typeof block === 'number') || (block === true)) {
    return document.createTextNode(block);
  }
  if (Array.isArray(block)) {
    const fragment = document.createDocumentFragment();
    block.forEach(el => {
      fragment.appendChild(createElement(el));
    });
    return fragment;
  }
  const element = document.createElement(block.name);

  if (block.props != null && typeof block.props === 'object') {
    Object.keys(block.props).forEach(i => element
      .setAttribute(i, block.props[i]));
  }

  element.appendChild(createElement(block.childs));

  return element;

}
