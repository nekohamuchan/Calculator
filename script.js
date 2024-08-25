const numbers = document.querySelector('.numbers');
const operators = document.querySelector('.operators');

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
            numInput.textContent = '‧';
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
let num1 = null;
let num2 = null;
let operator1 = null;
let operator2 = null;
let result = null;

const clearAll = () => {
    inputDisplay.textContent = '0';
    num1 = null;
    num2 = null;
    operator1 = null;
    operator2 = null;
    result = null;
    calStep = 1;
    nextNum = false;
};

const delDisplay = () => {
    const inputs = inputDisplay.textContent;
    if (inputs.length <= 1) {
        inputDisplay.textContent = '0';
        return;
    };
    inputDisplay.textContent = inputs.slice(0, inputs.length - 1);
    nextNum = false;
};

const addDecimal = () => {
    if (inputDisplay.textContent.includes('.')) {
        return;
    };
    inputDisplay.textContent += '.';
    setTimeout(() => {
        digitSFX.play();
        setTimeout(() => {
            digitSFX.pause();
            digitSFX.currentTime = 0;
        }, 80);
    }, 60);
};

const newDisplay = () => {
    const inputs = inputDisplay.textContent;
    if (inputs === '0'
        || inputs == 'ERROR' 
        || nextNum) {
        inputDisplay.textContent = '';
        nextNum = false;
    };
};

const updateDisplay = (input) => {
    if (inputDisplay.textContent.length >= maxInputLength) {
        return;
    };
    inputDisplay.textContent += input;
    setTimeout(() => {
        digitSFX.play();
        setTimeout(() => {
            digitSFX.pause();
            digitSFX.currentTime = 0;
        }, 80);
    }, 60);
};

const operate = (operator, a, b) => {
    switch (operator) {
        case '＋':
            return a + b; 
        case '－':
            return a - b;
        case '×':
            return a * b;
        case '÷':
            if (b === 0) {
                clearAll();
                return 'ERROR';
            } else {
                return a / b;
            };
    };
};

let calStep = 1;
let nextNum = false;
const calculate = (input) => {
    //first prevent user click operator twice at same time then calculate
    //steps of calculate
    //1. get num1 and operator1
    //2. get num2 and operator2
    //   if operator2 === equals => show result & back to step 1
    //   if operator2 !== equals => show result
    //   result become num1, operator2 become operator1, repeat step 2
    switch (calStep) {
        case 1:
            num1 = Number(inputDisplay.textContent);
            operator1 = input;
            if (operator1 === '＝') {
                return;
            };
            nextNum = true;
            calStep = 2;
            break;
        case 2:
            operator2 = input;
            if (operator2 === '＝') {
                num2 = Number(inputDisplay.textContent);
                result = operate(operator1, num1, num2);
                inputDisplay.textContent = result;
                calStep = 1;
            } else {
                num2 = Number(inputDisplay.textContent);
                result = operate(operator1, num1, num2);
                inputDisplay.textContent = result;
                num1 = result;
                operator1 = operator2;
            };
            nextNum = true;
            checkLength();
            break;
    };
};

const checkLength = () => {
    const resultLength = result.toString().length;
    if (resultLength >= maxInputLength) {
        if (result % 1 != 0) {
            const intLength = parseInt(result).toString().length;
            result = Number(result.toFixed(maxInputLength - intLength));
            inputDisplay.textContent = result;
            return;
        };
        clearAll();
        inputDisplay.textContent = 'ERROR';
    };
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
        inputs.forEach(input => input.classList.remove('pressed'));
        const clicked = e.target.textContent;
        buttonSFX.play();

        if (clicked === '⏻') {
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
            };
        } else if (!power) {
            return;
        };

        newDisplay();
        if (!Number.isNaN(Number(clicked))) {
            updateDisplay(clicked);
        } else {
            switch (clicked) {
                case 'C':
                    clearAll();
                    break;
                case 'Del':
                    delDisplay();
                    break;
                case '＝':
                case '＋':
                case '－':
                case '×':
                case '÷':
                    calculate(clicked);
                    break;
                case '‧':
                    addDecimal();
                    break;
            };
        };
    });
});

const bindInput = (input) => {
    Array.from(inputs).find(node => node.textContent === input).click();
    Array.from(inputs).find(node => node.textContent === input).classList.add('active');
};

window.addEventListener('keydown', e => {
    if (!Number.isNaN(Number(e.key))) {
        bindInput(e.key);
    } else {
        switch(e.key) {
            case 'c':
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
            case '/':
                bindInput('÷');
                break; 
            case '.':
                bindInput('‧');
                break;
        };
    };
});

window.addEventListener('keyup', e => {
    inputs.forEach(input => input.classList.remove('active'));
});