const resultDisplay = document.getElementById('result');

function appendValue(value) {
    if (resultDisplay.value === 'Error') {
        resultDisplay.value = '';
    }
    resultDisplay.value += value;
}

function clearDisplay() {
    resultDisplay.value = '';
}

function deleteLast() {
    if (resultDisplay.value === 'Error') {
        resultDisplay.value = '';
    } else {
        resultDisplay.value = resultDisplay.value.toString().slice(0, -1);
    }
}

function calculateResult() {
    try {
        if (resultDisplay.value.trim() === '') return;
        
        const calculate = new Function('return ' + resultDisplay.value);
        const result = calculate();

        if (!isFinite(result) || isNaN(result)) {
            resultDisplay.value = 'Error';
        } else {
            resultDisplay.value = Math.round(result * 100000000) / 100000000;
        }
    } catch (error) {
        resultDisplay.value = 'Error';
    }
}

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (/[0-9\+\-\*\/\.]/.test(key)) {
        appendValue(key);
    } else if (key === 'Enter') {
        calculateResult();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === 'Escape') {
        clearDisplay();
    }
});