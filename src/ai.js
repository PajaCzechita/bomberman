function makeEnemy(x, y) {
  return {
    type: "enemy",
    x: Math.floor(Math.random() * cols) * cellSize,
    y: Math.floor(Math.random() * rows) * cellSize,
    lastMove: millis(),
    alive: true,
  };
}

function drawEnemies() {
  for (const enemy of enemies) {
    console.log(enemy);
    text("🎃", enemy.x, enemy.y + 28);
  }
}

function moveEnemies() {
  for (const enemy of enemies) {
    const enemyGrid = positionToCellsIdx(enemy);
    const playerGrid = positionToCellsIdx(playerOne);
    //find path

    const path = findPath(enemyGrid, playerGrid, grid);

    if (path) {
      // console.log(path);
      const [yi, xi] = path[0];
      const targetPx = xi * cellSize;
      const targetPy = yi * cellSize;
      if (enemy.x < targetPx) {
        enemy.x++;
      }
      if (enemy.y < targetPy) {
        enemy.y++;
      }
    }
  }
}

//breath-first search -> inverzní rekurze
//depth-first search
//hackerrank.com

//FIFO -> first in - first out
//const queue = []
//LIFO -> last in - first out
//const stack = []

findPath;
