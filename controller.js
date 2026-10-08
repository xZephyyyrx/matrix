import Canvas from "./canvas.js";
import Charset from "./charset.js";

export default class Controller {
  #canvas;
  #view;
  #input;
  #fps;
  #coreLoop;
  #charset;

  constructor(canvas, view, input, fps, charset) {
    this.#canvas = canvas;
    this.#view = view;
    this.#input = input;
    this.#fps = fps;
    this.#charset = charset;
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
    if (this.#input.key === closeKey || this.#input.key === "\x03") {
      this.close();
    }
  }

  checkWindowSize() {
    const windowRows = process.stdout.rows;
    const windowColumns = process.stdout.columns;
    if (
      this.#canvas.rows !== windowRows ||
      this.#canvas.columns !== this.adjustWindowColumns(windowColumns)
    ) {
      this.#canvas = new Canvas(
        windowRows,
        windowColumns,
        Charset.getCharset(this.#charset)[0],
      );
      this.#view.clearView();
    }
  }

  adjustWindowColumns(windowColumns) {
    const remainder = windowColumns % Charset.getCharset(this.#charset)[0];
    return windowColumns - remainder;
  }

  close() {
    clearInterval(this.#coreLoop);
    this.#input.disableInputReading();
    this.#view.closeView();
    process.exit();
  }
}
