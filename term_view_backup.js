import { getRandInt } from './utils.js';
import Colors from './colors.js';

export default class TermView {
  #symbols;
  
  // Valid colors are:
  // "green"
  // "purple"
  // "amber"
  // "cyan"
  // "blue"
  // "red"
  #color;

  constructor(
    color = "green",
    symbols = "กขคฆงจฉชซญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรลวศษสหฬอ"
  ) {
    this.#symbols = symbols;
    this.#color = color;
  }
  
  // Clears existing content in the console and removes cursor visibility
  openView() {
    this.clearView();
    process.stdout.write("\x1b[?25l");
  }

  clearView() {
    console.clear();
  }

  // Returns cursor visibility
  closeView() {
    this.clearView();
    process.stdout.write("\x1b[?25h");
  }

  drawAllChars(chars) {
    const numberOfChars = chars.length;

    for (let i = 0; i < numberOfChars; i++) {
      this.drawChar(chars[i]);
    }
  }

  drawChar(char) {
    const x = char.column;
    const y = char.row;
    
    process.stdout.write("\x1b7");

    process.stdout.write(`\x1b[${y + 1};${x + 1}H`);
    process.stdout.write(`\x1b[38;2;${this.getHeadColor()}m`);
    process.stdout.write(
      this.getRandSymbol()
    );

    this.drawTail(x, y, char.tailLength);

    process.stdout.write("\x1b8");
  }

  drawTail(x, y, tailLength) {
    for (let i = 0; i < tailLength; i++) {
      process.stdout.write(`\x1b[38;2;${this.getTailColor(i, tailLength)}m`)
      if (y - i > 0) {
        process.stdout.write(`\x1b[${y - i};${x + 1}H`);
        process.stdout.write(
          this.getRandSymbol()
        );
      }
    }
    if (y - tailLength > 0) {
      process.stdout.write(`\x1b[${y - tailLength};${x + 1}H`);
      process.stdout.write(" ");
    }
  }

  getRandSymbol() {
    const numberOfSymbols = this.#symbols.length;
    return this.#symbols[getRandInt(numberOfSymbols)];
  }

  // Change this to suit this.#color
  getHeadColor() {
    return Colors.getColor(this.#color)[0];
  }

  // d is the distance from the head, using i in the drawTail function
  getTailColor(d, tailLength) {
    // The percentage of the tail that each color occupies is defined here,
    // with the remainded consisting of the fourth color
    // Percentages are written assuming 1 = 100%
    const firstPercent = 0.4;
    const secondPercent = 0.3;
    const thirdPercent = 0.2;

    if (d < Math.floor(tailLength * (firstPercent))) {
      return Colors.getColor(this.#color)[1];
    } else if (d < Math.floor(tailLength * (firstPercent + secondPercent))) {
      return Colors.getColor(this.#color)[2];
    } else if (d < Math.floor(tailLength * (firstPercent + secondPercent + thirdPercent))) {
      return Colors.getColor(this.#color)[3];
    } else {
      return Colors.getColor(this.#color)[4];
    }
  }
}
