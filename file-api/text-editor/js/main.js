const throttle = (handler, ms) => {
  let timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(handler, ms);
  }
};
class TextEditor {
  constructor(container, storageKey = '_text-editor__content') {
    this.container = container;
    this.contentContainer = container.querySelector('.text-editor__content');
    this.hintContainer = container.querySelector('.text-editor__hint');
    this.filenameContainer = container.querySelector('.text-editor__filename');
    this.storageKey = storageKey;
    this.registerEvents();
    this.load(this.getStorageData());
  }

  registerEvents() {
    const save = throttle(this.save.bind(this), 1000);
    this.contentContainer.addEventListener('input', save);
    //--------------
    this.contentContainer.addEventListener('dragover', event => this.showHint.call(this, event)); //привязываю функцию showHint к контексту вызова
    this.contentContainer.addEventListener('dragleave', this.hideHint.bind(this));
    this.contentContainer.addEventListener('drop', event => {
      event.preventDefault();
      this.loadFile.call(this, event);
    });
    //------------------

  }
  loadFile(e) {
    //e.preventDefault(); // перенес до вызова loadFile но не помогает (все равно, то срабаытвает то нет)
    const file = Array.from(e.dataTransfer.files);//получаем массив
    //this.hideHint(); // для скрытия стандартного сообщения
    if (file[0].name.split('.')[file[0].name.split('.').length - 1] === 'txt') {// проверяем расширение
      this.readFile(file[0]);
      this.setFilename(file[0].name);
    } else {
      //console.log('Файл должен быть с расширением txt');
      this.hintContainer.firstElementChild.textContent = 'Файл должен быть с расширением txt' // как вернуть затем стандартное сообщение, может добавить еще одно событие dropend и там вернуть первоначальное сообщение
      this.showHint(e);
      
    }

  }

  readFile(file) {
    const reader = new FileReader();
    this.contentContainer.value = '';
    reader.addEventListener('load', event => {
      this.contentContainer.value = event.target.result;
    });
    reader.readAsText(file);
  }

  setFilename(filename) {
    this.filenameContainer.textContent = filename;
  }
  showHint(e) {
    e.preventDefault();
    this.hintContainer.classList.add('text-editor__hint_visible');
  }
  hideHint() {
    this.hintContainer.classList.remove('text-editor__hint_visible');
  }
  load(value) {
    this.contentContainer.value = value || '';
  }
  getStorageData() {
    return localStorage[this.storageKey];
  }
  save() {
    localStorage[this.storageKey] = this.contentContainer.value;
  }
}

new TextEditor(document.getElementById('editor'));