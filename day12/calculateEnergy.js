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

const compareMoonPosition = function (oldMoon, newMoon, axis) {
  let done = 0;
  for (let index = 0; index < newMoon.length; index++) {
    const isPositionSame = oldMoon[index].positions[axis] === newMoon[index].positions[axis];
    const isVelocitySame = oldMoon[index].velocity[axis] === newMoon[index].velocity[axis];
    done = isPositionSame && isVelocitySame ? done : ++done;
  }
  return !done;
};

const getRepeatedTime = function (positions, axis) {
  let steps = 1;
  const moonsPosition = JSON.parse(JSON.stringify(positions));

  while (true) {
    for (let index = 0; index < moonsPosition.length; index++) {
      moonsPosition.reduce(calculateVelocity, moonsPosition[index]);
    }
    for (let index = 0; index < moonsPosition.length; index++) {
      moonsPosition[index].positions.x += moonsPosition[index].velocity.x;
      moonsPosition[index].positions.y += moonsPosition[index].velocity.y;
      moonsPosition[index].positions.z += moonsPosition[index].velocity.z;
    }

    if (compareMoonPosition(positions, moonsPosition, axis)) {
      break;
    }
    steps++;
  }
  return steps;
};

const greatestCommonDivisor = function (number1, number2) {
  if (number1 == 0) {
    return number2;
  }
  return greatestCommonDivisor(number2 % number1, number1);
};

const findLcmOfTwo = function (number1, number2) {
  const gcd = greatestCommonDivisor(number1, number2);
  const product = number1 * number2;
  return product / gcd;
};

const getLCM = function (num1, num2, num3) {
  return findLcmOfTwo(findLcmOfTwo(num1, num2), num3);
};

const calculateSteps = function (positions) {
  const xPeriod = getRepeatedTime(positions, 'x');
  const yPeriod = getRepeatedTime(positions, 'y');
  const zPeriod = getRepeatedTime(positions, 'z');
  return getLCM(xPeriod, yPeriod, zPeriod);
};

const main = function () {
  const positions = JSON.parse(fs.readFileSync('./moonsPosition.json', 'utf8'));
  const steps = calculateSteps(positions.slice());
  console.log(steps);
};

main();
