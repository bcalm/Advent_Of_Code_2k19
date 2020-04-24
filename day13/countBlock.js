const fs = require('fs');
const {IntCode} = require('./intCode');
const {runIntCode} = require('./intCodeComputer.js');

const countBlock = function (grid) {
  const tiles = Object.values(grid);
  return tiles.reduce((count, tile) => count + (tile === 2), 0);
};

const main = function () {
  const input = JSON.parse(fs.readFileSync('./intCode.json', 'utf8'));
  const intCode = new IntCode(input);
  const grid = runIntCode(intCode, []);
  console.log(countBlock(grid));
};

main();
