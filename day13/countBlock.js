const fs = require('fs');
const {IntCode} = require('./intCode');
const {runIntCode} = require('./intCodeComputer.js');

/* For counting count block part_1 Answer is 309
const countBlock = function (grid) {
  return grid.reduce((count, tile) => count + (Object.values(tile)[0] === 2), 0);
};
*/

const paintTile = function (grid, output) {
  const [x, y, tileType] = output;
  const tile = {};
  tile[[x, y].join(':')] = tileType;
  grid.push(tile);
  return grid;
};

const createGrid = function (outputs) {
  const categorizedOutput = outputs.reduce(
    (grid, output) => {
      if (grid[grid.length - 1].length < 3) {
        grid[grid.length - 1].push(output);
      } else {
        grid.push([output]);
      }
      return grid;
    },
    [[]]
  );
  return categorizedOutput.reduce(paintTile, []);
};

const blastBlockTiles = function (grid) {
  let score = 0;
  const [ball] = grid.filter((tile) => Object.values(tile)[0] === 4);
  const ballPosition = Object.keys(ball)[0].split(':');
  console.log(ballPosition);

  return score;
};

const main = function () {
  const input = JSON.parse(fs.readFileSync('./intCode.json', 'utf8'));
  const intCode = new IntCode(input);
  const output = runIntCode(intCode, []);
  console.log(output);

  // const grid = createGrid(output);
  // const score = blastBlockTiles(grid);

  /* Part_1 Implementation
  console.log(countBlock(grid));
  */
};

main();
