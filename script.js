var numberButtons = document.querySelectorAll('[data-number]');
var operationButtons = document.querySelectorAll('[data-operation]');
var equalButton = document.querySelector('[data-equals]');
var deleteButton = document.querySelector('[data-delete]');
var allClearButton = document.querySelector('[data-all-clear]');
var previousOperandTextElement = document.querySelector('[data-previous-operand]');
var currentOperandTextElement = document.querySelector('[data-current-operand]');
// Create class Calculator which will have all necessary methods
var Calculator = /** @class */ (function () {
    function Calculator(previousOperandTextElement, currentOperandpreviousOperandTextElement) {
        this.operation = '';
        this.previousOperand = previousOperandTextElement;
        this.currentOperand = currentOperandpreviousOperandTextElement;
        this.clear();
    }
    Calculator.prototype.clear = function () {
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = '';
    };
    Calculator.prototype["delete"] = function () {
        this.currentOperand = this.currentOperand.slice(0, -1);
    };
    Calculator.prototype.appendNumber = function (number) {
        var checkCurrentOperand = this.currentOperand;
        if (number === '.' && checkCurrentOperand.search('.'))
            return;
        this.currentOperand = "".concat(this.currentOperand, "  ").concat(number);
    };
    Calculator.prototype.chooseOperation = function (operation) {
        if (this.currentOperand === '')
            return;
        if (this.currentOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    };
    Calculator.prototype.compute = function () {
        var computation;
        var prev = parseFloat(this.previousOperand);
        var current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current))
            return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '+':
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = computation.toString();
        this.operation = '';
        this.previousOperand = '';
    };
    Calculator.prototype.getDisplayNumber = function (number) {
        var floatNumber = parseFloat(number);
        var integerDigits = parseFloat(number);
        var decimalDigits = number.split('.');
        var integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        }
        else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            });
        }
        if (decimalDigits !== null) {
            return "".concat(integerDisplay, ".").concat(decimalDigits);
        }
        else {
            return integerDisplay;
        }
    };
    Calculator.prototype.updateDisplay = function () {
        this.currentOperand = "".concat(this.getDisplayNumber(this.previousOperand), "  ").concat(this.operation);
        if (this.operation !== null) {
            this.previousOperand = "".concat(this.getDisplayNumber(this.previousOperand), "  ").concat(this.operation);
        }
        else {
            this.previousOperand = '';
        }
    };
    return Calculator;
}());
// Initialize a new Calculator instance
var calculator = new Calculator(previousOperandTextElement.innerText, currentOperandTextElement.innerText);
// Append number to currentOperand
numberButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        calculator.appendNumber(button.innerHTML);
        calculator.updateDisplay();
    });
});
// Choose which operation we will use
operationButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        calculator.chooseOperation(button.innerHTML);
        calculator.updateDisplay();
    });
});
// Listener for equalsButton
if (equalButton) {
    equalButton.addEventListener('click', function (button) {
        calculator.compute();
        calculator.updateDisplay();
    });
}
// Add Clear Button Listener
allClearButton === null || allClearButton === void 0 ? void 0 : allClearButton.addEventListener('click', function (button) {
    calculator.clear();
    calculator.updateDisplay();
});
// Add Delete Button Listener
deleteButton === null || deleteButton === void 0 ? void 0 : deleteButton.addEventListener('click', function (button) {
    calculator["delete"]();
    calculator.updateDisplay();
});
