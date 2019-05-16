const prop = (data, name) => data.map(item => item[name]),
  summ = data => data.reduce((total, value) => total + value, 0);
class SpriteGenerator {
  constructor(container) {
    this.uploadButton = container.querySelector('.sprite-generator__upload');

    this.submitButton = container.querySelector('.sprite-generator__generate');
    this.imagesCountContainer = container.querySelector('.images__added-count-value');
    this.codeContainer = container.querySelector('.sprite-generator__code');
    this.imageElement = container.querySelector('.sprite-generator__result-image');
    this.images = [];

    this.imagesCount = 0;

    this.registerEvents();
  }

  registerEvents() {
    this.uploadButton.accept = 'image/*'; // возможность загружать только изображения
    this.uploadButton.addEventListener('change', event => this.loadFiles.call(this, event));
    this.submitButton.addEventListener('click', event => this.genSprite.call(this, event))
  };

  loadFiles(e) {
    for (let file of e.target.files) {
      const img = document.createElement('img');
      img.width = 50;
      img.height = 50;
      img.src = URL.createObjectURL(file);
      img.addEventListener('load', event => {
        URL.revokeObjectURL(event.target.src);
      });
      this.images.push(img);
    }
    this.imagesCount = this.images.length;
    this.imagesCountContainer.textContent = this.imagesCount;
  };

  genSprite(e) { // формируем спрайт + css
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = this.images[0].width * this.imagesCount;
    const fullCss = `
      .icon {
        display: inline-block;
        background-image: url(img/sprite.png);
      }
		`;
    let cssForImgIcon = '';

    for (let i = 0; i < this.imagesCount; i++) {
      context.drawImage(this.images[i], this.images[i].width * i, 0, this.images[i].width, this.images[i].height);

      cssForImgIcon = cssForImgIcon + `
	  		.icon_${i} {
          background-position: ${-50 * i}px 0;
          width: ${this.images[i].width}px;
          height: ${this.images[i].height}px;
        }
		  `;
    };

    this.codeContainer.value = fullCss + cssForImgIcon;

    this.imageElement.src = canvas.toDataURL(); // вывожу содержимое холста
  };
};

new SpriteGenerator(document.getElementById('generator'));