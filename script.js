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

        if(firstNumber.includes('.') && !operatorSign || operatorSign && !secondNumber || operatorSign && secondNumber.includes('.')) {
            dotBtn.disabled = true;
        }else {
            dotBtn.disabled = false;
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
        firstNumber = roundedResult.toString();
        operatorSign = null;
        secondNumber = null;
        currentDisplay = firstNumber;
        dotBtn.disabled = false;
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

document.addEventListener('keydown', (event) => {
    // let keyboardOperator = '+' || '-' || '*' || '/' || '%';
    if(!isNaN(event.key) || event.key === '.') {
        console.log(typeof (event.key));
        displayInput(event.key); 
        if(!operatorSign) {
            firstNumber = display.textContent;
            currentDisplay = firstNumber;   
        } else {
            secondNumber = secondNumber ? secondNumber + event.key : event.key;
            currentDisplay = firstNumber + operatorSign + secondNumber;
        }   

        if(firstNumber.includes('.') && !operatorSign || operatorSign && !secondNumber || operatorSign && secondNumber.includes('.')) {
            dotBtn.disabled = true;
        }else {
            dotBtn.disabled = false;
        } 
    } else if((event.key === '+') || (event.key === '-') || (event.key === '*') || (event.key === '/') || (event.key === '%')) {
        console.log(event.key + 'key pressed');
        if(firstNumber) {
            displayInput(event.key);
            operatorSign = event.key;
            currentDisplay = firstNumber + operatorSign;
            display.textContent = currentDisplay;
        } 
    } else if (event.key === '=' || event.key === 'Enter') {
        console.log(event.key + 'key pressed');
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
    } else if (event.key === 'Backspace' || event.key === 'Delete') {
        console.log(event.key + 'key pressed');
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
})