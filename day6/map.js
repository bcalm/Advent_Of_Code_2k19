const fs = require('fs');

const getOrbit = function (list, orbit) {
  return list.find((o) => orbit.planet == o.satellite);
};

const getOrbitCount = function (orbit, mapInput) {
  if (!mapInput.includes(orbit)) {
    return 0;
  }
  return 1 + getOrbitCount(getOrbit(mapInput, orbit), mapInput);
};

const findTotalOrbit = function (mapInput) {
  return mapInput.reduce((sum, orbit) => sum + getOrbitCount(orbit, mapInput), 0);
};

const getAllOrbit = function (orbit, mapInput, allOrbit = []) {
  if (!mapInput.includes(orbit)) {
    return allOrbit;
  }
  allOrbit.push(orbit);
  return getAllOrbit(getOrbit(mapInput, orbit), mapInput, allOrbit);
};

const removeDuplicateElement = function (array) {
  return (
    array.reduce((newArray, ele) => {
      if (array.indexOf(ele) == array.lastIndexOf(ele)) {
        newArray.push(ele);
      }
      return newArray;
    }, []).length - 2
  );
};

const getDistanceToSanta = function (mapInput) {
  const myAddress = mapInput.find((map) => map.satellite == 'YOU');
  const santaAddress = mapInput.find((map) => map.satellite == 'SAN');
  const allMyOrbit = getAllOrbit(myAddress, mapInput);
  const allOrbit = getAllOrbit(santaAddress, mapInput, allMyOrbit);
  const minimumSteps = removeDuplicateElement(allOrbit);
  return minimumSteps;
};

const main = function () {
  const orbitsList = fs.readFileSync('./mapInput.json', 'utf8').split('\n');
  const mapInput = orbitsList.map((map) => {
    orbit = map.split(')');
    return {planet: orbit[0], satellite: orbit[1]};
  });
  const totalOrbit = findTotalOrbit(mapInput);
  const minimumStepsToSanta = getDistanceToSanta(mapInput);
  console.log(minimumStepsToSanta);
};

main();
