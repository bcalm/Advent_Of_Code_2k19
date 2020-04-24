const {IntCode} = require('./intCode');
const {runIntCode} = require('./intCodeComputer');
const fs = require('fs');

const main = function () {
  const boostInput = JSON.parse(fs.readFileSync('./boostInput.json', 'utf8'));
  const input = new IntCode(boostInput);
  const boost = runIntCode(input, [1]);
  console.log(boost);
};

main();
