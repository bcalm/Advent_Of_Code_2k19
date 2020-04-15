const fs = require('fs');
const intersects = function (a, b, c, d, p, q, r, s) {
  let det, gamma, lambda;
  det = (c - a) * (s - q) - (r - p) * (d - b);
  if (det === 0) {
    return false;
  }
  lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
  gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
  return 0 < lambda && lambda < 1 && 0 < gamma && gamma < 1;
};

const calculateIntersectionPoint = function (a, b, c, d) {
  if (!intersects(a[0], a[1], b[0], b[1], c[0], c[1], d[0], d[1])) {
    return [0, 0];
  }
  const t1 = (a[0] - c[0]) * (c[1] - d[1]) - (a[1] - c[1]) * (c[0] - d[0]);
  const t2 = (a[0] - b[0]) * (c[1] - d[1]) - (a[1] - b[1]) * (c[0] - d[0]);
  const t = t1 / t2;
  return [a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1])];
};

const calculateManhattanDistance = function (firstWirePoints, secondWirePoint) {
  let manhattanDistance = 100000;
  for (let idx = 1; idx < firstWirePoints.length - 1; idx++) {
    for (let index = 1; index < secondWirePoint.length - 1; index++) {
      const intersectionPoint = calculateIntersectionPoint(
        firstWirePoints[idx],
        firstWirePoints[idx + 1],
        secondWirePoint[index],
        secondWirePoint[index + 1]
      );
      const distance = Math.abs(intersectionPoint[0]) + Math.abs(intersectionPoint[1]);
      if (manhattanDistance > distance && distance) {
        manhattanDistance = distance;
      }
    }
  }
  return manhattanDistance;
};

const calculateSteps = function (steps, point) {
  const length = +point.substr(1);
  return steps + length;
};

const calculateDistance = function (pointA, pointB) {
  const dx = Math.pow(pointA[0] - pointB[0], 2);
  const dy = Math.pow(pointA[1] - pointB[1], 2);
  return Math.sqrt(dx + dy);
};

const calculateFewerSteps = function (
  firstWirePoints,
  secondWirePoint,
  firstWirePath,
  secondWirePath
) {
  let fewerSteps = 10000000000;
  let steps = 00;
  for (let idx = 1; idx < firstWirePoints.length - 1; idx++) {
    for (let index = 1; index < secondWirePoint.length - 1; index++) {
      const intersectionPoint = calculateIntersectionPoint(
        firstWirePoints[idx],
        firstWirePoints[idx + 1],
        secondWirePoint[index],
        secondWirePoint[index + 1]
      );
      if (intersectionPoint[0] || intersectionPoint[1]) {
        const firstPathSteps = firstWirePath.slice(0, idx + 1).reduce(calculateSteps, 0);
        const secondPathSteps = secondWirePath.slice(0, index + 1).reduce(calculateSteps, 0);
        const extraLength =
          calculateDistance(intersectionPoint, firstWirePoints[idx + 1]) +
          calculateDistance(intersectionPoint, secondWirePoint[index + 1]);
        steps = firstPathSteps + secondPathSteps - extraLength;
      }
      if (fewerSteps > steps && steps) {
        fewerSteps = steps;
      }
    }
  }
  return fewerSteps;
};

const convertInCoordinate = function (path, point) {
  const direction = point.charAt(0);
  const lastPoint = path[path.length - 1];
  const length = +point.substr(1);
  let newPoint;
  if (direction == 'R') {
    newPoint = [lastPoint[0] + length, lastPoint[1]];
  }
  if (direction == 'L') {
    newPoint = [lastPoint[0] - length, lastPoint[1]];
  }
  if (direction == 'U') {
    newPoint = [lastPoint[0], lastPoint[1] + length];
  }
  if (direction == 'D') {
    newPoint = [lastPoint[0], lastPoint[1] - length];
  }
  path.push(newPoint);
  return path;
};

const main = function () {
  const firstWirePath = JSON.parse(fs.readFileSync('./data/firstWirePath.json', 'utf8'));
  const secondWirePath = JSON.parse(fs.readFileSync('./data/secondWirePath.json', 'utf8'));
  const firstWirePoints = firstWirePath.reduce(convertInCoordinate, [[0, 0]]);
  const secondWirePoint = secondWirePath.reduce(convertInCoordinate, [[0, 0]]);
  const manhattanDistance = calculateManhattanDistance(firstWirePoints, secondWirePoint);
  const fewerSteps = calculateFewerSteps(
    firstWirePoints,
    secondWirePoint,
    firstWirePath,
    secondWirePath
  );
  console.log(fewerSteps);
};

main();
