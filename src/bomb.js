let bombs = [];
let explosions = [];

function placeBomb(x, y) {
  x = Math.round(x / cellSize) * cellSize;
  y = Math.round(y / cellSize) * cellSize;

  const bomb = { x, y, placedAt: millis() };
  bombs.push(bomb);
}

function drawBombs() {
  for (const bomb of bombs) {
    text("💣", bomb.x, bomb.y + magicNumber);
  }
  drawExplosions();
  cleanupExplosions();
}

function detonateBombs() {
  const allBombs = bombs;
  const newBombs = []; //bombs that did not yet detonate
  for (const bomb of allBombs) {
    if (bomb.placedAt < millis() - 3000) {
      //play sound if bomb detonate
      explosionSound.play();
      //addExplosion(bomb.x, bomb.y);

      const range = 3;
      for (let i = range / -2; i < range / 2; i++) {
        for (let j = range / -2; j < range / 2; j++) {
          addExplosion(
            bomb.x + cellSize * i + cellSize / 2,
            bomb.y + cellSize * j + cellSize / 2
          );
        }
      }
    } else {
      newBombs.push(bomb);
    }
  }

  bombs = newBombs; //adding the new not detonated bombs
}

function addExplosion(x, y) {
  const explosion = {
    x,
    y,
    placedAt: millis(),
  };
  explosions.push(explosion);
}

function drawExplosions() {
  for (const explosion of explosions) {
    text("💥", explosion.x, explosion.y + magicNumber);
  }
}

function cleanupExplosions() {
  const newExplosions = [];

  for (const ex of explosions) {
    if (ex.placedAt < millis() - 1000) {
      //this is cleaning the field if bomb expload

      const positionToCleanAfterExplosion = positionToCellsIdx(ex);
      if (
        grid[positionToCleanAfterExplosion.yi][
          positionToCleanAfterExplosion.xi
        ] !== 3
      ) {
        grid[positionToCleanAfterExplosion.yi][
          positionToCleanAfterExplosion.xi
        ] = 0;

        //tady pak budeme zabijet enemy?
      }
      // should remove
    } else {
      //keep explosions
      newExplosions.push(ex);
    }
  }

  explosions = newExplosions;
}

//ukazka cyklu

// const pole = [0,1,2,3,4,5,6,7,8,9];

// for (let i = 0; i < 10; i++) {
//   const item = pole[i];
//   console.log(item)
// }

// for (const item of pole) {
//   console.log(item)
// }

// let i = 0;
// while (i < pole.length) {
//   const item = pole[i];
//   console.log(item)
//   i++;
// }
