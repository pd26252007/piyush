let display = document.getElementById('display');
let currentInput = '0';
let operator = null;
let previousValue = null;
let shouldResetDisplay = false;

function updateDisplay() {
    display.textContent = currentInput;
}

function appendNumber(num) {
    if (shouldResetDisplay) {
        currentInput = num;
        shouldResetDisplay = false;
    } else {
        if (currentInput === '0') {
            currentInput = num;
        } else {
            currentInput += num;
        }
    }
    updateDisplay();
}

function appendDecimal() {
    if (shouldResetDisplay) {
        currentInput = '0.';
        shouldResetDisplay = false;
    } else if (!currentInput.includes('.')) {
        currentInput += '.';
    }
    updateDisplay();
}

function toggleSign() {
    if (currentInput !== '0') {
        currentInput = currentInput.startsWith('-') 
            ? currentInput.slice(1) 
            : '-' + currentInput;
    }
    updateDisplay();
}

function appendOperator(op) {
    if (operator !== null && !shouldResetDisplay) {
        calculate();
    }
    previousValue = parseFloat(currentInput);
    operator = op;
    shouldResetDisplay = true;
}

function calculate() {
    if (operator === null || previousValue === null) return;

    const currentValue = parseFloat(currentInput);
    let result;

    switch(operator) {
        case '+':
            result = previousValue + currentValue;
            break;
        case '-':
            result = previousValue - currentValue;
            break;
        case '*':
            result = previousValue * currentValue;
            break;
        case '/':
            result = currentValue === 0 ? 'Error' : previousValue / currentValue;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = null;
    previousValue = null;
    shouldResetDisplay = true;
    updateDisplay();
}

function clearDisplay() {
    currentInput = '0';
    operator = null;
    previousValue = null;
    shouldResetDisplay = false;
    updateDisplay();
}

updateDisplay();