const {IntCode} = require('./intCode');
let memory, output, input;

const moveRelativeBase = function (length) {
  return memory.moveRelativeBase(length);
};

const equals = function (ip1, ip2, dest) {
  const result = ip1 === ip2 ? 1 : 0;
  return memory.updateMemory(dest, result);
};

const lessThan = function (ip1, ip2, dest) {
  const result = ip1 < ip2 ? 1 : 0;
  return memory.updateMemory(dest, result);
};

const jumpIfFalse = function (ip1, dest) {
  return ip1 === 0 ? dest : null;
};

const jumpIfTrue = function (ip1, dest) {
  return ip1 !== 0 ? dest : null;
};

const prnOut = function (content) {
  return output.push(content);
};

const readIn = function (dest) {
  if (input.length) {
    return memory.updateMemory(dest, input.pop());
  }
  return null;
};

const mul = function (ip1, ip2, dest) {
  return memory.updateMemory(dest, ip1 * ip2);
};

const add = function (ip1, ip2, dest) {
  return memory.updateMemory(dest, ip1 + ip2);
};

const getJumpLength = function (dest) {
  return dest === null ? 3 : memory.getDistanceFromPtr(dest);
};

const expandCommand = function (command) {
  const cmdString = '0000'.slice(0, 5 - command.toString().length).concat(command);
  return cmdString.split('');
};

const parseCommand = function (command) {
  const expandedCommand = expandCommand(command);
  const opcode = +expandedCommand.slice(-2, 5).join('');

  const [opMode, ip2Mode, ip1Mode] = expandedCommand
    .slice(0, 3)
    .map((mode, index) => (+mode === 2 ? 2 : opcode === 3 || index === 0 ? 1 : +mode));

  return {
    opcode,
    ip1Mode,
    ip2Mode,
    opMode,
  };
};

const getInstrLength = function (opcode) {
  const twoParaCmd = [3, 4, 9];
  const jmpOp = [5, 6];
  return twoParaCmd.includes(opcode) ? 2 : jmpOp.includes(opcode) ? 3 : 4;
};

const parseInstruction = function () {
  let command = memory.getCommand();
  const {opcode, ip1Mode, ip2Mode, opMode} = parseCommand(command);
  const instrLength = getInstrLength(opcode);
  const params = memory.getCurrentParams(instrLength, [ip1Mode, ip2Mode, opMode]);

  return {opcode, params, instrLength};
};

const processInstruction = function () {
  let done = false;
  const instructionLookup = {
    1: add,
    2: mul,
    3: readIn,
    4: prnOut,
    5: jumpIfTrue,
    6: jumpIfFalse,
    7: lessThan,
    8: equals,
    9: moveRelativeBase,
    99: () => null,
  };
  const {opcode, params, instrLength} = parseInstruction();
  const instruction = instructionLookup[opcode];
  const result = instruction(...params);

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
    const {done, instrLength} = processInstruction();
    if (done) {
      break;
    }
    memory.movePtrBy(instrLength);
  }

  return output.slice();
};

const main = function () {
  return runIntCode(new IntCode(testData), inputData);
};

module.exports = {runIntCode, main};
