const fs = require('fs');

const findXCoordinate = function (map, yCoordinate) {
  let xCoordinate = 0;
  return map.reduce((mapPositions, newPosition) => {
    const statusLookup = {
      '.': 'empty',
      '#': 'asteroid',
    };
    const location = {
      status: statusLookup[newPosition],
      position: [xCoordinate, yCoordinate],
    };
    xCoordinate++;
    mapPositions.push(location);
    return mapPositions;
  }, []);
};

const findAsteroidPosition = function (input) {
  let yCoordinate = 0;
  return input.reduce((map, newPosition) => {
    const position = findXCoordinate(newPosition.split(''), yCoordinate);
    yCoordinate++;
    map.push(position);
    return map;
  }, []);
};

const main = function () {
  const input = `.#..#
.....
#####
....#
...##`;
  const map = findAsteroidPosition(input.split('\n'));
};

main();
