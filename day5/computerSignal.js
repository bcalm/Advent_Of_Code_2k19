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

  if (opcode === 99) return signals[0];

  if (opcode === 01) {
    ptrPos += 4;
    signals[pos3] = signals[pos1] + signals[pos2];
  }
  if (opcode === 02) {
    signals[pos3] = signals[pos1] * signals[pos2];
    ptrPos += 4;
  }
  if (opcode === 03) {
    signals[pos1] = 5;
    ptrPos += 2;
  }
  if (opcode === 04) {
    console.log(signals[signals[ptrPos + 1]]);
    ptrPos += 2;
  }
  if (opcode === 05) {
    ptrPos = signals[pos1] ? signals[pos2] : (ptrPos += 3);
  }
  if (opcode === 06) {
    ptrPos = signals[pos1] ? (ptrPos += 3) : signals[pos2];
  }
  if (opcode === 07) {
    ptrPos += 4;
    const value = signals[pos1] < signals[pos2] ? 1 : 0;
    signals[pos3] = value;
  }
  if (opcode === 08) {
    ptrPos += 4;
    const value = signals[pos1] == signals[pos2] ? 1 : 0;
    signals[pos3] = value;
  }

  return findOutputSignal(signals, ptrPos);
};

const main = function () {
  const signals = JSON.parse(fs.readFileSync('input.json', 'utf8'));
  findOutputSignal(signals.slice());
};

main();
