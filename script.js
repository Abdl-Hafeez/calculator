const display = document.querySelector('.display');
const digitBtns = document.querySelectorAll('.digit');
const operatorBtns = document.querySelectorAll('.operator');
const clearBtn =  document.querySelector('.clear');
const backspaceBtn = document.querySelector('.backspace');
const equalsBtn = document.querySelector('.equals');

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
    if(operator === '÷')  {
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

digitBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        displayInput(btn.value);  
        if(!operatorSign) {
            firstNumber = display.textContent;
            currentDisplay = firstNumber;   
        } else {
            secondNumber = secondNumber ? secondNumber + btn.value : btn.value;
            currentDisplay = firstNumber + operatorSign + secondNumber;
        }
        
    })
})

operatorBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        if(firstNumber) {
            displayInput(btn.value);
            operatorSign = btn.value;
            currentDisplay = firstNumber + operatorSign;
            display.textContent = currentDisplay;
        } 
        
    })
})

equalsBtn.addEventListener('click', () => {
    const result = operator(Number(firstNumber), operatorSign, Number(secondNumber));
    let roundedResult;
    if(firstNumber && operatorSign && secondNumber) {
        if (result.toString().includes('.') && result.toString().length > 10) {
            roundedResult = Number(result.toFixed(10));
        } else {
            roundedResult = result; 
        }
        display.textContent = roundedResult;
        firstNumber = roundedResult;
        operatorSign = null;
        secondNumber = null;
    }
})

clearBtn.addEventListener('click', () => {
    display.textContent = '';
    firstNumber = null;
    secondNumber = null;
    operatorSign = null;
    currentDisplay = '';
})

backspaceBtn.addEventListener('click', ()  => {
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
    
})