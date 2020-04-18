const fs = require('fs');

const addZero = function (number) {
  const string = number.toString();
  const extraZero = '0'.repeat(5 - string.length);
  return extraZero + string;
};

const findOutputSignal = function (signals, start = 0) {
  let forwardBy = 4;
  const req = addZero(signals[start]);
  const opcode = +req.substr(3, 2);
  const firstParam = +req.substr(2, 1);
  const secondParam = +req.substr(1, 1);
  const thirdParam = +req.substr(0, 1);
  const pos1 = firstParam ? start + 1 : signals[start + 1];
  const pos2 = secondParam ? start + 2 : signals[start + 2];
  const pos3 = thirdParam ? start + 3 : signals[start + 3];
  if (opcode === 99) return signals[0];

  if (opcode === 01) {
    signals[pos3] = signals[pos1] + signals[pos2];
  }
  if (opcode === 02) {
    signals[pos3] = signals[pos1] * signals[pos2];
  }
  if (opcode === 03) {
    forwardBy = 2;
    signals[signals[start + 1]] = 1;
  }
  if (opcode === 04) {
    forwardBy = 2;
    console.log(signals[signals[start + 1]]);
  }

  return findOutputSignal(signals, (start += forwardBy));
};

const main = function () {
  const signals = JSON.parse(fs.readFileSync('input.json', 'utf8'));
  findOutputSignal(signals.slice());
};

main();
