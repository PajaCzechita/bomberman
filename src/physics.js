// curent position of the player
//const currentColField = Math.round(playerOne.y / cellSize);
//const currentrowField = Math.round(playerOne.x / cellSize);

function isCollidingWithObstacles(destination) {
  //console.log("destination:", destinationCell);

  const xi = destination.xi;
  const yi = destination.yi;
  //console.log(grid, yi, xi);
  const content = grid[yi][xi];
  //console.log("grid:", grid[yi][xi]);

  if (yi < 0 || xi < 0 || yi >= grid.length || xi >= grid[0].length) {
    return true;
  }

  if (content === 0) {
    return false;
  }
  return true;
}
