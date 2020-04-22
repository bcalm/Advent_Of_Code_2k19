const fs = require('fs');
const {Grid} = require('./grid');

const getBestMonitoringLocation = function (grid, asteroids) {
  const location = {
    asteroidsCounts: -1,
    asteroidsLocation: null,
  };
  for (let i = 0; i < asteroids.length; i++) {
    const asteroidsCounts = grid.getAsteroidCount(asteroids[i].position);
    if (asteroidsCounts > location.asteroidsCounts) {
      location.asteroidsCounts = asteroidsCounts;
      location.asteroidsLocation = asteroids[i].position;
    }
  }
  return location;
};

const vaporizedAsteroid = function (map, index) {
  const blast = map[index].findIndex((e) => e.mark == false);
  if (blast >= 0) {
    map[blast].mark = true;
    return map;
  }
  return vaporizedAsteroid(map, index + 1);
};

const blast = function (map) {
  let destroyed = 0;
  let location = null;
  for (let index = 0; index < map.length; index++) {
    map = vaporizedAsteroid(map, index);
    destroyed++;
    if (destroyed == 200) {
      location = map[index][0].position;
      break;
    }
  }
  return location;
};

const divideInCategory = function (angles) {
  return angles.reduce(
    (categorizedAngle, element) => {
      if (categorizedAngle[categorizedAngle.length - 1][0].angle == element.angle) {
        categorizedAngle[categorizedAngle.length - 1].push(element);
      } else {
        categorizedAngle.push([element]);
      }
      return categorizedAngle;
    },
    [[angles[0]]]
  );
};

const getVaporizeAsteroidLocation = function (grid, location) {
  const asteroids = grid.getAllAsteroid();
  const angles = asteroids
    .map((asteroid) => grid.polar(location, asteroid))
    .sort((a, b) => a.angle - b.angle);
  const categorizedAngle = divideInCategory(angles);
  const sortByDistance = categorizedAngle.map((angle) =>
    angle.sort((a, b) => a.distance - b.distance)
  );
  return blast(sortByDistance);
};

const main = function () {
  const input = fs.readFileSync('./asteroidPosition.json', 'utf8');
  const grid = new Grid(input);
  const asteroids = grid.getAllAsteroid();

  /* Part one implementation Best Location is [22, 28]*/
  // const bestMonitoringLocation = getBestMonitoringLocation(grid, asteroids);

  /* Part two implementation*/
  const vaporizedAsteroidLocation = getVaporizeAsteroidLocation(grid, [22, 28]);
  console.log(vaporizedAsteroidLocation);
};

main();
