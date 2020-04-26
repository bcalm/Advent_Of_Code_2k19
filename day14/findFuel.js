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
  if (inputChemical === 'ORE') return ore;

  remaining[inputChemical] = remaining[inputChemical] ? remaining[inputChemical] : 0;
  const extra = Math.min(ore, remaining[inputChemical]);
  ore -= extra;
  remaining[inputChemical] -= extra;

  const {count, inputs} = reactions[inputChemical];
  let oreCount = 0;

  inputs.forEach((input) => {
    const [reagentCount, chemical] = input;
    const multiple = Math.ceil(ore / +count) * +reagentCount;
    oreCount += getOreCount(reactions, chemical, multiple, remaining);
  });

  remaining[inputChemical] += Math.ceil(ore / count) * count - ore;
  return oreCount;
};

const main = function () {
  const reactionInputs = fs.readFileSync('reaction.json', 'utf8');
  const reactions = reactionInputs.split('\n').reduce(parseReactions, {});
  console.log(getOreCount(reactions, 'FUEL'));
};

main();
