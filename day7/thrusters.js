const {runIntCode} = require('./intCodeComputer');
const {IntCode} = require('./intCode');
const signalInput = require('./signalInput.json');
const possibleSettings = require('./phaseSetting.json');

const getHighestThrusterSignal = function (intCode, phaseSettings) {
  let input = 0;
  const ampLookup = {};
  const amps = 'ABCDE'.split('');

  amps.forEach((amp) => {
    ampLookup[amp] = new IntCode(intCode);
  });

  for (index in amps) {
    const memory = ampLookup[amps[index]];
    input = runIntCode(memory, [input, phaseSettings[index]]).pop();
  }

  while (!ampLookup['A'].isDone()) {
    for (let amp of amps) {
      input = runIntCode(ampLookup[amp], [input]).pop();
    }
  }

  return input;
};

const main = function () {
  const intCode = signalInput.slice();
  return possibleSettings.reduce((maxThrustSignal, phaseSettings) => {
    const thrustSignal = getHighestThrusterSignal(intCode, phaseSettings);
    return thrustSignal > maxThrustSignal ? thrustSignal : maxThrustSignal;
  }, 0);
};

console.log(main());
