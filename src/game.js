/* Herní mřížka = množina čtverečků, která se nám vejde na plochu -> chceme ji generovat */

const cellSize = 34;
const rows = window.innerHeight / cellSize; //kolik radku se tam vejde
const cols = window.innerWidth / cellSize; //kolik sloupcu se tam vejde
const magicNumber = 28; //Y offset for emojis
const grid = [];
const enemies = [];

function setup() {
  /*
  function preload() {
    here put images
  }
  */

  frameRate(50);
  createCanvas(cols * cellSize, rows * cellSize);

  //generating starting game field
  for (let iy = 0; iy < rows; iy++) {
    const row = [];
    for (let ix = 0; ix < cols; ix++) {
      if (Math.random() > 0.9) {
        row.push(2);
      } else if (Math.random() > 0.95) {
        row.push(3);
      } else {
        row.push(0);
      }
    }
    grid.push(row);
  }

  const player = positionToCellsIdx(playerOne);
  grid[player.yi][player.xi] = 0;

  enemies.push(makeEnemy(0, 0));

  // Load assets
  explosionSound = loadSound("sound/explosion.mp3");
}

function draw() {
  background(220);

  // Draw grid
  fill(98, 166, 124); //voli barvu štětce

  //rect(x, y, w, h, [detailX], [detailY])x -> pozice zleva, pozice zprava, sirka, vyska
  //rect(30, 20, 50, 50); //draw the rectangle on the canvas check the library p5js.org/reference

  // iy => counts rows
  // iy => counts cols

  for (let iy = 0; iy < rows; iy++) {
    for (let ix = 0; ix < cols; ix++) {
      rect(ix * cellSize, iy * cellSize, cellSize);
      if (grid[iy][ix] === 2) {
        text("🌳", ix * cellSize, iy * cellSize + 28);
      } else if (grid[iy][ix] === 3) {
        text("🧱", ix * cellSize, iy * cellSize + 28);
      }
    }
  }

  // Bombs
  detonateBombs();
  drawBombs();
  drawEnemies();

  // Handle user input and draw player
  movePlayer();
  drawPlayer();
}
