const checkRepetition = function (numbers) {
  const categorizedArray = numbers.reduce((context, number) => {
    if (context.length && context[context.length - 1][0] == number) {
      context[context.length - 1].push(number);
    } else {
      context.push([number]);
    }
    return context;
  }, []);
  return categorizedArray.filter((number) => number.length == 2).length;
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
