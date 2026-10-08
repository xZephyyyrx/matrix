export default class Charset {
  static getCharset(charset) {

    // Both the canvas and view are given values from here depending
    // on the specified language.
    // 0 indicates how many spaces within the terminal each character occupies
    // 1 contains the list of characters to display on screen
    switch (charset) {
      case "en":
        return {
          0: 1,
          1: "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        };
        break;
      case "thai":
        return {
          0: 1,
          1: "กขคฆงจฉชซญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรลวศษสหฬอ"
        };
        break;
      case "hira":
        return {
          0: 2,
          1: "あいうえおかきくけこがぎぐげごさしすせそざじずぜぞたちつてとだぢづでどなにぬねのはひふへほばびぶべぼぱぴぷぺぽまみむめもやゆよらりるれろわゐゑをんをっ"
        };
        break;
      default:
        return {
          0: 1,
          1: "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        }
        break;
    }
  }
}
