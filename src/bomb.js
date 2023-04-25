let bombs = [];

function placeBomb(x, y) {
  const bomb = {
    x,
    y,
    placedAt: millis(),
  };
  bombs.push(bomb);
}

function drawBomb() {
  for (const bomb of bombs) {
    text("💣", bomb.x, bomb.y + 24);
  }
}

function detonateBombs() {
  const newBombs = [];
  for (const bomb of bombs) {
    if (bomb && bomb.placedAt < millis() - 3000) {
      explosionSound.play();
    }
  }
}
