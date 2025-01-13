const display = document.querySelector('.display');
const digitBtns = document.querySelectorAll('.digit');
const operatorBtns = document.querySelectorAll('.operator');
const clearBtn =  document.querySelector('.clear');
const backspaceBtn = document.querySelector('.backspace');
const equalsBtn = document.querySelector('.equals');
const dotBtn = document.querySelector('.dot');

let firstNumber = null;
let secondNumber = null;
let operatorSign = null;
let currentDisplay =   null;

function operator(num1, operator, num2) {
    if(operator === '+')  {
        return num1 + num2;
    }
    if(operator === '-') {
        return num1 - num2;
    } 
    if(operator === '*')  {
        return num1 * num2;
    }
    if(operator === '/')  {
        return num1 / num2;
    }
    if(operator === '%')  {
        return num1 % num2;
    }
}

function displayInput(value) {
    if(display.textContent === '0') {
        display.textContent = value;
    } else {
        display.textContent += value;
    }
}

function dislplayDigits(value) {
    displayInput(value); 
    if(!operatorSign) {
        firstNumber = display.textContent;
        currentDisplay = firstNumber;   
    } else {
        secondNumber = secondNumber ? secondNumber + value : value;
        currentDisplay = firstNumber + operatorSign + secondNumber;
    }   

    if(firstNumber.includes('.') && !operatorSign || operatorSign && !secondNumber || operatorSign && secondNumber.includes('.')) {
        dotBtn.disabled = true;
    }else {
        dotBtn.disabled = false;
    } 
}

function displayOperators(operator) {
    if(firstNumber) {
        displayInput(operator);
        operatorSign = operator;
        currentDisplay = firstNumber + operatorSign;
        display.textContent = currentDisplay;
    } 
}

function displayResult() {
    const result = operator(Number(firstNumber), operatorSign, Number(secondNumber));
    let roundedResult;
    if(firstNumber && operatorSign && secondNumber) {
        if (result.toString().includes('.') && result.toString().length > 10) {
            roundedResult = Number(result.toFixed(10));
        } else {
            roundedResult = result; 
        }
        display.textContent = roundedResult;
        firstNumber = roundedResult.toString();
        operatorSign = null;
        secondNumber = null;
        currentDisplay = firstNumber;
        dotBtn.disabled = false;
    }
}

function allClear() {
    display.textContent = '';
    firstNumber = null;
    secondNumber = null;
    operatorSign = null;
    currentDisplay = '';
}

function backspace() {
    if(currentDisplay.length > 0) {
        const newDisplay = currentDisplay.slice(0, -1);
        display.textContent = newDisplay;
        currentDisplay = newDisplay;
        if(secondNumber && currentDisplay.includes(operatorSign)) {
            secondNumber = secondNumber.slice(0, -1);
        } else  {
            firstNumber = firstNumber.slice(0, -1);
        }
    }
}

digitBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        dislplayDigits(btn.value);
    })
})

operatorBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        displayOperators(btn.value);
    })
})

equalsBtn.addEventListener('click', () => {
    displayResult();
})

clearBtn.addEventListener('click', () => {
    allClear();
})

backspaceBtn.addEventListener('click', ()  => {
    backspace();
})

document.addEventListener('keydown', (event) => {
    if(!isNaN(event.key) || event.key === '.') {
        dislplayDigits(event.key);
    } else if((event.key === '+') || (event.key === '-') || (event.key === '*') || (event.key === '/') || (event.key === '%')) {
        displayOperators(event.key);
    } else if (event.key === '=' || event.key === 'Enter') {
        displayResult();
    } else if (event.key === 'Backspace' || event.key === 'Delete') {
        backspace();
    } else if (event.key === 'Escape') {
        allClear();
    }
})

