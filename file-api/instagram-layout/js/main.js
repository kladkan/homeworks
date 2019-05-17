const addClass = (className, context) => context.classList.add(className),
  removeClass = (className, context) => context.classList.remove(className),
  hasClass = (className, context) => context.classList.contains(className);
class iLayout {
  constructor(container) {
    this.container = container;
    this.positionsContainer = container.querySelector('.layout__positions');
    this.actionButton = container.querySelector('.layout__button');
    this.result = container.querySelector('.layout__result');
    this.layout = {
      left: null,
      top: null,
      bottom: null
    };
    this.registerEvents();
  };
  registerEvents() {
    this.positionsContainer.addEventListener('dragover', event => {
      event.preventDefault();
      addClass('layout__item_active', event.target);
    });

    this.positionsContainer.addEventListener('dragleave', event => {
      event.preventDefault();
      removeClass('layout__item_active', event.target);
    });

    this.positionsContainer.addEventListener('drop', event => this.fillWithImg.call(this, event));

    this.actionButton.addEventListener('click', event => this.genFinalImg.call(this, event));
  };

  fillWithImg(event) {
    event.preventDefault();
    removeClass('layout__item_active', event.target);

    const imageTypeRegExp = /^image\//;
    if (imageTypeRegExp.test(event.dataTransfer.files[0].type)) {
      const img = document.createElement('img');
      img.classList.add('layout__image');
      img.src = window.URL.createObjectURL(event.dataTransfer.files[0]);
      img.addEventListener('load', event => {
        window.URL.revokeObjectURL(event.target.src);
      });
      event.target.appendChild(img);
      if (event.target.classList.contains('layout__item_left')) {
        this.layout.left = {
          posX: 0,
          posY: 0,
          img: img,
          width: event.target.clientWidth,
          height: event.target.clientHeight
        };
      };
      if (event.target.classList.contains('layout__item_top')) {
        this.layout.top = {
          posX: event.target.previousElementSibling.clientWidth,
          posY: 0,
          img: img,
          width: event.target.clientWidth,
          height: event.target.clientHeight
        };
      };
      if (event.target.classList.contains('layout__item_bottom')) {
        this.layout.bottom = {
          posX: event.target.previousElementSibling.clientWidth,
          posY: event.target.previousElementSibling.clientHeight,
          img: img,
          width: event.target.clientWidth,
          height: event.target.clientHeight
        };
      };

    } else {
      console.log('данный файл не является изображением');
    }
  };

  genFinalImg(event) {
    
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = this.positionsContainer.clientWidth;
    canvas.height = this.positionsContainer.clientHeight;
    // в цикле добавляем картинки на холст
    for (let pict in this.layout) {
      context.drawImage(
        this.layout[pict].img,
        this.layout[pict].posX, this.layout[pict].posY,
        this.layout[pict].width, this.layout[pict].height);
    };

    const finalImg = document.createElement('img');
    finalImg.src = canvas.toDataURL();

    this.result.innerText = `<img src='${finalImg.src}'>`;
    this.positionsContainer.appendChild(finalImg);
  }
}

new iLayout(document.getElementById('layout'));