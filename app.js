// Select Elements
const display = document.querySelector(".topCalculator");
const buttons = document.querySelectorAll(".items");

let currentInput = "";
let currentOperator = null;
let previousInput = "";
let resultDisplayed = false;

// Start Add click event listeners to all buttons
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    button.style.opacity = 0.8;
    setTimeout(() => {
      button.style.opacity = 1;
    }, 100);

    const buttonText = button.textContent;
    if (buttonText === "AC") {
      clearCalculator();
    } else if (buttonText === "+/-") {
      toggleSign();
    } else if (buttonText === "%") {
      calculatePercentage();
    } else if (buttonText === "=") {
      calculateResult();
    } else if (isNumeric(buttonText) || buttonText === ".") {
      appendToInput(buttonText);
    } else {
      setCurrentOperator(buttonText);
    }
  });
});

// Start Function to clear the calculator
function clearCalculator() {
  currentInput = "";
  currentOperator = null;
  previousInput = "";
  resultDisplayed = false;
  updateDisplay();
}

// Start Function to update the calculator display
function updateDisplay() {
  display.textContent = currentInput || "0";
}

// Start Function to check if a value is numeric
function isNumeric(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

// Start Function to append a value to the current input
function appendToInput(value) {
  if (resultDisplayed) {
    currentInput = "";
    resultDisplayed = false;
  }
  currentInput += value;
  updateDisplay();
}

// Start Function to set the current operator
function setCurrentOperator(operator) {
  if (currentOperator !== null) {
    calculateResult();
  }
  currentOperator = operator;
  previousInput = currentInput;
  currentInput = "";
}

// Start Function to toggle the sign of the current input
function toggleSign() {
  currentInput = (parseFloat(currentInput) * -1).toString();
  updateDisplay();
}

// Start Function to calculate the percentage of the current input
function calculatePercentage() {
  currentInput = (parseFloat(currentInput) / 100).toString();
  updateDisplay();
}

// Start Function to calculate the result of the current operation
function calculateResult() {
  if (currentOperator && previousInput && currentInput) {
    switch (currentOperator) {
      case "+":
        currentInput = (parseFloat(previousInput) + parseFloat(currentInput)).toString();
        break;
      case "-":
        currentInput = (parseFloat(previousInput) - parseFloat(currentInput)).toString();
        break;
      case "×":
        currentInput = (parseFloat(previousInput) * parseFloat(currentInput)).toString();
        break;
      case "/":
        if (currentInput !== "0") {
          currentInput = (parseFloat(previousInput) / parseFloat(currentInput)).toString();
        } else {
          currentInput = "Error";
        }
        break;
    }
    resultDisplayed = true;
    currentOperator = null;
    previousInput = "";
    updateDisplay();
  }
}


