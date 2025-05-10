function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) return null;
  return a / b;
}

function operate(a, b, op) {
  a = parseFloat(a);
  b = parseFloat(b);

  if (isNaN(a) || isNaN(b)) return;

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

const maxOutputLength = 25;

let accumulator = "0";
let nextOperand = "0";
let operator = undefined;

let isCleared = true;
let outputToLong = false;
let clickedEquals = false;
let dividedByZero = false;
let clickedOperator = false;

function reset() {
  document.querySelector(".display-operator").textContent = "";
  document.querySelector(".display-operand").textContent = "0";

  accumulator = "0";
  nextOperand = "0";
  operator = undefined;

  isCleared = true;
}

function clearDisplay(displayPortion) {
  const display = document.querySelector(displayPortion);
  display.textContent = "";
}

function correct() {
  nextOperand = nextOperand.slice(0, -1);
  document.querySelector(".display-operand").textContent = nextOperand;
}

function updateDisplay(character) {
  let display;
  switch (character) {
    case ".":
      display = document.querySelector(".display-operand");
      if (!display.textContent.split("").includes(".")) {
        display.textContent = display.textContent.trimEnd() + character;
      }
      break;

    case "+":
    case "-":
    case "*":
    case "/":
      document.querySelector(".display-operator").textContent = character;
      break;

    // digit: 0 - 9
    default:
      display = document.querySelector(".display-operand");
      const operand = display.textContent;

      if (operand.length >= maxOutputLength) {
        outputToLong = true;
        return;
      }

      display.textContent =
        operand === "0" ? character : operand.trimEnd() + character;
  }
}

function processNumberInput(target) {
  if (
    target.classList.value === "number-container" ||
    (target.classList.contains("decimal-point") &&
      nextOperand.split("").includes("."))
  )
    return;

  if (clickedEquals || dividedByZero) {
    reset();
    clickedEquals = false;
    dividedByZero = false;
  }

  if (clickedOperator) {
    clearDisplay(".display-operand");
    nextOperand = "0";
    clickedOperator = false;
  }

  if (outputToLong) {
    outputToLong = false;
    return;
  }

  const digit = target.textContent;
  updateDisplay(digit);
  nextOperand = nextOperand === "0" ? digit : nextOperand + digit;
}

function processOperatorInput(target) {
  if (target.classList.value === "operators") return;

  operator = target.textContent;
  document.querySelector(".display-operator").textContent = operator;

  if (clickedOperator) return;

  if (!clickedEquals) {
    accumulator = isCleared
      ? nextOperand
      : operate(accumulator, nextOperand, operator);

    if (accumulator === null) {
      document.querySelector(".display-operand").textContent =
        "Not in this universe ... !!";
      dividedByZero = true;
    }
  }

  clickedOperator = true;
  clickedEquals = false;
  isCleared = false;
}

function processEqualsInput() {
  accumulator = isCleared
    ? nextOperand
    : operate(accumulator, nextOperand, operator);

  if (accumulator === null) {
    dividedByZero = true;
    document.querySelector(".display-operand").textContent =
      "Not in this universe ... !!";
  } else {
    accumulator = accumulator.toString();
    accumulator =
      accumulator.length <= maxOutputLength
        ? accumulator
        : parseFloat(accumulator).toFixed(maxOutputLength);

    document.querySelector(".display-operand").textContent = accumulator;
  }

  document.querySelector(".display-operator").textContent = "";
  clickedEquals = true;
}

const clearBtn = document.querySelector(".clear");
clearBtn.addEventListener("click", reset);

const numbers = document.querySelectorAll(".number-container");
numbers.forEach((number) =>
  number.addEventListener("click", (event) => processNumberInput(event.target)),
);

const operators = document.querySelector(".operators");
operators.addEventListener("click", (event) =>
  processOperatorInput(event.target),
);

const equals = document.querySelector(".equals");
equals.addEventListener("click", processEqualsInput);

const backspace = document.querySelector(".backspace");
backspace.addEventListener("click", () => correct);

window.addEventListener("keydown", (event) => {
  const key = document.querySelector(`.btn[data-key="${event.key}"]`);
  if (key === null) return;

  switch (event.key) {
    case "Backspace":
      correct();
      break;

    case "Delete":
      reset();
      break;

    case "=":
      processEqualsInput();
      break;

    case "+":
    case "-":
    case "*":
    case "/":
      processOperatorInput(key);
      break;

    default:
      processNumberInput(key);
  }
});
