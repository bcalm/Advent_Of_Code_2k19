let memory, output, input;

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
  if (input.length) {
    return memory.updateMemory(dest, input.pop());
  }
  return null;
};

const printOutput = function (content) {
  return output.push(content);
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

const getSubstring = function (string, pos1, pos2) {
  return string.substr(pos1, pos2);
};

const getPositions = function (signals, ptrPos, mode, pos) {
  return mode ? ptrPos + pos : signals[ptrPos + pos];
};

const findOutputSignal = function (intCode) {
  let {signals, ptrPos} = intCode;

  let done = false;

  const req = addZero(signals[ptrPos]);
  const opcode = +getSubstring(req, 3, 2);
  const firstParamMode = +getSubstring(req, 2, 1);
  const secondParamMode = +getSubstring(req, 1, 1);
  const thirdParamMode = +getSubstring(req, 0, 1);
  const pos1 = getPositions(signals, ptrPos, firstParamMode, 1);
  const pos2 = getPositions(signals, ptrPos, secondParamMode, 2);
  const pos3 = getPositions(signals, ptrPos, thirdParamMode, 3);

  const params = {
    1: [pos3, signals[pos1], signals[pos2]],
    2: [pos3, signals[pos1], signals[pos2]],
    3: [pos1],
    4: [signals[pos1]],
    5: [signals[pos1], signals[pos2]],
    6: [signals[pos1], signals[pos2]],
    7: [signals[pos1], signals[pos2], pos3],
    8: [signals[pos1], signals[pos2], pos3],
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
    99: () => null,
  };

  const instrLengths = {
    1: 4,
    2: 4,
    3: 2,
    4: 2,
    7: 4,
    8: 4,
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

const runIntCode = function (intCode, inputData) {
  memory = intCode;

  input = inputData.slice();
  output = [];

  while (!memory.isDone()) {
    const {done, instrLength} = findOutputSignal(intCode);
    if (done) {
      break;
    }

    memory.movePtrBy(instrLength);
  }
  return output.slice();
};

module.exports = {runIntCode};
