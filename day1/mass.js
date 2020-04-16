const fs = require('fs');

const calculateTotalFuel = function (requiredFuel, mass) {
  const fuel = Math.floor(mass / 3) - 2;
  requiredFuel += fuel;
  if (fuel <= 5) {
    return requiredFuel;
  }
  return calculateTotalFuel(requiredFuel, fuel);
};

const calculateFuelForCraftParts = function (totalRequiredFuel, airCraftPartMass) {
  const requiredFuel = Math.floor(airCraftPartMass / 3) - 2;
  return totalRequiredFuel + requiredFuel;
};

const main = function () {
  const airCraftParts = JSON.parse(fs.readFileSync('./craftPartMass.json', 'utf8'));
  const requiredFuel = airCraftParts.reduce(calculateFuelForCraftParts, 0);
  const fuelRequirements = airCraftParts.reduce(calculateTotalFuel, 0);
  console.log(fuelRequirements);
};

main();
