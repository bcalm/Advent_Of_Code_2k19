const fs = require('fs');

const getAllPattern = function (inputLength) {
  const basePattern = ['0', '1', '0', '-1'];
  const patterns = [];
  for (let row = 0; row < inputLength; row++) {
    patternSetting = [];
    let pattern = '';
    for (let index = 0; index < basePattern.length; index++) {
      pattern = pattern.concat(basePattern[index].repeat(row + 1));
    }
    pattern = pattern.repeat(inputLength);
    for (let index = 0; index < pattern.length; index++) {
      if (pattern[index] == '-') {
        patternSetting.push(pattern.substr(index, 2));
        index++;
      } else {
        patternSetting.push(pattern[index]);
      }
    }
    patterns.push(patternSetting.slice(1, inputLength + 1));
  }
  return patterns;
};

const getPhaseOutput = function (fftInput) {
  const patterns = getAllPattern(fftInput.length);
  for (let phase = 0; phase < 100; phase++) {
    const newInput = [];
    for (let i = 0; i < fftInput.length; i++) {
      let input = 0;
      for (let j = 0; j < fftInput.length; j++) {
        input += fftInput[j] * patterns[i][j];
      }
      newInput.push(Math.abs(input.toString()[input.toString().length - 1]));
    }
    fftInput = newInput.join('');
  }
  return fftInput.slice(0, 8);
};

const main = function () {
  const input = fs.readFileSync('./fftInput.json', 'utf8');
  const fftInput = input.split('').map((element) => +element);
  console.log(getPhaseOutput(fftInput));
};

main();
