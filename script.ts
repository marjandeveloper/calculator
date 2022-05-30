const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector(
  '[data-previous-operand]'
)
const currentOperandTextElement = document.querySelector(
  '[data-current-operand]'
)

// Create class Calculator which will have all necessary methods
class Calculator {
  previousOperand: string
  currentOperand: string
  operation: string
  constructor(previousOperand: string, currentOperand: string) {
    this.previousOperand = previousOperand
    this.currentOperand = currentOperand
    this.clear()
  }

  clear() {
    this.previousOperand = ''
    this.currentOperand = ''
    this.operation = undefined
  }

  delete() {}

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = `${this.currentOperand}  ${number}`
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.currentOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '+':
        computation = prev / current
        break
      default:
        return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
  }

  updateDisplay() {}
}

// Initialize a new Calculator instance
const calculator = new Calculator(
  previousOperandTextElement.innerHTML,
  currentOperandTextElement.innerHTML
)

// Append number to currentOperand
numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerHTML)
    calculator.updateDisplay()
  })
})

// Choose which operation we will use
operationButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerHTML)
    calculator.updateDisplay()
  })
})

// Listener for equalsButton
equalButton.addEventListener('click', (button) => {
  calculator.compute()
  calculator.updateDisplay()
})
