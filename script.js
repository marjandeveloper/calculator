var numberButtons = document.querySelectorAll('[data-number]');
var operationButtons = document.querySelectorAll('[data-operation]');
var equalButton = document.querySelector('[data-equals]');
var deleteButton = document.querySelector('[data-delete]');
var allClearButton = document.querySelector('[data-all-clear]');
var previousOperandTextElement = document.querySelector('[data-previous-operand]');
var currentOperandTextElement = document.querySelector('[data-current-operand]');
// Create class Calculator which will have all necessary methods
var Calculator = /** @class */ (function () {
    function Calculator(previousOperand, currentOperand) {
        this.previousOperand = previousOperand;
        this.currentOperand = currentOperand;
        this.clear();
    }
    Calculator.prototype.clear = function () {
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = undefined;
    };
    Calculator.prototype["delete"] = function () { };
    Calculator.prototype.appendNumber = function (number) {
        if (number === '.' && this.currentOperand.includes('.'))
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
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    };
    Calculator.prototype.updateDisplay = function () { };
    return Calculator;
}());
// Initialize a new Calculator instance
var calculator = new Calculator(previousOperandTextElement.innerHTML, currentOperandTextElement.innerHTML);
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
equalButton.addEventListener('click', function (button) {
    calculator.compute();
    calculator.updateDisplay();
});
