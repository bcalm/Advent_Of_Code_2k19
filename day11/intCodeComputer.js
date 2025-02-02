const fs = require('fs');
const {Robot} = require('./robot');
const {IntCode} = require('./intCode');

let memory, robot;

const addZero = function (number) {
  const string = number.toString();
  const extraZero = '0'.repeat(5 - string.length);
  return extraZero + string;
};

const getJumpLength = function (dest) {
  return dest === null ? 3 : memory.getDistanceFromPtr(dest);
};

const add = function (dest, ip1, ip2) {
  return memory.updateMemory(dest, ip1 + ip2);
};

const mul = function (dest, ip1, ip2) {
  return memory.updateMemory(dest, ip1 * ip2);
};

const readIn = function (dest) {
  return memory.updateMemory(dest, robot.currentPanelColor());
};

const printOutput = function (content) {
  return robot.storeOutput(content);
};

const jumpIfFalse = function (ip1, dest) {
  return ip1 === 0 ? dest : null;
};

const jumpIfTrue = function (ip1, dest) {
  return ip1 !== 0 ? dest : null;
};

const equals = function (ip1, ip2, dest) {
  const result = ip1 === ip2 ? 1 : 0;
  return memory.updateMemory(dest, result);
};

const lessThan = function (ip1, ip2, dest) {
  const result = ip1 < ip2 ? 1 : 0;
  return memory.updateMemory(dest, result);
};

const moveRelativeBase = function (baseLength) {
  return memory.moveBaseTo(baseLength);
};

const getSubstring = function (string, pos1, pos2) {
  return string.substr(pos1, pos2);
};

const getPositions = function (signals, index, mode) {
  const modes = {
    0: () => signals[index],
    1: () => index,
    2: () => memory.getBase(index),
  };
  return modes[mode]();
};

const findOutputSignal = function (intCode) {
  let {signals, ptrPos} = intCode;

  let done = false;

  const req = addZero(signals[ptrPos]);
  const opcode = +getSubstring(req, 3, 2);
  const firstParamMode = +getSubstring(req, 2, 1);
  const secondParamMode = +getSubstring(req, 1, 1);
  const thirdParamMode = +getSubstring(req, 0, 1);

  const pos1 = getPositions(signals, ptrPos + 1, firstParamMode);
  const pos2 = getPositions(signals, ptrPos + 2, secondParamMode);
  const pos3 = getPositions(signals, ptrPos + 3, thirdParamMode);

  const params = {
    1: [pos3, signals[pos1], signals[pos2]],
    2: [pos3, signals[pos1], signals[pos2]],
    3: [pos1],
    4: [signals[pos1]],
    5: [signals[pos1], signals[pos2]],
    6: [signals[pos1], signals[pos2]],
    7: [signals[pos1], signals[pos2], pos3],
    8: [signals[pos1], signals[pos2], pos3],
    9: [signals[pos1]],
  };

  const operations = {
    1: add,
    2: mul,
    3: readIn,
    4: printOutput,
    5: jumpIfTrue,
    6: jumpIfFalse,
    7: lessThan,
    8: equals,
    9: moveRelativeBase,
    99: () => null,
  };

  const instrLengths = {
    1: 4,
    2: 4,
    3: 2,
    4: 2,
    7: 4,
    8: 4,
    9: 2,
  };

  const operation = operations[opcode];

  const result = operation(...params[opcode]);
  const instrLength = instrLengths[opcode];

  if (opcode === 5 || opcode === 6) {
    return {done, instrLength: getJumpLength(result)};
  }

  if (result === null) {
    done = true;
  }

  return {done, instrLength};
};

const runIntCode = function (intCode) {
  memory = intCode;
  const initialPosition = [0, 50];
  const initialColor = 'WHITE';
  const initialDirection = 'UP';
  robot = new Robot(initialPosition, initialColor, initialDirection);

  while (!memory.isDone()) {
    const {done, instrLength} = findOutputSignal(intCode);
    if (done) {
      break;
    }
    robot.next();
    memory.movePtrBy(instrLength);
  }
  return robot.getGrid();
};

const printPassword = function (paintPosition) {
  for (let i = 0; i < 50; i++) {
    for (let index = 20; index < 100; index++) {
      if (paintPosition[[i, index].join(':')] === 'WHITE') {
        process.stdout.write('0');
      } else {
        process.stdout.write(' ');
      }
    }
    console.log('');
  }
};

const main = function () {
  const intCodes = JSON.parse(fs.readFileSync('intCode.json', 'utf8'));
  const input = new IntCode(intCodes);
  const paint = runIntCode(input);
  printPassword(paint);
};

main();
