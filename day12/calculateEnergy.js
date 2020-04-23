const [...positions] = require('./moonsPosition.json');

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

const calculateEnergy = function () {
  let steps = 0;
  let moonsPosition = positions;
  while (steps < 1000) {
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

    steps++;
  }
  return moonsPosition.reduce(addEnergy, 0);
};

const main = function () {
  const energy = calculateEnergy();
  console.log(energy);
};

main();
