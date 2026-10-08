#!/usr/bin/env node

import TermView from './term_view.js';
import TermInput from './term_input.js';
import Controller from './controller.js';
import Canvas from './canvas.js';

const args = process.argv.slice(2);
const color = args[args.indexOf("-c") + 1];
const fps = args[args.indexOf("-f") + 1];

const view = new TermView(color);
const input = new TermInput();

const canvas = new Canvas(
  process.stdout.rows,
  process.stdout.columns
)

const controller = new Controller(canvas, view, input, fps);

controller.run();
