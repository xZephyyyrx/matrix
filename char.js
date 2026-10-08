export default class Char {
  #row;
  #column;
  #tailLength;

  constructor(row, column, tailLength) {
    this.#row = row;
    this.#column = column;
    this.#tailLength = tailLength;
  }

  update() {
    this.#row += 1;
  }

  get row() {
    return this.#row;
  }

  get column() {
    return this.#column;
  }

  get tailLength() {
    return this.#tailLength;
  }
}
