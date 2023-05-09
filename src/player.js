// let deltaX = 32;
// let deltaY = 32;

const playerOne = {
  x: Math.floor(Math.random() * cols) * cellSize,
  y: Math.floor(Math.random() * rows) * cellSize,
  isMoving: false,
  isAlive: true,
}; //starting point for the player One

function movePlayer() {
  //look for the position of the player
  //console.log(grid[Math.round(playerOne.y / cellSize)][Math.round(playerOne.x / cellSize)]);

  let isMoving = false;
  const speed = Math.floor(deltaTime * 0.2);

  let dx = 0; //deltaX - with this movineg the arrows
  let dy = 0; //deltaY - with this movineg the arrows

  if (keyIsDown(RIGHT_ARROW)) {
    if (playerOne.x < window.innerWidth - 32) {
      dx = 1;
      //console.log(playerOne.x, pixelsToCellsIdx(playerOne));
      isMoving = true;
    }
  }

  if (keyIsDown(LEFT_ARROW)) {
    if (playerOne.x > 0) {
      dx = -1;
      isMoving = true;
    }
  } else if (keyIsDown(UP_ARROW)) {
    if (playerOne.y > 0) {
      dy = -1;
      isMoving = true;
    }
  }

  if (keyIsDown(DOWN_ARROW)) {
    if (playerOne.y < innerHeight - 32 / 2) {
      dy = +1;
      isMoving = true;
      //pridat rychlost -> pridej dalsi playerOne.y++
    }
  }

  if (keyIsDown(32)) {
    if (!bombs.length || bombs[bombs.length - 1].placedAt < millis() - 1000) {
      placeBomb(playerOne.x, playerOne.y);
    }
  }

  const margin = 3;
  const destinationLT = positionToCellsIdx({
    x: playerOne.x + dx * speed + 2,
    y: playerOne.y + dy * speed + 2,
  });
  const destinationRT = positionToCellsIdx({
    x: playerOne.x + cellSize - 1 + dx * speed - margin,
    y: playerOne.y + dy * speed + margin,
  });

  const destinationRB = positionToCellsIdx({
    x: playerOne.x + cellSize - 1 + dx * speed - margin,
    y: playerOne.y + cellSize - 1 + dy * speed - margin,
  });

  const destinationLB = positionToCellsIdx({
    x: playerOne.x + dx * speed + margin,
    y: playerOne.y + cellSize - 1 + dy * speed - margin,
  });
  //console.log("dest:", destinationCell);

  // console.log(
  //   "destinationOfCorners:",
  //   destinationLB,
  //   destinationLT,
  //   destinationRB,
  //   destinationRT
  // );

  //dej si pozice do pole a udelej ten kod pres some() -> ta ocekava dalsi funkci a to dam do podminky

  if (
    isCollidingWithObstacles(destinationLB) ||
    isCollidingWithObstacles(destinationLT) ||
    isCollidingWithObstacles(destinationRB) ||
    isCollidingWithObstacles(destinationRT)
  ) {
    return;
  }

  playerOne.isMoving = isMoving;
  playerOne.x += dx * speed;
  playerOne.y += dy * speed;

  //player died
  if (
    playerOne.x < 0 ||
    playerOne.x > width ||
    playerOne.y < 0 ||
    playerOne.y > height
  ) {
    playerOne.isAlive = false;
  }
}

//fci that draw the player
function drawPlayer() {
  let damping = 0;
  if (playerOne.isMoving && playerOne.isAlive) {
    damping = Math.abs(Math.sin(millis() / 100)) * 2; //rozptyl -1 -1
  }

  //millis() -> vraci cislo v milisekundach

  textSize(32);
  if (playerOne.isAlive) {
    text("🦝", playerOne.x, playerOne.y + damping + 28); //text(str, x, y, [x2], [y2]) -> x, y jsou osy, str = string
  } else {
    text("🦴", playerOne.x, playerOne.y + 28); //magicNumber insure that the icon will be visible when start position is 0, 0
  }
}
