const fs = require('fs');

const findOutputSignal = function (signals, start = 0) {
  const req = signals[start];
  const pos1 = signals[start + 1];
  const pos2 = signals[start + 2];
  const pos3 = signals[start + 3];
  if (req === 99) return signals[0];
  if (req === 1) signals[pos3] = signals[pos1] + signals[pos2];
  if (req === 2) signals[pos3] = signals[pos1] * signals[pos2];
  return findOutputSignal(signals, (start += 4));
};
const findSpecificSignal = function (signals) {
  for (let noun = 1; noun < 100; noun++) {
    for (let verb = 1; verb < 100; verb++) {
      signals[1] = noun;
      signals[2] = verb;
      const res = findOutputSignal(signals.slice());
      if (res === 19690720) {
        return [noun, verb];
      }
    }
  }
};

const main = function () {
  const signals = JSON.parse(fs.readFileSync('data/day2ComputerSignal.json', 'utf8'));
  console.log(findSpecificSignal(signals));
};

main();
