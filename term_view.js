import { getRandInt } from './utils.js';
import Colors from './colors.js';
import Charset from './charset.js';

export default class TermView {
  #symbols;
  
  // Valid colors are:
  // "green"
  // "purple"
  // "amber"
  // "cyan"
  // "blue"
  // "red"

  #colorPalette;

  constructor(color, symbols) {
    this.#symbols = symbols;
    this.#colorPalette = Colors.getColor(color);
  }
  
  // Clears existing content in the console and removes cursor visibility
  openView() {
    this.clearView();
    process.stdout.write("\x1b[?25l");
    process.stdout.write("\x1b[?7l");
  }

  clearView() {
    console.clear();
  }

  // Returns cursor visibility
  closeView() {
    this.clearView();
    process.stdout.write("\x1b[?25h");
    process.stdout.write("\x1b[?7h");
  }

  drawAllChars(chars) {

    let output = "";

    const numberOfChars = chars.length;

    for (let i = 0; i < numberOfChars; i++) {
      output += this.drawChar(chars[i]);
    }

    process.stdout.write(output);
  }

  drawChar(char) {
    const x = char.column;
    const y = char.row;

    let output = "";

    output += "\x1b7";

    output += `\x1b[${y + 1};${x + 1}H`;
    output += `\x1b[38;2;${this.getHeadColor()}m`;
    output += this.getRandSymbol();

    output += this.drawTail(x, y, char.tailLength);

    output += "\x1b8";

    return output;
  }

  drawTail(x, y, tailLength) {
    let output = "";
    for (let i = 0; i < tailLength; i++) {
      output += `\x1b[38;2;${this.getTailColor(i, tailLength)}m`;
      if (y - i > 0) {
        output += `\x1b[${y - i};${x + 1}H`;
        output += this.getRandSymbol();
      }
    }
    if (y - tailLength > 0) {
      output += `\x1b[${y - tailLength};${x + 1}H`;
      output += " ";
    }
    return output;
  }

  getRandSymbol() {
    const numberOfSymbols = this.#symbols.length;
    return this.#symbols[getRandInt(numberOfSymbols)];
  }

  // Change this to suit this.#color
  getHeadColor() {
    return this.#colorPalette[0];
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
      return this.#colorPalette[1];
    } else if (d < Math.floor(tailLength * (firstPercent + secondPercent))) {
      return this.#colorPalette[2];
    } else if (d < Math.floor(tailLength * (firstPercent + secondPercent + thirdPercent))) {
      return this.#colorPalette[3];
    } else {
      return this.#colorPalette[4];
    }
  }
}
