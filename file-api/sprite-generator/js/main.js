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

    this.canvas = document.createElement('canvas');
    this.context;
    this.tempImg;

    this.registerEvents();
  }

  registerEvents() {
    this.uploadButton.accept = 'image/*'; // возможность загружать только изображения
    this.uploadButton.addEventListener('change', event => this.loadFiles.call(this, event));
    this.submitButton.addEventListener('click', event => this.genSprite.call(this, event))
  };

  loadFiles(e) {
    for (let file of e.target.files) {
      // фильтруем повторно выбранные файлы и не пропускаем их в массив
      if (!this.images.find(image => image.name === file.name)) {
        this.images.push(file);// заполняем массив файлами
      }
    }
    this.imagesCount = this.images.length;
    this.imagesCountContainer.textContent = this.imagesCount;
  };

  genSprite(e) { // после нажатия кнопки сгенерировать спрайт
    
    this.context = this.canvas.getContext('2d');
    
    for (let i = 0; i < this.imagesCount; i++) {
      this.tempImg = document.createElement('img'); //создаю временный элемент img для хранения текущей картинки из массива

      this.tempImg.addEventListener('load', event => {// после загрузки помещаю текущую картинку на холст со смещение 50
        this.context.drawImage(event.target, 50 * i, 0, 50, 50);
        URL.revokeObjectURL(event.target.src);
      });

      this.tempImg.src = URL.createObjectURL(this.images[i]); // устанавливаю адрес текущей картинки
    };

    this.imageElement.src = this.canvas.toDataURL(); // вывожу содержимое холста
    console.log(e.target);
  };
};

new SpriteGenerator(document.getElementById('generator'));