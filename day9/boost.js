const {IntCode} = require('./intCode');
const {runIntCode} = require('./intCodeComputer');
const fs = require('fs');

const main = function () {
  const boostInput = JSON.parse(fs.readFileSync('./boostInput.json', 'utf8'));

  // const boostInput = [109, 1, 204, -1, 1001, 100, 1, 100, 1008, 100, 16, 101, 1006, 101, 0, 99];
  const input = new IntCode(boostInput);
  const boost = runIntCode(input, [1]);
  console.log(boost);
};

main();
