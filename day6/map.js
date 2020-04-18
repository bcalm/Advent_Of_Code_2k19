const fs = require('fs');

const findDirectOrbits = function (allOrbits, mapInput) {
  if (mapInput[0].includes(allOrbits[allOrbits.length - 1])) {
    allOrbits.push(mapInput[1]);
  }
  return allOrbits;
};

const addWay = function (number, fact = 0) {
  if (number == 0) {
    return fact;
  }
  return number + addWay(number - 1);
};

const findTotalOrbits = function (mapInputs) {
  let orbits = 0;
  const directOrbits = mapInputs.slice(1).reduce(findDirectOrbits, [...mapInputs[0]]);
  const possibleIndirectOrbits = [];
  let way = 0;
  for (let i = 0; i <= directOrbits.length; i++) {
    let count = 0;
    possibleIndirectOrbits[i] = [...directOrbits.slice(0, i)];
    for (let index = 0; index < mapInputs.length; index++) {
      if (mapInputs[index][0] == possibleIndirectOrbits[i][possibleIndirectOrbits[i].length - 1]) {
        count++;
      }

      if (count > 1) {
        possibleIndirectOrbits[i].push(mapInputs[index][1]);
        count = 1;
      }
    }

    if (possibleIndirectOrbits[i].length === i) {
      possibleIndirectOrbits[i] = [];
    } else {
      way +=
        addWay(possibleIndirectOrbits[i].length - i - 1) +
        i * (possibleIndirectOrbits[i].length - i);
    }
  }

  way += addWay(directOrbits.length - 1);
  return way;
};

const main = function () {
  // const mapInput = fs.readFileSync('./mapInput.json', 'utf8');
  const input = `COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L`;

  const mapInputs = input.split('\n').map((e) => e.split(')'));
  const totalOrbits = findTotalOrbits(mapInputs);
  console.log(totalOrbits);
};

main();
