/* Herní mřížka = množina čtverečků, která se nám vejde na plochu -> chceme ji generovat */

const cellSize = 32;
const rows = window.innerHeight / cellSize; //kolik radku se tam vejde
const cols = window.innerWidth / cellSize; //kolik sloupcu se tam vejde

function setup() {
  createCanvas(cols * cellSize, rows * cellSize);

  // Load assets
  explosionSound = loadSound("sound/explosion.mp3");
}

function draw() {
  background(220);

  fill(98, 166, 124); //voli barvu štětce

  //rect(x, y, w, h, [detailX], [detailY])x -> pozice zleva, pozice zprava, sirka, vyska
  //rect(30, 20, 50, 50); //draw the rectangle on the canvas check the library p5js.org/reference

  // iy => counts rows
  // iy => counts cols
  for (let iy = 0; iy < rows; iy++) {
    for (let ix = 0; ix < cols; ix++) {
      rect(ix * cellSize, iy * cellSize, cellSize);
    }
  }
  detonateBombs();
  drawBomb();
  movePlayer();
  drawPlayer();
}
