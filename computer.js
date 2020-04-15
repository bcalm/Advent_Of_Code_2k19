const signals = [
  1,
  0,
  0,
  3,
  1,
  1,
  2,
  3,
  1,
  3,
  4,
  3,
  1,
  5,
  0,
  3,
  2,
  10,
  1,
  19,
  1,
  19,
  9,
  23,
  1,
  23,
  6,
  27,
  1,
  9,
  27,
  31,
  1,
  31,
  10,
  35,
  2,
  13,
  35,
  39,
  1,
  39,
  10,
  43,
  1,
  43,
  9,
  47,
  1,
  47,
  13,
  51,
  1,
  51,
  13,
  55,
  2,
  55,
  6,
  59,
  1,
  59,
  5,
  63,
  2,
  10,
  63,
  67,
  1,
  67,
  9,
  71,
  1,
  71,
  13,
  75,
  1,
  6,
  75,
  79,
  1,
  10,
  79,
  83,
  2,
  9,
  83,
  87,
  1,
  87,
  5,
  91,
  2,
  91,
  9,
  95,
  1,
  6,
  95,
  99,
  1,
  99,
  5,
  103,
  2,
  103,
  10,
  107,
  1,
  107,
  6,
  111,
  2,
  9,
  111,
  115,
  2,
  9,
  115,
  119,
  2,
  13,
  119,
  123,
  1,
  123,
  9,
  127,
  1,
  5,
  127,
  131,
  1,
  131,
  2,
  135,
  1,
  135,
  6,
  0,
  99,
  2,
  0,
  14,
  0,
];

const day_2 = function (signals, one = 12, two = 2) {
  signals[1] = one;
  signals[2] = two;
  let start = 0;
  do {
    const req = signals[start];
    if (req === 99) {
      break;
    }
    const pos1 = signals[start + 1];
    const pos2 = signals[start + 2];
    const pos3 = signals[start + 3];
    if (req === 1) {
      signals[pos3] = signals[pos1] + signals[pos2];
    } else if (req === 2) {
      signals[pos3] = signals[pos1] * signals[pos2];
    }
    start = start + 4;
  } while (start < signals.length);
  return signals[0];
};

const make_array = function (l) {
  return Array.from({length: l}, (el, index) => index);
};
let x = make_array(100);
let y = make_array(100);

let cross = [];

for (let i = 0; i < x.length; i++) {
  for (let j = 0; j < y.length; j++) {
    cross.push([x[i], y[j]]);
  }
}

i = 0;

do {
  ans = day_2(res, cross[i][0], cross[i][1]);
  if (ans == 19690720) break;
  i++;
} while (i < cross.length);
console.log(100 * cross[i][0] + cross[i][1]);
