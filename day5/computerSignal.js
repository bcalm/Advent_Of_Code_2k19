const fs = require('fs');

const addZero = function (number) {
  const string = number.toString();
  const extraZero = '0'.repeat(5 - string.length);
  return extraZero + string;
};

const findOutputSignal = function (signals, ptrPos = 0) {
  const req = addZero(signals[ptrPos]);
  const opcode = +req.substr(3, 2);
  const firstParamMode = +req.substr(2, 1);
  const secondParamMode = +req.substr(1, 1);
  const thirdParamMode = +req.substr(0, 1);
  const pos1 = firstParamMode ? ptrPos + 1 : signals[ptrPos + 1];
  const pos2 = secondParamMode ? ptrPos + 2 : signals[ptrPos + 2];
  const pos3 = thirdParamMode ? ptrPos + 3 : signals[ptrPos + 3];

  const increasePointer = {
    1: () => (ptrPos += 4),
    2: () => (ptrPos += 4),
    3: () => (ptrPos += 2),
    4: () => (ptrPos += 2),
    5: () => (ptrPos = signals[pos1] ? signals[pos2] : (ptrPos += 3)),
    6: () => (ptrPos = signals[pos1] ? (ptrPos += 3) : signals[pos2]),
    7: () => (ptrPos += 4),
    8: () => (ptrPos += 4),
  };
  const operations = {
    1: () => (signals[pos3] = signals[pos1] + signals[pos2]),
    2: () => (signals[pos3] = signals[pos1] * signals[pos2]),
    3: () => (signals[pos1] = 5),
    4: () => console.log(signals[pos1]),
    5: () => {},
    6: () => {},
    7: () => (signals[pos3] = signals[pos1] < signals[pos2]),
    8: () => (signals[pos3] = signals[pos1] == signals[pos2]),
  };

  if (opcode === 99) return signals[0];
  operations[opcode]();
  increasePointer[opcode]();

  return findOutputSignal(signals, ptrPos);
};

const main = function () {
  const signals = JSON.parse(fs.readFileSync('input.json', 'utf8'));
  findOutputSignal(signals.slice());
};

main();
