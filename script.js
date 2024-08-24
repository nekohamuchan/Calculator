const numbers = document.querySelector('.numbers');
const operators = document.querySelector('.operators');
const extra = document.querySelector('.extra');

//create number inputs
for (let i = 1; i <= 14; i++) {
    const numInput = document.createElement('button');
    numInput.classList.add('input');
    numInput.textContent = i;
    switch (i) {
        case 1:
            numInput.textContent = '⏻';
            break;
        case 2:
            numInput.textContent = 'C';
            break;
        case 3:
            numInput.textContent = 'Del';
            break;
        case 13:
            numInput.textContent = 0;
            break;
        case 14:
            numInput.textContent = '.';
            break;
    };

    if (i >= 4 && i <= 12) {
        numInput.textContent = i - 3;
    };

    numbers.append(numInput);
};

//create operator inputs
for (let i = 1; i <= 5; i++) {
    const opInput = document.createElement('button');
    opInput.classList.add('input');
    switch (i) {
        case 1:
            opInput.textContent = '＝';
            break;
        case 2:
            opInput.textContent = '＋';
            break;
        case 3:
            opInput.textContent = '－';
            break;
        case 4:
            opInput.textContent = '×';
            break;
        case 5:
            opInput.textContent = '÷';
            break;
    };

    operators.append(opInput);
};

const buttonSFX = new Audio('./sounds/switch-light.mp3');
const digitSFX = new Audio('./sounds/buttons_calculator.mp3');

const inputDisplay = document.querySelector('.input-area'); 
const inputs = document.querySelectorAll('.input');
const maxInputLength = 9;
let power = false;
let firstNum = 0;
let secondNum = 0;
let op = '';

const checkError = () => {
    if (inputDisplay.textContent.length > maxInputLength) {
        clearAll();
        inputDisplay.textContent = 'ERROR';
    };
};

const clearAll = () => {
    inputDisplay.textContent = 0;
    firstNum = 0;
    secondNum = 0;
    op = '';
};

const delInputs = () => {

};

const getInput = (input) => {
    if (!power
        || (inputDisplay.textContent.includes('.') && input === '.')
        || inputDisplay.textContent.length >= maxInputLength) {
        return;
    } else if (inputDisplay.textContent == 0 || inputDisplay.textContent == 'ERROR') {
        inputDisplay.textContent = '';
    };
    inputDisplay.textContent += input;
    digitSFX.play();
};

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operate = (operator, firstNum, secondNum) => {

    checkMaxLength();
};

const log = document.querySelector('.log');
const makeLog = () => {
    const li = document.createElement('li');
    log.append(li);
};

const updateLog = () => {
    
};

inputs.forEach(input => {
    input.addEventListener('click', e => {
        const clicked = e.target.textContent;
        buttonSFX.play();

        if (!Number.isNaN(parseFloat(clicked)) || clicked === '.') {
            getInput(clicked);
        } else {
            switch (clicked) {
                case 'C':
                    clearAll();
                    break;
                case 'Del':
                    delInputs();
                    break;
                case '＝':
                case '＋':
                case '－':
                case '×':
                case '÷':
                    op = clicked;
                    operate(op, firstNum, secondNum);
                    break;
                case '⏻':
                    if (!power) {
                        clearAll();
                        inputDisplay.classList.add('power-on');
                        inputDisplay.classList.remove('power-off');
                        power = true;
                    } else {
                        inputDisplay.classList.add('power-off');
                        inputDisplay.classList.remove('power-on');
                        power = false;
                        setTimeout(() => clearAll(), 1000);
                    }
                    break;
            };
        }; 
        console.log();  
    });
});

const bindInput = (input) => {
    Array.from(inputs).find(node => node.textContent === input).click();
    Array.from(inputs).find(node => node.textContent === input).classList.add('active');
};

window.addEventListener('keydown', e => {
    console.log(e.key);
    if (!Number.isNaN(parseFloat(e.key)) || e.key === '.') {
        bindInput(e.key);
    } else {
        switch(e.key) {
            case 'c':
            case 'C':
                bindInput('C');
                break;
            case 'Backspace':
                bindInput('Del');
                break;
            case '=':
                bindInput('＝');
                break;
            case '+':
                bindInput('＋');
                break;
            case '-':
                bindInput('－');
                break;
            case 'x':
                bindInput('×');
                break;
            case 'X':
                bindInput('×');
                break;
            case '/':
                bindInput('÷');
                break; 
        };
    };
});

window.addEventListener('keyup', e => {
    inputs.forEach(input => input.classList.remove('active'));
});