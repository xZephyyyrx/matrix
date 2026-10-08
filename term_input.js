export default class TermInput {
  #key;

  enableInputReading() {
    process.stdin.setRawMode(true);
    process.stdin.on("data", (key) => {
      if (key !== null) {
        this.#key = key.toString();
      }
    });
  }

  disableInputReading() {
    process.stdin.setRawMode(false);
  }

  get key() {
    return this.#key;
  }
}
