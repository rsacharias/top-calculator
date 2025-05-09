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
  return a / b;
}

function operate(a, b, op) {
  a = parseFloat(a);
  b = parseFloat(b);

  console.log(`operate: a = ${a}, b = ${b}`);
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

let accumulator = "0";
let nextOperand = "0";
let operator = undefined;

let clickedEquals = false;
let clickedOperator = false;
let isCleared = true;

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

      display.textContent =
        operand === "0" ? character : operand.trimEnd() + character;
  }

  return display;
}

const clearBtn = document.querySelector(".clear");
clearBtn.addEventListener("click", reset);

const numbers = document.querySelectorAll(".number-container");
numbers.forEach((number) => {
  number.addEventListener("click", (event) => {
    if (
      event.target.classList.value === "number-container" ||
      (event.target.classList.contains("decimal-point") &&
        nextOperand.split("").includes("."))
    )
      return;

    if (clickedEquals) {
      reset();
      clickedEquals = false;
    }

    if (clickedOperator) {
      clearDisplay(".display-operand");
      nextOperand = "0";
      clickedOperator = false;
    }

    const digit = event.target.textContent;
    updateDisplay(digit);
    nextOperand = nextOperand === "0" ? digit : nextOperand + digit;
  });
});

const operators = document.querySelector(".operators");
operators.addEventListener("click", (event) => {
  if (event.target.classList.value === "operators") return;

  operator = event.target.textContent;
  document.querySelector(".display-operator").textContent = operator;

  if (clickedOperator) return;

  if (!clickedEquals) {
    accumulator = isCleared
      ? nextOperand
      : operate(accumulator, nextOperand, operator);
  }

  clickedOperator = true;
  clickedEquals = false;
  isCleared = false;
});

const equals = document.querySelector(".equals");
equals.addEventListener("click", () => {
  accumulator = isCleared
    ? nextOperand
    : operate(accumulator, nextOperand, operator);

  document.querySelector(".display-operator").textContent = "";
  document.querySelector(".display-operand").textContent = accumulator;

  clickedEquals = true;
});
