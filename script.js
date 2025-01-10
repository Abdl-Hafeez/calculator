const display = document.querySelector('.display');
const digitBtns = document.querySelectorAll('.digit');
const operatorBtns = document.querySelectorAll('.operator');
const clearBtn =  document.querySelector('.clear');
const dotBtn = document.querySelector('.dot');
const equalsBtn = document.querySelector('.equals');

let number1 = 0;
let number2 = 0;
let operatorSign = '';

function operator(operator, num1, num2) {
    if(operator === '+') return add(num1, num2);
    if(operator === '-') return subtract(num1, num2);
    if(operator === '*') return multiply(num1, num2);
    if(operator === '/') return divide(num1, num2);
    if(operator === '%') return remainder(num1, num2);
}

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
    return a / b;
}

function remainder(a, b) {
    return a % b;
}



