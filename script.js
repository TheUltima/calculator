const screen = document.querySelector(".screen");
let currentNum;
let nextNum;
let operator;

const doOperation = (function () {
  const operateObj = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    X: (a, b) => a * b,
    "÷": (a, b) => {
      if (b == 0) {
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

    //isNaN detects numbers & floats as strings. Used here detect operators.
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
