// let deltaX = 32;
// let deltaY = 32;

const playerOne = {
  x: Math.floor(Math.random() * cols) * cellSize,
  y: Math.floor(Math.random() * rows) * cellSize,
  isMoving: false,
  isAlive: true,
}; //starting point for the player One

function movePlayer() {
  let isMoving = false;
  if (keyIsDown(RIGHT_ARROW)) {
    if (playerOne.x < window.innerWidth - 32) {
      playerOne.x++;
      isMoving = true;
    }
  }

  if (keyIsDown(LEFT_ARROW)) {
    if (playerOne.x > 0) {
      playerOne.x--;
      isMoving = true;
    }
  }

  if (keyIsDown(UP_ARROW)) {
    if (playerOne.y > 0) {
      playerOne.y--;
      isMoving = true;
    }
  }

  if (keyIsDown(DOWN_ARROW)) {
    if (playerOne.y < innerHeight - 32 / 2) {
      playerOne.y++;
      isMoving = true;
      //pridat rychlost -> pridej dalsi playerOne.y++
    }
  }

  if (keyIsDown(32)) {
    if (!bombs.length || bombs[bombs.length - 1].placeAt < millis() - 1000) {
      placeBomb(playerOne.x, playerOne.y);
    }
  }

  playerOne.isMoving = isMoving;
}

function drawPlayer() {
  let damping = 0;
  if (playerOne.isMoving) {
    damping = Math.abs(Math.sin(millis() / 100)) * 2; //rozptyl -1 -1
  }

  //millis() -> vraci cislo v milisekundach

  textSize(28);
  if (playerOne.isAlive) {
    text("🐱‍👓", playerOne.x, playerOne.y + damping + 28); //text(str, x, y, [x2], [y2]) -> x, y jsou osy, str = string
  } else {
    text("🦴", playerOne.x, playerOne.y + 28); //28 insure that the icon will be visible when start position is 0, 0
  }

  if (playerOne.x < 0) {
    playerOne.isAlive = false;
  }
}
