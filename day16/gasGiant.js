const fs = require('fs');

const getPhaseSetting = function (row, inputLength) {
  const idealPhase = ['0', '1', '0', '-1'];
  const phaseSetting = [];
  let phase = '';
  for (let index = 0; index < idealPhase.length; index++) {
    phase = phase.concat(idealPhase[index].repeat(row + 1));
  }
  phase = phase.repeat(inputLength);
  for (let index = 0; index < phase.length; index++) {
    if (phase[index] == '-') {
      phaseSetting.push(phase.substr(index, 2));
      index++;
    } else {
      phaseSetting.push(phase[index]);
    }
  }
  return phaseSetting.slice(1, inputLength + 1);
};

const getOutput = function (fftInput, rounds = 0) {
  console.log(rounds);
  if (rounds === 100) return fftInput.slice(0, 8);
  const newInput = [];
  for (let i = 0; i < fftInput.length; i++) {
    const phase = getPhaseSetting(i, fftInput.length);
    let input = 0;
    for (let j = 0; j < fftInput.length; j++) {
      input += fftInput[j] * +phase[j];
    }
    newInput.push(Math.abs(input.toString()[input.toString().length - 1]));
  }
  return getOutput(newInput.join(''), ++rounds);
};

const main = function () {
  const input = fs.readFileSync('./fftInput.json', 'utf8');
  // const input = '69317163492948606335995924319873';
  const fftInput = input.split('').map((element) => +element);
  console.log(getOutput(fftInput));
};

main();
