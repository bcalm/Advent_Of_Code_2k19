const calcLength = function (x1, y1, x2, y2) {
  const dx = Math.pow(x1 - x2, 2);
  const dy = Math.pow(y1 - y2, 2);
  return Math.sqrt(dx + dy);
};

const calcAngle = function (x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const angle = Math.atan2(dy, dx) * (180 / Math.PI) - 90;
  return angle < 0 ? angle + 360 : angle;
};

const isPointOnLine = function (firstPoint, secondPoint, thirdPoint) {
  const x1 = firstPoint[0];
  const x2 = secondPoint[0];
  const x3 = thirdPoint[0];
  const y1 = firstPoint[1];
  const y2 = secondPoint[1];
  const y3 = thirdPoint[1];
  const firstLength = calcLength(x1, y1, x2, y2);
  const secondLength = calcLength(x2, y2, x3, y3);
  const totalLength = calcLength(x1, y1, x3, y3).toFixed(6);
  return totalLength === (firstLength + secondLength).toFixed(6);
};

const getCount = function (firstPoint, secondPoint, asteroids) {
  const count = asteroids.reduce((count, point) => {
    const checkBetween = isPointOnLine(firstPoint, point.position, secondPoint);
    return checkBetween ? ++count : count;
  }, 0);
  return count === 2 ? 1 : 0;
};

class Grid {
  constructor(points) {
    this.points = points.split('\n');
    this.xCoordinate = 0;
    this.yCoordinate = 0;
    this.statusLookup = {
      '.': 'empty',
      '#': 'asteroid',
    };
    this.asteroidPosition = this.findAsteroidPosition().flat(1);
  }

  findXCoordinate = function (map) {
    this.xCoordinate = 0;
    return map.reduce((mapPositions, newPosition) => {
      const location = {
        status: this.statusLookup[newPosition],
        position: [this.xCoordinate, this.yCoordinate],
      };
      this.xCoordinate++;
      mapPositions.push(location);
      return mapPositions;
    }, []);
  };

  findAsteroidPosition = function () {
    return this.points.reduce((map, newPosition) => {
      const position = this.findXCoordinate(newPosition.split(''));
      this.yCoordinate++;
      map.push(position);
      return map;
    }, []);
  };

  getAllAsteroid() {
    return this.asteroidPosition.filter((e) => e.status === 'asteroid');
  }

  getAsteroidCount(asteroidPosition) {
    return this.getAllAsteroid().reduce((count, asteroid) => {
      const value = getCount(asteroidPosition, asteroid.position, this.getAllAsteroid());
      return count + value;
    }, 0);
  }

  polar(location, asteroid) {
    const {position} = asteroid;
    const distance = calcLength(position[0], position[1], location[0], location[1]);
    const angle = calcAngle(position[0], position[1], location[0], location[1]);
    const mark = false;
    return {distance, angle, position, mark};
  }
}
module.exports = {Grid};
