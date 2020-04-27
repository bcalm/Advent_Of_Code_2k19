const fs = require('fs');

const getReagents = function (inputChemicals) {
  const reagent = [];
  inputChemicals.split(', ').forEach((inputChemical) => {
    reagent.push(inputChemical.split(' '));
  });
  return reagent;
};

const parseReactions = function (reactions, reactionInput) {
  const [inputChemicals, product] = reactionInput.split(' => ');
  const reagents = getReagents(inputChemicals);
  const [count, productName] = product.split(' ');
  reactions[productName] = {count: +count, inputs: reagents};
  return reactions;
};

const getOreCount = function (reactions, inputChemical, ore = 1, remaining = {}) {
  if (inputChemical === 'ORE') return {ore, remaining};

  remaining[inputChemical] = remaining[inputChemical] ? remaining[inputChemical] : 0;
  const extra = Math.min(ore, remaining[inputChemical]);
  ore -= extra;
  remaining[inputChemical] -= extra;

  const {count, inputs} = reactions[inputChemical];
  let oreCount = 0;

  inputs.forEach((input) => {
    const [reagentCount, chemical] = input;
    const multiple = Math.ceil(ore / +count) * +reagentCount;
    const result = getOreCount(reactions, chemical, multiple, remaining);
    oreCount += result.oreCount === undefined ? result.ore : result.oreCount;
  });
  remaining[inputChemical] += Math.ceil(ore / count) * count - ore;
  return {oreCount, remaining};
};

const getMaxFuel = function (reactions, oreCount) {
  const maxLimit = 1000000000000;
  let totalOre = 0;
  let fuel = Math.ceil(maxLimit / oreCount);
  while (totalOre < maxLimit) {
    const oreCounts = getOreCount(reactions, 'FUEL', fuel).oreCount;
    const remainOre = maxLimit - oreCounts;
    fuel += Math.floor(remainOre / oreCount) || 1;
    totalOre = getOreCount(reactions, 'FUEL', fuel).oreCount;
  }
  return fuel - 1;
};

const main = function () {
  const reactionInputs = fs.readFileSync('reaction.json', 'utf8');
  const reactions = reactionInputs.split('\n').reduce(parseReactions, {});
  const {oreCount} = getOreCount(reactions, 'FUEL');
  console.log(getMaxFuel(reactions, oreCount));
};

main();
