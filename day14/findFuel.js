const fs = require('fs');

const getReagent = function (reagentList) {
  const reagents = [];
  reagentList.split(', ').forEach((reagent) => {
    reagents.push(reagent.split(' '));
  });
  return reagents;
};

const getReactions = function (reactions) {
  reactions = reactions.split('\n').map((reaction) => reaction.split(' => '));
  return reactions.map((reaction) => {
    const reactionDetails = {};
    reactionDetails.reagent = getReagent(reaction[0]);
    reactionDetails.product = reaction[1].split(' ');
    return reactionDetails;
  });
};

const getInputChemicals = function (reactions, outputChemical) {
  reactions = JSON.parse(JSON.stringify(reactions));
  if (outputChemical[1] === 'ORE') return [outputChemical];
  const correctReaction = reactions.find((reaction) => reaction.product[1] == outputChemical[1]);
  if (correctReaction && correctReaction.reagent[0][1] === 'ORE') return [outputChemical];
  const productCount = +correctReaction.product[0];
  correctReaction.reagent = correctReaction.reagent.map((reagent) => {
    return [+reagent[0] * Math.ceil(+outputChemical[0] / productCount), reagent[1]];
  });
  return correctReaction.reagent;
};

const isAllOre = function (fuelReagent, reactions) {
  const oreProduct = reactions.map((reaction) => {
    if (reaction.reagent[0][1] == 'ORE') {
      return reaction.product[1];
    }
  });
  return (
    fuelReagent.filter((reagent) => oreProduct.includes(reagent[1])).length == fuelReagent.length
  );
};

const getOreProduct = function (reactions, fuelReagent) {
  if (isAllOre(fuelReagent, reactions)) return fuelReagent;

  const inputChemicals = fuelReagent
    .map((reagent) => getInputChemicals(reactions, reagent))
    .flat(1);
  return getOreProduct(reactions, inputChemicals);
};

const isExists = function (product, uniqProduct) {
  return uniqProduct.filter((element) => element[1] === product).length;
};

const getUniqProduct = function (oreProduct) {
  return oreProduct.reduce((uniqProducts, product) => {
    if (isExists(product[1], uniqProducts)) {
      const index = uniqProducts.findIndex((element) => element[1] === product[1]);
      uniqProducts[index][0] += product[0];
    } else {
      uniqProducts.push(product);
    }
    return uniqProducts;
  }, []);
};

const getOreCount = function (product, reactions) {
  const count = product.reduce((count, newProduct) => {
    const relation = reactions.find((elem) => elem.product[1] === newProduct[1]);
    const productMade = Math.ceil(newProduct[0] / +relation.product[0]);
    return count + relation.reagent[0][0] * productMade;
  }, 0);
  return count;
};

const calculateOREForFuel = function (reactions) {
  const fuelReagent = getInputChemicals(reactions, ['1', 'FUEL']);
  const oreProduct = getOreProduct(reactions, fuelReagent);
  const uniqProduct = getUniqProduct(oreProduct);
  const oreCount = getOreCount(uniqProduct, reactions);
  console.log(oreCount);
};

const main = function () {
  const reactionInput = fs.readFileSync('reaction.json', 'utf8');
  const reactions = getReactions(reactionInput);
  const oreCount = calculateOREForFuel(reactions);
};

main();
