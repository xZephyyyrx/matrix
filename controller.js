import Canvas from './canvas.js';

export default class Controller {
  #canvas;
  #view;
  #input;
  #fps;
  #coreLoop;

  constructor(canvas, view, input, fps) {
    this.#canvas = canvas;
    this.#view = view;
    this.#input = input;
    this.#fps = fps;
  }

  run() {
    this.#view.openView();
    this.#input.enableInputReading();
    this.#coreLoop = setInterval(() => {
      this.runLoop();
    }, 1000 / this.#fps);
  }

  runLoop() {
    this.checkInput();
    this.checkWindowSize();
    this.#canvas.update();
    this.#view.drawAllChars(this.#canvas.allChars);
    this.#canvas.removeDeadChars();
  }

  checkInput() {
    const closeKey = "q";
    if (this.#input.key === closeKey) {
      this.close();
    }
  }

  checkWindowSize() {
    const windowRows = process.stdout.rows;
    const windowColumns = process.stdout.columns;
    if (this.#canvas.rows !== windowRows ||
        this.#canvas.columns !== windowColumns) {
      this.#canvas = new Canvas(windowRows, windowColumns);
      this.#view.clearView();
    } 
  }

  close() {
    clearInterval(this.#coreLoop);
    this.#input.disableInputReading();
    this.#view.closeView();
    process.exit();
  }
}
