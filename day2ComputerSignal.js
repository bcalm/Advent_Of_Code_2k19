const fs = require('fs');

const findOutputSignal = function (signals) {
  signals[1] = 12;
  signals[2] = 2;
  for (let start = 0; start < signals.length; start += 4) {
    const req = signals[start];
    if (req === 99) return signals[0];
    const pos1 = signals[start + 1];
    const pos2 = signals[start + 2];
    const pos3 = signals[start + 3];
    if (req === 1) signals[pos3] = signals[pos1] + signals[pos2];
    if (req === 2) signals[pos3] = signals[pos1] * signals[pos2];
  }
};

const main = function () {
  const signals = JSON.parse(fs.readFileSync('data/day2ComputerSignal.json', 'utf8'));
  const output = findOutputSignal(signals);
  console.log(output);
};
main();

// const make_array = function (l) {
//   return Array.from({length: l}, (el, index) => index);
// };
// let x = make_array(100);
// let y = make_array(100);

// let cross = [];

// for (let i = 0; i < x.length; i++) {
//   for (let j = 0; j < y.length; j++) {
//     cross.push([x[i], y[j]]);
//   }
// }

// i = 0;

// do {
//   ans = day_2(res, cross[i][0], cross[i][1]);
//   if (ans == 19690720) break;
//   i++;
// } while (i < cross.length);
// console.log(100 * cross[i][0] + cross[i][1]);
