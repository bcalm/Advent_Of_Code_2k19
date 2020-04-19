const fs = require('fs');

const inputs = {
  firstTime: 0,
  secondTime: 0,
};

const addZero = function (number) {
  const string = number.toString();
  const extraZero = '0'.repeat(5 - string.length);
  return extraZero + string;
};

const increment = function (value, incrementBy) {
  return value + incrementBy;
};

const increasePointer = function (positions, opcode, signals) {
  let [pos1, pos2, ptrPos] = positions;
  const pointerIncrement = {
    1: () => increment(ptrPos, 4),
    2: () => increment(ptrPos, 4),
    3: () => increment(ptrPos, 2),
    4: () => increment(ptrPos, 2),
    5: () => (signals[pos1] ? signals[pos2] : increment(ptrPos, 3)),
    6: () => (signals[pos1] ? increment(ptrPos, 3) : signals[pos2]),
    7: () => increment(ptrPos, 4),
    8: () => increment(ptrPos, 4),
  };
  return pointerIncrement[opcode]();
};

const readInput = function (ptrPos) {
  return ptrPos ? inputs.secondTime : inputs.firstTime;
};

const performOperations = function (positions, opcode, signals) {
  const [pos1, pos2, pos3, ptrPos] = positions;
  const operations = {
    1: () => (signals[pos3] = signals[pos1] + signals[pos2]),
    2: () => (signals[pos3] = signals[pos1] * signals[pos2]),
    3: () => (signals[pos1] = readInput(ptrPos)),
    4: () => (signals[0] = signals[pos1]),
    5: () => {},
    6: () => {},
    7: () => (signals[pos3] = signals[pos1] < signals[pos2]),
    8: () => (signals[pos3] = signals[pos1] == signals[pos2]),
  };
  operations[opcode]();
  return signals;
};

const getSubstring = function (string, pos1, pos2) {
  return string.substr(pos1, pos2);
};

const getPositions = function (signals, ptrPos, mode, pos) {
  return mode ? ptrPos + pos : signals[ptrPos + pos];
};

const findOutputSignal = function (signals, ptrPos = 0) {
  const req = addZero(signals[ptrPos]);
  const opcode = +getSubstring(req, 3, 2);
  const firstParamMode = +getSubstring(req, 2, 1);
  const secondParamMode = +getSubstring(req, 1, 1);
  const thirdParamMode = +getSubstring(req, 0, 1);
  const pos1 = getPositions(signals, ptrPos, firstParamMode, 1);
  const pos2 = getPositions(signals, ptrPos, secondParamMode, 2);
  const pos3 = getPositions(signals, ptrPos, thirdParamMode, 3);
  if (opcode === 99) return signals[0];
  signals = performOperations([pos1, pos2, pos3, ptrPos], opcode, signals);
  ptrPos = increasePointer([pos1, pos2, ptrPos], opcode, signals);
  return findOutputSignal(signals, ptrPos);
};

const getHighestThruster = function (signals, phaseSetting) {
  return phaseSetting.reduce((input2, input1) => {
    inputs.firstTime = input1;
    inputs.secondTime = input2;
    return findOutputSignal(signals.slice());
  }, 0);
};

const main = function () {
  const signals = JSON.parse(fs.readFileSync('./signalInput.json', 'utf8'));
  const phaseSettings = JSON.parse(fs.readFileSync('./phaseSetting.json', 'utf8'));
  const maxHighestThrusters = phaseSettings.reduce((highestThrusters, phaseSetting) => {
    thrusterSignal = getHighestThruster(signals.slice(), phaseSetting);
    return highestThrusters > thrusterSignal ? highestThrusters : thrusterSignal;
  }, 0);

  console.log(maxHighestThrusters);
};

main();
