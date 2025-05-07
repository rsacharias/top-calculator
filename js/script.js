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

let firstOperand = 0;
let secondOperand = undefined;
let operator = undefined;

function reset() {
  document.querySelector(".display-operator").textContent = "";
  document.querySelector(".display-operand").textContent = "0";

  firstOperand = 0;
  secondOperand = undefined;
  operator = undefined;
}

function updateOperand(operand, digit) {
  return parseFloat(operand.toString() + digit);
}

function updateDisplay(character) {
  if (isNaN(parseInt(character))) {
    document.querySelector(".display-operator").textContent = character;
  } else {
    const display = document.querySelector(".display-operand");
    const operand = display.textContent;

    display.textContent =
      operand === "0" ? character : operand.trimEnd() + character;
  }
}

const clearBtn = document.querySelector(".clear");
clearBtn.addEventListener("click", reset);

const numbers = document.querySelectorAll(".number-container");
numbers.forEach((number) => {
  number.addEventListener("click", (event) => {
    if (event.target.classList.value === "number-container") return;
    updateDisplay(event.target.textContent);
    firstOperand = updateOperand(firstOperand, event.target.textContent);
    console.log(firstOperand);
  });
});

const operators = document.querySelector(".operators");
operators.addEventListener("click", (event) => {
  if (event.target.classList.value === "operators") return;
  updateDisplay(event.target.textContent);
});
