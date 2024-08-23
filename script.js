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

const inputScreen = document.querySelector('.input-area'); 
const inputs = document.querySelectorAll('.input');
let stored = 0;
let currNum = 0;
const maxInputLength = 9;
let power = false;

const checkMaxLength = () => {
    if (inputScreen.textContent.length > maxInputLength) {
        inputScreen.textContent = 'ERROR';
        currNum = 0;
        stored = 0;
    };
};

const clearInputs = () => {
    currNum = 0;
    inputScreen.textContent = currNum;
};

const clearAll = () => {
    clearInputs();
    stored = 0;
};

const delInputs = () => {
    const inputLength = inputScreen.textContent.length;
    if (inputLength === 0 || inputLength === 1) {
        currNum = 0;
        inputScreen.textContent = currNum;
        return;
    };
    inputScreen.textContent = inputScreen.textContent.slice(0, inputLength - 1);
    currNum = inputScreen.textContent;
};

const getInput = (input) => {
    if (currNum === 0 && input !== '.') {
        currNum = '';
    } else if ((currNum[currNum.length - 1] === '.' && input === '.') ||
                currNum.length >= maxInputLength) {
        return;
    };
    currNum += input;
    inputScreen.textContent = currNum;
};

let currOp = '';

const add = () => {
    stored += parseFloat(currNum);
    currNum = 0;
    if (currOp !== '') {
        inputScreen.textContent = stored;
    };
    currOp = 'add';
    checkMaxLength();
};

const subtract = () => {
    checkMaxLength();
};

const multiply = () => {
    checkMaxLength();
};

const divide = () => {
    checkMaxLength();
};

const equals = () => {
    switch (currOp) {
        case 'add':
            stored += parseFloat(currNum);
            break;
        default:
            return;
    };
    currOp = '';
    inputScreen.textContent = stored;
    currNum = stored;
    stored = 0;
    checkMaxLength();
};

inputs.forEach(input => {
    input.addEventListener('click', e => {
        const clicked = e.target.textContent;

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
                    equals();
                    break;
                case '＋':
                    add();
                    break;
                case '－':
                    subtract();
                    break;
                case '×':
                    multiply();
                    break;
                case '÷':
                    divide();
                    break;
                case '⏻':
                    if (!power) {
                        clearAll();
                        inputScreen.classList.add('power-on');
                        inputScreen.classList.remove('power-off');
                        power = true;
                    } else {
                        inputScreen.classList.add('power-off');
                        inputScreen.classList.remove('power-on');
                        power = false;
                        setTimeout(() => clearAll(), 1000);
                    }
                    break;
            };
        }; 
        console.log('currNum: ' + currNum, 'stored: ' + stored);    
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
            case '+':
            case '-':
            case 'x':
            case 'X':
            case '/':

                break; 
        };
    };
});

window.addEventListener('keyup', e => {
    inputs.forEach(input => input.classList.remove('active'));
});