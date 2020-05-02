const fs = require('fs');
const {IntCode} = require('./intCode');
const {runIntCode} = require('./intCodeComputer');

const getAllPossibleMoves = function (point) {
  const position = point.split(':');
  const possibleMoves = [];
  possibleMoves.push([+position[0], +position[1] + 1]);
  possibleMoves.push([+position[0], +position[1] - 1]);
  possibleMoves.push([+position[0] - 1, +position[1]]);
  possibleMoves.push([+position[0] + 1, +position[1]]);
  return possibleMoves;
};

const getPoints = function (path) {
  const initialPosition = [0, 0];
  return path.reduce((points, point) => {
    if (point === 10) {
      initialPosition[1] = initialPosition[1] + 1;
      initialPosition[0] = 0;
      return points;
    }
    points[initialPosition.join(':')] = point;
    initialPosition[0] = initialPosition[0] + 1;
    return points;
  }, {});
};

const getIntersectionPoint = function (path) {
  const points = getPoints(path);
  const scaffold = Object.keys(points).filter((point) => points[point] === 35);
  const intersectingPoint = scaffold.filter((point) => {
    const allMoves = getAllPossibleMoves(point);
    return allMoves.filter((move) => points[move.join(':')] === 35).length === 4;
  });
  return intersectingPoint.reduce((count, point) => {
    const [top, left] = point.split(':');
    return count + top * left;
  }, 0);
};

const main = function () {
  const input = JSON.parse(fs.readFileSync('./intCode.json', 'utf8'));
  const intCode = new IntCode(input);
  const path = runIntCode(intCode, []);
  const intersectionPoints = getIntersectionPoint(path);
  console.log(intersectionPoints);
};

main();
