import * as wasm from "./wasm_game_of_life";
import { memory } from "./wasm_game_of_life_bg";

const CELL_SIZE = 5;

const GRID_COLOR = "#CCCCCC";
const DEAD_COLOR = "#FFFFFF";
const ALIVE_COLOR = "#000000";

// These must match `Cell::Alive` and `Cell::Dead` in `src/lib.rs`.
const DEAD = 0;
const ALIVE = 1;

const universe = wasm.Universe.new();
const width = universe.width();
const height = universe.height();

// Initialize the canvas with room for all of our cells and a 1px border
// around each of them.
const canvas = document.getElementById("game-of-life-canvas");
canvas.height = (CELL_SIZE + 1) * height + 1;
canvas.width = (CELL_SIZE + 1) * width + 1;

const ctx = canvas.getContext('2d');

const renderLoop = () => {
  drawCells();
  drawGrid();

  universe.tick();

  requestAnimationFrame(renderLoop);
};

// ru"ya, hauptstrasse

// TODO: all these `.5`s are totally wrong.
const drawGrid = () => {
  ctx.beginPath();
  ctx.lineWidth = 1 / window.devicePixelRatio;
  ctx.strokeStyle = GRID_COLOR;

  // Vertical lines.
  for (let i = 0; i <= width; i++) {
    ctx.moveTo(i * (CELL_SIZE + 1) + .5, 0);
    ctx.lineTo(i * (CELL_SIZE + 1) + .5, (CELL_SIZE + 1) * height + 1);
  }

  // Horizontal lines.
  for (let j = 0; j <= height; j++) {
    ctx.moveTo(0,                           j * (CELL_SIZE + 1) + .5);
    ctx.lineTo((CELL_SIZE + 1) * width + 1, j * (CELL_SIZE + 1) + .5);
  }

  ctx.stroke();
};

const getIndex = (row, column) => {
  return row * height + column;
};

const drawCells = () => {
  const cellsPtr = universe.cells();
  const cells = new Uint8Array(memory.buffer, cellsPtr, width * height);

  ctx.beginPath();

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {

      const idx = getIndex(row, col);

      ctx.fillStyle = cells[idx] === DEAD
        ? DEAD_COLOR
        : ALIVE_COLOR;

      ctx.fillRect(
        col * (CELL_SIZE + 1) + .5,
        row * (CELL_SIZE + 1) + .5,
        CELL_SIZE,
        CELL_SIZE
      );
    }
  }

  ctx.stroke();
};

requestAnimationFrame(renderLoop);
