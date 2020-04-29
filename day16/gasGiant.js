const fs = require('fs');

const getAllPattern = function (inputLength, basePattern, patterns = [], row = 0) {
  if (row === inputLength) return patterns;
  const patternSetting = [];
  let pattern = '';
  for (let index = 0; index < basePattern.length; index++) {
    pattern = pattern.concat(basePattern[index].repeat(row + 1));
  }
  const numbersCount = pattern.split('').filter((number) => number !== '-').length;
  pattern = pattern.repeat(inputLength / numbersCount + 1);

  for (let index = 0; index < pattern.length; index++) {
    if (pattern[index] == '-') {
      patternSetting.push(pattern.substr(index, 2));
      index++;
    } else {
      patternSetting.push(pattern[index]);
    }
  }
  patterns.push(patternSetting.slice(1, inputLength + 1));

  return getAllPattern(inputLength, basePattern, patterns, ++row);
};

const getPhaseOutput = function (fftInput, patterns, phase = 0) {
  if (phase === 100) return fftInput.slice(0, 8);

  const newInput = [];
  for (let row = 0; row < fftInput.length; row++) {
    let input = 0;
    for (let col = 0; col < fftInput.length; col++) {
      input += fftInput[col] * patterns[row][col];
    }
    newInput.push(Math.abs(input % 10));
  }
  return getPhaseOutput(newInput.join(''), patterns, ++phase);
};

const main = function () {
  const input = fs.readFileSync('./fftInput.json', 'utf8');
  const fftInput = input.split('').map((element) => +element);
  const basePattern = ['0', '1', '0', '-1'];
  const patterns = getAllPattern(fftInput.length, basePattern);
  console.log(getPhaseOutput(fftInput, patterns));
};

main();
