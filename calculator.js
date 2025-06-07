document.addEventListener("DOMContentLoaded", () => {
  const expressionDisplay = document.getElementById("expression-12-52-32-34-2403");
  const outputDisplay = document.getElementById("output-12-52-32-34-2403");

  let expression = "";
  let currentInput = "";
  let resetOnNext = false;

  const updateDisplay = () => {
    expressionDisplay.textContent = expression;
    outputDisplay.textContent = currentInput || "0";
  };

  const clear = () => {
    expression = "";
    currentInput = "";
    resetOnNext = false;
    updateDisplay();
  };

  const inputDigit = (digit) => {
    if (resetOnNext) {
      currentInput = digit;
      resetOnNext = false;
    } else {
      currentInput += digit;
    }
    expression += digit;
    updateDisplay();
  };

  const inputDot = () => {
    if (!currentInput.includes(".")) {
      currentInput += ".";
      expression += ".";
      updateDisplay();
    }
  };

  const inputOperator = (op) => {
    if (currentInput === "" && expression === "") return;
    if (resetOnNext) resetOnNext = false;

    if (/[+\-*/]$/.test(expression)) {
      expression = expression.slice(0, -1) + op;
    } else {
      expression += op;
    }
    currentInput = "";
    updateDisplay();
  };

  const calculate = () => {
    try {
      const result = Function(`return ${expression}`)();
      expressionDisplay.textContent = expression + " =";
      currentInput = result.toString();
      expression = "";
      resetOnNext = true;
      updateDisplay();
    } catch {
      currentInput = "Ошибка";
      resetOnNext = true;
      updateDisplay();
    }
  };

  const toggleSign = () => {
    if (currentInput) {
      currentInput = (parseFloat(currentInput) * -1).toString();
      expression = expression.replace(/(\d+\.?\d*)$/, currentInput);
      updateDisplay();
    }
  };

  const percent = () => {
    if (currentInput) {
      currentInput = (parseFloat(currentInput) / 100).toString();
      expression = expression.replace(/(\d+\.?\d*)$/, currentInput);
      updateDisplay();
    }
  };

  const factorial = () => {
    const num = parseInt(currentInput);
    if (isNaN(num) || num < 0) return;
    let result = 1;
    for (let i = 2; i <= num; i++) result *= i;
    currentInput = result.toString();
    expression = currentInput;
    updateDisplay();
  };

  const id = (base) => document.getElementById(`${base}-12-52-32-34-2403`);

  id("btn-clear").addEventListener("click", clear);
  id("btn-negate").addEventListener("click", toggleSign);
  id("btn-percent").addEventListener("click", percent);
  id("btn-divide").addEventListener("click", () => inputOperator("/"));
  id("btn-multiply").addEventListener("click", () => inputOperator("*"));
  id("btn-minus").addEventListener("click", () => inputOperator("-"));
  id("btn-plus").addEventListener("click", () => inputOperator("+"));
  id("btn-equals").addEventListener("click", calculate);
  id("btn-factorial").addEventListener("click", factorial);
  id("btn-dot").addEventListener("click", inputDot);

  for (let i = 0; i <= 9; i++) {
    id(`btn-${i}`).addEventListener("click", () => inputDigit(i.toString()));
  }

  updateDisplay();
});
