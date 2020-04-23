const fs = require('fs');

const findCordVelocity = function (firstPosition, secondPosition) {
  if (firstPosition < secondPosition) return 1;
  if (firstPosition > secondPosition) return -1;
  return 0;
};

const calculateVelocity = function (moonPosition, newMoon) {
  moonPosition.velocity.x += findCordVelocity(moonPosition.positions.x, newMoon.positions.x);
  moonPosition.velocity.y += findCordVelocity(moonPosition.positions.y, newMoon.positions.y);
  moonPosition.velocity.z += findCordVelocity(moonPosition.positions.z, newMoon.positions.z);
  return moonPosition;
};

const addEnergy = function (totalEnergy, moon) {
  const {positions, velocity} = moon;
  const pot = Math.abs(positions.x) + Math.abs(positions.y) + Math.abs(positions.z);
  const kin = Math.abs(velocity.x) + Math.abs(velocity.y) + Math.abs(velocity.z);
  return totalEnergy + pot * kin;
};

const compareMoonPosition = function (oldMoon, newMoon) {
  const oldPosition = oldMoon.positions;
  const oldVelocity = oldMoon.velocity;
  const newPosition = newMoon.positions;
  const newVelocity = newMoon.velocity;
  const isXEqual = oldVelocity.x === newVelocity.x && oldPosition.x === newPosition.x;
  const isYEqual = oldVelocity.y === newVelocity.y && oldPosition.y === newPosition.y;
  const isZEqual = oldVelocity.z === newVelocity.z && oldPosition.z === newPosition.z;
  return isXEqual && isYEqual && isZEqual;
};

const compareNewPosition = function (positions, moonsPosition) {
  const isFirstOneIsInSamePosition = compareMoonPosition(positions[0], moonsPosition[0]);
  const isSecondOneIsInSamePosition = compareMoonPosition(positions[1], moonsPosition[1]);
  const isThirdOneIsInSamePosition = compareMoonPosition(positions[2], moonsPosition[2]);
  const isFourthOneIsInSamePosition = compareMoonPosition(positions[3], moonsPosition[3]);
  return (
    isFirstOneIsInSamePosition &&
    isSecondOneIsInSamePosition &&
    isThirdOneIsInSamePosition &&
    isFourthOneIsInSamePosition
  );
};

const calculateEnergy = function (initialPosition) {
  let steps = 1;
  const moonsPosition = initialPosition.slice();

  while (true) {
    for (let index = 0; index < moonsPosition.length; index++) {
      let moons = moonsPosition.slice();
      moons.splice(index, 1);
      moons[index] = moons.reduce(calculateVelocity, moonsPosition[index]);
      moonsPosition[index] = moons[index];
    }

    for (let index = 0; index < moonsPosition.length; index++) {
      moonsPosition[index].positions.x += moonsPosition[index].velocity.x;
      moonsPosition[index].positions.y += moonsPosition[index].velocity.y;
      moonsPosition[index].positions.z += moonsPosition[index].velocity.z;
    }
    const originals = require('./moonsPosition.json');

    if (compareNewPosition(originals, moonsPosition)) {
      break;
    }
    steps++;
  }
  return steps;
};

const main = function () {
  const positions = JSON.parse(fs.readFileSync('./moonsPosition.json', 'utf8'));
  const steps = calculateEnergy(positions.slice());
  console.log(steps);
};

main();
