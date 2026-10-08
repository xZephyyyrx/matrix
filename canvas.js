import Char from './char.js';
import { getRandInt } from './utils.js';

export default class Canvas {
  #rows;
  #columns;
  #allChars = [];
  #maxTailLength;
  #minTailLength;

  constructor(rows, columns) {
    this.#rows = rows;
    this.#columns = columns;
    this.#maxTailLength = Math.ceil(rows / 2);
    this.#minTailLength = Math.floor(rows / 6);
  }

  update() {
    this.updateAllChars();
    for (let i = getRandInt(1); i <= 1; i++) {
      this.createNewChar();
    }
  }

  removeDeadChars() {
    this.#allChars = this.#allChars.filter(
      char => char.row - char.tailLength < this.#rows
    );
  }

  updateAllChars() {
    const numberOfChars = this.#allChars.length;

    for (let i = 0; i < numberOfChars; i++) {
      this.#allChars[i].update();
    }
  }

  createNewChar() {
    const newColumn = getRandInt(this.#columns)
    let newTailLength = getRandInt(this.#maxTailLength);
    while (newTailLength < this.#minTailLength) {
      newTailLength = getRandInt(this.#maxTailLength);
    }
    const newChar = new Char(-1, newColumn, newTailLength);
    this.#allChars.push(newChar);
  }

  get rows() {
    return this.#rows;
  }

  get columns() {
    return this.#columns;
  }

  get allChars() {
    return this.#allChars;
  }
}
