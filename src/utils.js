/* In position is
@param {x: number, y: number} position
@return {xi: number, yi: number}
*/

function positionToCellsIdx(position) {
  const rowIdx = Math.floor(position.y / cellSize);
  const colIdx = Math.floor(position.x / cellSize);

  return { xi: colIdx, yi: rowIdx };
}
