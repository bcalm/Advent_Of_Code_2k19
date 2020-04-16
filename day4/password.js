const checkRepetition = function (a, b, c, d, e, f) {
  return (
    a == b ||
    a == c ||
    a == d ||
    a == e ||
    a == f ||
    b == c ||
    b == d ||
    b == e ||
    b == f ||
    c == d ||
    c == e ||
    c == f ||
    d == e ||
    d == f ||
    e == f
  );
};

const checkAscendingOrder = function (a, b, c, d, e, f) {
  return a <= b && b <= c && c <= d && d <= e && e <= f;
};

const isValidWay = function (number) {
  const numbers = number.toString().split('');
  const a = numbers[0];
  const b = numbers[1];
  const c = numbers[2];
  const d = numbers[3];
  const e = numbers[4];
  const f = numbers[5];
  const isAscendingNumber = checkAscendingOrder(a, b, c, d, e, f);
  const isDouble = checkRepetition(a, b, c, d, e, f);
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
