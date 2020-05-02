const fs = require('fs');

const getAllPattern = function (inputLength, basePattern) {
  const patterns = [];
  for (let row = 0; row < inputLength / 2; row++) {
    let pattern = '';
    for (let index = 0; index < basePattern.length; index++) {
      pattern += basePattern[index].repeat(row + 1);
    }
    pattern = pattern.match(/-?\d/g);
    patterns[row] = pattern;
  }
  return patterns;
};

const getPhaseOutput = function (fftInput, patterns) {
  for (let phase = 0; phase < 4; phase++) {
    console.log(phase);
    const newInput = [];
    for (let row = 0; row < fftInput.length / 2; row++) {
      let input = 0;
      const pattern = patterns[row];
      for (let col = 0; col < fftInput.length; col++) {
        input += fftInput[col] * +pattern[(col + 1) % pattern.length];
      }
      newInput[row] = Math.abs(input % 10);
      const x = fftInput.slice(fftInput.length - row - 1).reduce((c, e) => +c + +e, 0);
      newInput[fftInput.length - row - 1] = Math.abs(x % 10);
    }
    fftInput = newInput;
  }
  return fftInput;
};

const main = function () {
  // const input = fs.readFileSync('fftInput.json', 'utf8').repeat(10000);
  // const messageOffset = input.slice(0, 7);
  // const newInput = input.slice(messageOffset);
  const newInput = '12345678'.split('');
  const basePattern = ['0', '1', '0', '-1'];
  const patterns = getAllPattern(newInput.length, basePattern);
  console.log(getPhaseOutput(newInput, patterns));
};

main();
