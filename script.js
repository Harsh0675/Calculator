const resultDisplay = document.getElementById('result');
const expressionDisplay = document.getElementById('expression');

function appendValue(value) {
    if (resultDisplay.value === 'Error') {
        resultDisplay.value = '';
    }

    const lastChar = resultDisplay.value.slice(-1);
    const operators = ['+','-','*','/','%'];

    // prevent duplicate operators
    if (operators.includes(value) && operators.includes(lastChar)) {
        // replace last operator with the new one
        resultDisplay.value = resultDisplay.value.slice(0, -1) + value;
        updateExpression();
        return;
    }

    resultDisplay.value += value;
    updateExpression();
}

function clearDisplay() {
    resultDisplay.value = '';
    expressionDisplay.textContent = '';
}

function deleteLast() {
    if (resultDisplay.value === 'Error') {
        resultDisplay.value = '';
    } else {
        resultDisplay.value = resultDisplay.value.toString().slice(0, -1);
    }
    updateExpression();
}

function calculateResult() {
    try {
        if (resultDisplay.value.trim() === '') return;

        // Show the expression above the result
        expressionDisplay.textContent = resultDisplay.value;

        // Normalize symbols for JS evaluation
        let expr = resultDisplay.value.replace(/×/g, '*').replace(/÷/g, '/');
        // Convert percentage symbol (simple conversion: '50%' -> '50/100')
        expr = expr.replace(/(\d+)%/g, '($1/100)');

        const calculate = new Function('return ' + expr);
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

function updateExpression(){
    // keep a short preview of the expression
    expressionDisplay.textContent = resultDisplay.value.slice(0, 40);
}

// Keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (/[0-9\+\-\*\/\.\%]/.test(key)) {
        appendValue(key);
    } else if (key === 'Enter') {
        event.preventDefault();
        calculateResult();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === 'Escape') {
        clearDisplay();
    }
});
