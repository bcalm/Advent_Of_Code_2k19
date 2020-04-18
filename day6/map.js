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

const main = function () {
  const orbitsList = fs.readFileSync('./mapInput.json', 'utf8').split('\n');
  const mapInput = orbitsList.map((map) => {
    orbit = map.split(')');
    return {planet: orbit[0], satellite: orbit[1]};
  });
  const totalOrbit = findTotalOrbit(mapInput);
  console.log(totalOrbit);
};

main();
