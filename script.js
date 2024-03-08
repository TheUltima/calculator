const screen = document.querySelector(".screen");

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

function displayInputs() {
  let display = "";
}

function clearInputs() {
  screen.textContent = "";
}

const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", clearInputs);

const num7 = document.querySelector("#seven");
num7.addEventListener("click", () => {
  screen.textContent = 7;
});
