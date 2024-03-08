const screen = document.querySelector(".screen");
let firstNum, nextNum, operator;

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
  return parseFloat(screen.textContent);
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

//<------------------------------------------>

document.body.addEventListener("keydown", (e) => {
  if (e.key === "Backspace") {
    screen.textContent = screen.textContent.slice(0, this.length - 1);
  }
});

//<------------------------------------------>

const decimalButton = document.querySelector("#decimal");
decimalButton.addEventListener("click", () => {
  if (!screen.textContent.includes(".")) {
    screen.textContent += ".";
  }
});

const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", () => {
  clearInputs();
  screen.textContent = "Clear";
});

const toggleSignsButton = document.querySelector("#toggle-sign");
toggleSignsButton.addEventListener("click", () => {
  if (screen.textContent.startsWith("-")) {
    screen.textContent = screen.textContent.replace("-", "");
  } else {
    screen.textContent = "-".concat(screen.textContent);
  }
});

//<------------------------------------------->

const equalsButton = document.querySelector("#equals");

equalsButton.addEventListener("click", () => {
  let invalidNum = isNaN(parseDisplay());

  if (invalidNum || !operator) {
    // screen.textContent = "ERROR!";
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
    operator = operatorButton;

    if (!firstNum && isNaN(parseDisplay())) {
      screen.textContent = "Input Numbers First!";
      return;
    }

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

  document.body.addEventListener("keydown", (e) => {
    const numLength = screen.textContent.length;

    if (e.key === buttonNumber && numLength < 18) {
      if (isNaN(parseDisplay())) {
        clearDisplay();
      }
      screen.textContent += buttonNumber;
    }
  });

  button.addEventListener("click", () => {
    const numLength = screen.textContent.length;

    if (isNaN(parseDisplay())) {
      clearDisplay();
    }

    screen.textContent += buttonNumber;
  });
});
