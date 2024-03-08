const screen = document.querySelector(".screen");
let currentNum;
let nextNum;
let operator;

function operate(a, sign, b) {
  let total;
  switch (sign) {
    case "+":
      total = add(a, b);
      break;
    case "-":
      total = subtract(a, b);
      break;
    case "*":
      total = multiply(a, b);
      break;
    case "/":
      total = divide(a, b);
      break;
    default:
      return "Invalid";
  }
  return total;
}

console.log(operate(0.1, "+", 0.2));

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
  if (b === 0) {
    return "ERROR!";
  } else return a / b;
}

function clearDisplay() {
  screen.textContent = "";
}

function displayInputs() {}

function clearInputs() {
  currentNum = undefined;
  nextNum = undefined;
  operator;
  screen.textContent = "";
}

const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", clearInputs);

const multiplyButton = document.querySelector("#multiply");
multiplyButton.addEventListener("click", () => {
  if (!currentNum) {
    currentNum = parseInt(screen.textContent);
  }
  operator = "*";
  screen.textContent = "*";
});

//<-------------------------------------------->

const numberButtons = document.querySelectorAll(".num");

numberButtons.forEach((button) => {
  const buttonNumber = button.textContent;

  button.addEventListener("click", () => {
    const currentDisplay = screen.textContent;

    if (isNaN(currentDisplay)) {
      clearDisplay();
      screen.textContent += buttonNumber;
    } else {
      screen.textContent += buttonNumber;
    }
  });
});
