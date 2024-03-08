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
    case "X":
      total = multiply(a, b);
      break;
    case "÷":
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

function displayInputs(content) {
  screen.textContent += `${content}`;

  return screen.textContent;
}

function clearInputs() {
  currentNum = undefined;
  nextNum = undefined;
  operator;
  screen.textContent = "";
}

const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", clearInputs);

//<------------------------------------------->

const operatorButtons = document.querySelectorAll(".operator");

operatorButtons.forEach((button) => {
  const operatorButton = button.textContent;

  button.addEventListener("click", () => {
    const currentDisplay = screen.textContent;

    if (!currentNum) {
      currentNum = parseInt(screen.textContent);
    }
    screen.textContent = operatorButton;
  });
});

//<------------------------------------------->

const numberButtons = document.querySelectorAll(".num");

numberButtons.forEach((button) => {
  const buttonNumber = button.textContent;

  button.addEventListener("click", () => {
    const currentDisplay = screen.textContent;

    //isNaN detects numbers & floats as strings. Used to detect operators.
    if (isNaN(currentDisplay)) {
      operator = screen.textContent;
      console.log(operator);

      clearDisplay();
      currentNum = displayInputs(buttonNumber); //string
    } else {
      currentNum = displayInputs(buttonNumber); //string
    }
  });
});
