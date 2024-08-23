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

const inputs = document.querySelectorAll('.input');

