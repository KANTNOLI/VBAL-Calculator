document.addEventListener("DOMContentLoaded", () => {
  const result = document.getElementById("result");
  let currentInput = "0";
  let savedInput = null;
  let currentOp = null;
  let shouldResetInput = false;
  let expression = "";

  const updateDisplay = () => {
    result.textContent = expression || "0";
  };

  const handleButtonClick = (e) => {
    if (!e.target.matches("button")) return;

    const value = e.target.dataset.value;

    if (!isNaN(value) || value === ".") {
      if (shouldResetInput) {
        currentInput = value === "." ? "0." : value;
        shouldResetInput = false;
      } else {
        if (value === "." && currentInput.includes(".")) return;
        currentInput += value;
      }
      expression += value;
    } else if (value === "clear") {
      currentInput = "0";
      savedInput = null;
      currentOp = null;
      expression = "";
    } else if (value === "=") {
      if (currentOp && savedInput !== null) {
        calculate();
        expression = currentInput;
        currentOp = null;
      }
    } else if (value === "+/-") {
      currentInput = (parseFloat(currentInput) * -1).toString();
      const match = expression.match(/(-?\d+\.?\d*)$/);
      if (match) {
        expression = expression.slice(0, -match[0].length) + currentInput;
      }
    } else if (value === "%") {
      currentInput = (parseFloat(currentInput) / 100).toString();
      const match = expression.match(/(\d+\.?\d*)$/);
      if (match) {
        expression = expression.slice(0, -match[0].length) + currentInput;
      }
    } else if (value === "!") {
      const num = parseInt(currentInput);
      if (!isNaN(num) && num >= 0) {
        currentInput = factorial(num).toString();
        expression = currentInput;
      }
    } else if (["+", "-", "*", "/"].includes(value)) {
      if (currentOp && savedInput !== null) {
        calculate();
        expression = currentInput + value;
      } else {
        expression += value;
      }
      savedInput = currentInput;
      currentOp = value;
      shouldResetInput = true;
    }

    updateDisplay();
  };

  const calculate = () => {
    const a = parseFloat(savedInput);
    const b = parseFloat(currentInput);
    let resultValue;

    switch (currentOp) {
      case "+":
        resultValue = a + b;
        break;
      case "-":
        resultValue = a - b;
        break;
      case "*":
        resultValue = a * b;
        break;
      case "/":
        resultValue = a / b;
        break;
      default:
        return;
    }

    currentInput = resultValue.toString();
    savedInput = null;
  };

  document.addEventListener("click", handleButtonClick);
  updateDisplay();
});

const factorial = (n) => {
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
};
