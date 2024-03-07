function operate(a, sign, b) {
  const operators = {
    "+": (a, b) => add(a, b),
    "-": (a, b) => subtract(a, b),
  };

  return sign[operators]();
}

console.log(operate(1, "+", 2));

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

function displayInputs() {
  let display = "";
  const screen = document.querySelector("screen");
}

function clearInputs() {}
