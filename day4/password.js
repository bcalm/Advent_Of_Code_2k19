const checkRepetition = function (numbers) {
  let isRepeat = false;
  for (let idx = 0; idx < numbers.length; idx++) {
    const dummyNumber = numbers.slice();
    dummyNumber.splice(idx, 1);
    if (
      dummyNumber.includes(numbers[idx]) &&
      dummyNumber.indexOf(numbers[idx]) === dummyNumber.lastIndexOf(numbers[idx])
    ) {
      isRepeat = true;
    }
  }
  return isRepeat;
};

const checkAscendingOrder = function (number) {
  return (
    number[0] <= number[1] &&
    number[1] <= number[2] &&
    number[2] <= number[3] &&
    number[3] <= number[4] &&
    number[4] <= number[5]
  );
};

const isValidWay = function (number) {
  const numbers = number.toString().split('');
  const isAscendingNumber = checkAscendingOrder(numbers);
  const isDouble = checkRepetition(numbers);
  return isAscendingNumber && isDouble;
};

const getPossibleWays = function (currentNumber, lastNumber) {
  let possibleWays = 0;
  while (currentNumber < lastNumber) {
    possibleWays = isValidWay(currentNumber) ? ++possibleWays : possibleWays;
    currentNumber++;
  }
  return possibleWays;
};

const main = function () {
  const startNumber = 130254;
  const lastNumber = 678275;
  const possibleWays = getPossibleWays(startNumber, lastNumber);
  console.log(possibleWays);
};

main();
