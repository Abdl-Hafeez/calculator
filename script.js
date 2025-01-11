const display = document.querySelector('.display');
const digitBtns = document.querySelectorAll('.digit');
const operatorBtns = document.querySelectorAll('.operator');
const clearBtn =  document.querySelector('.clear');
const equalsBtn = document.querySelector('.equals');

let firstNumber = null;
let secondNumber = null;
let operatorSign = null;
let currentDisplay = firstNumber + operatorSign + secondNumber; 

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
            secondNumber = btn.value;
            console.log(secondNumber);
            currentDisplay = firstNumber + operatorSign + secondNumber;
        }
        
    })
})

operatorBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        displayInput(btn.value);
        operatorSign = btn.value;
        currentDisplay = firstNumber + operatorSign;
        display.textContent = currentDisplay;
    })
})

equalsBtn.addEventListener('click', () => {
    const result = operator(Number(firstNumber), operatorSign, Number(secondNumber));
    display.textContent = result;
    firstNumber = result;
    operatorSign = null;
    secondNumber = null;
})

clearBtn.addEventListener('click', () => {
    display.textContent = '';
})