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
    this.container.addEventListener('dragover', event => this.showHint.call(this, event)); //привязываю функцию showHint к контексту вызова
    this.container.addEventListener('drop', event => this.loadFile.call(this, event));
    //------------------
  }

  loadFile(e) {
    e.preventDefault();
    this.hideHint(); // для скрытия сообщения
    if (Array.from(e.dataTransfer.files)[0].type === 'text/plain') {// проверяем тип
      this.readFile(Array.from(e.dataTransfer.files)[0]);
      this.setFilename(Array.from(e.dataTransfer.files)[0].name);
    } else {
      console.log('Файл должен быть с расширением txt');
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