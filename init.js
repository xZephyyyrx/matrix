#!/usr/bin/env node

import TermView from './term_view.js';
import TermInput from './term_input.js';
import Controller from './controller.js';
import Canvas from './canvas.js';
import Charset from './charset.js';

const args = process.argv.slice(2);

let color;
if (args.includes("-c")) {
  color = args[args.indexOf("-c") + 1];
} else {
  color = "green";
}

let fps;
if (args.includes("-f")) {
  fps = parseInt(args[args.indexOf("-f") + 1]);
}

let charset;
if (args.includes("-l")) {
  charset = args[args.indexOf("-l") + 1];
} else {
  charset = "en";
}

const view = new TermView(color, Charset.getCharset(charset)[1]);
const input = new TermInput();

const canvas = new Canvas(
  process.stdout.rows,
  process.stdout.columns,
  Charset.getCharset(charset)[0]
)

const controller = new Controller(canvas, view, input, fps, charset);

controller.run();
