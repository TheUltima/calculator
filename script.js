const screen = document.querySelector(".screen");
let firstNum, nextNum, operator;
let percentage;

const doOperation = (function () {
  const operateObj = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "X": (a, b) => a * b,
    "÷": (a, b) => {
      if (b == 0) {
        resetInputs();
        return "ERROR!";
      } else return a / b;
    },
  };

  return function (a, sign, b) {
    const operate = operateObj[sign];
    return operate(a, b);
  };
})();
//^^ The parenthesis here means we can call doOperation without having to write
//extra parenthesis (since we're returning a function), i.e. doOperation()(a, sign, b)

function clearDisplay() {
  screen.textContent = "";
}

function parseDisplay() {
  return parseFloat(screen.textContent);
}

function togglePercent() {
  if (isNaN(parseDisplay())) {
    return;
  }

  //Simple toggle. Must be below the parseDisplay above or else it changes the boolean of percentage
  percentage = !percentage;

  if (percentage) {
    screen.textContent = doOperation(parseDisplay(), "X", 0.01);
  } else {
    screen.textContent = doOperation(parseDisplay(), "X", 100);
  }
}

function appendNumInput(content) {
  if (isNaN(parseDisplay())) {
    clearDisplay();
  }

  screen.textContent += `${content}`;

  return screen.textContent;
}

function appendDecimal() {
  if (!screen.textContent.includes(".")) {
    screen.textContent += ".";
  }
}

function resetInputs() {
  firstNum = null;
  nextNum = null;
  operator = null;
}

function evaluate() {
  let invalidNum = isNaN(parseDisplay());

  if (invalidNum || !operator || !firstNum) {
    return;
  }

  nextNum = parseDisplay();

  screen.textContent = doOperation(firstNum, operator, nextNum);

  resetInputs();
}

function setOperator(sign) {
  operator = sign;

  if (!firstNum && isNaN(parseDisplay())) {
    screen.textContent = "Input Numbers First!";
    return;
  }

  if (!firstNum) {
    firstNum = parseDisplay();
  }

  screen.textContent = operator;
}

//<------------------------------------------>

document.body.addEventListener("keydown", (e) => {
  const inputObj = {
    "Backspace": () => {
      screen.textContent = screen.textContent.slice(0, this.length - 1);
    },
    "=": evaluate,
    "+": () => setOperator("+"),
    "-": () => setOperator("-"),
    "X": () => setOperator("X"),
    "/": () => setOperator("÷"),
    ".": () => appendDecimal(),
    "%": () => togglePercent(),
    "C": () => {
      resetInputs();
      screen.textContent = "Clear";
    },
  };

  //Set some alternative inputs
  inputObj["Enter"] = inputObj["="];
  inputObj["*"] = inputObj["X"];

  if (inputObj[e.key]) {
    return inputObj[e.key]();
  }
});

//<------------------------------------------>

const decimalButton = document.querySelector("#decimal");
decimalButton.addEventListener("click", appendDecimal);

const togglePercentButton = document.querySelector("#percent");
togglePercentButton.addEventListener("click", togglePercent);

const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", () => {
  resetInputs();
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

equalsButton.addEventListener("click", evaluate);

//<------------------------------------------->

const operatorButtons = document.querySelectorAll(".operator");

operatorButtons.forEach((button) => {
  const operatorButton = button.textContent;

  button.addEventListener("click", () => {
    setOperator(operatorButton);
  });
});

//<------------------------------------------->

const numberButtons = document.querySelectorAll(".num");

numberButtons.forEach((button) => {
  const buttonNumber = button.textContent;

  document.body.addEventListener("keydown", (e) => {
    if (e.key === buttonNumber) {
      appendNumInput(buttonNumber);
    }
  });

  button.addEventListener("click", () => {
    appendNumInput(buttonNumber);
  });
});
