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
            numInput.textContent = '☁︎';
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

const inputScreen = document.querySelector('.screen'); 
const inputs = document.querySelectorAll('.input');
let result = 0;
let currNum = 0;
const maxInputLength = 9;

const clearInputs = () => {
    currNum = 0;
    inputScreen.textContent = currNum;
};

const clearAll = () => {
    clearInputs();
    result = 0;
};

const delInputs = () => {
    if (currNum == 0 || currNum.length === 1) {
        currNum = 0;
        inputScreen.textContent = currNum;
        return;
    };
    currNum = currNum.slice(0, currNum.length - 1);
    inputScreen.textContent = currNum;
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

inputs.forEach(input => {
    input.addEventListener('click', e => {
        const clicked = e.target.textContent;

        if (!Number.isNaN(parseFloat(clicked)) || clicked === '.') {
            getInput(clicked);
        } else {
            switch (typed) {
                case 'C':
                    clearAll();
                    break;
                case 'Del':
                    delInputs();
                    break;
                case '＝':
                    break;
            };
        };

        console.log(currNum);
    });
});

window.addEventListener('keypress', e => {
    console.log(e.key);
    if (!Number.isNaN(parseFloat(e.key)) || e.key === '.') {
        getInput(e.key);
    };
});