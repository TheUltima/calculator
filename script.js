const screen = document.querySelector(".screen");
let firstNum;
let nextNum;
let operator;

const doOperation = (function () {
  const operateObj = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    X: (a, b) => a * b,
    "÷": (a, b) => {
      if (b == 0) {
        clearInputs();
        return "ERROR!";
      } else return a / b;
    },
  };

  return function (a, sign, b) {
    const operate = operateObj[sign];
    return operate(a, b);
  };
})();

console.log(doOperation(5, "X", 0.7));

function clearDisplay() {
  screen.textContent = "";
}

function parseDisplay() {
  return parseInt(screen.textContent);
}

function displayInputs(content) {
  screen.textContent += `${content}`;

  return screen.textContent;
}

function clearInputs() {
  firstNum = null;
  nextNum = null;
  operator = null;
}

const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", () => {
  clearInputs();
  screen.textContent = "Clear";
});

//<------------------------------------------->

const equalsButton = document.querySelector("#equals");

equalsButton.addEventListener("click", () => {
  let invalidNum = isNaN(parseDisplay());

  if (invalidNum) {
    screen.textContent = "ERROR!";
    return;
  }
  if (!firstNum) {
    return;
  }

  nextNum = parseDisplay();

  screen.textContent = doOperation(firstNum, operator, nextNum);

  clearInputs();
});

//<------------------------------------------->

const operatorButtons = document.querySelectorAll(".operator");

operatorButtons.forEach((button) => {
  const operatorButton = button.textContent;

  button.addEventListener("click", () => {
    const currentDisplay = screen.textContent;
    operator = operatorButton;

    if (!firstNum) {
      firstNum = parseDisplay();
      console.log(firstNum);
    }

    screen.textContent = operator;
  });
});

//<------------------------------------------->

const numberButtons = document.querySelectorAll(".num");

numberButtons.forEach((button) => {
  const buttonNumber = button.textContent;

  button.addEventListener("click", () => {
    const display = screen.textContent;

    if (isNaN(display)) {
      clearDisplay();
    }

    screen.textContent += buttonNumber;
  });
});
