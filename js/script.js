function add(...numbers) {
  numbers = numbers.map((number) => parseFloat(number));
  if (numbers.some((number) => typeof number !== "number")) return null;

  return numbers.reduce((a, b) => a + b, 0);
}

function subtract(a, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  if (isNaN(a) || isNaN(b)) return null;

  return a - b;
}

function multiply(...numbers) {
  numbers = numbers.map((number) => parseFloat(number));
  if (numbers.some((number) => typeof number !== "number")) return null;

  return numbers.reduce((a, b) => a * b, 0);
}

function divide(a, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  if (isNaN(a) || isNaN(b)) return null;

  return a / b;
}

let firstOperand;
let secondOperand;
let operator;

function operate(a, b, op) {
  switch (op) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
  }
}
