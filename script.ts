const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector(
  '[data-previous-operand]'
) as HTMLElement
const currentOperandTextElement = document.querySelector(
  '[data-current-operand]'
) as HTMLElement

// Create class Calculator which will have all necessary methods
class Calculator {
  previousOperand: string
  currentOperand: string
  operation: string = ''
  constructor(
    previousOperandTextElement: string,
    currentOperandpreviousOperandTextElement: string
  ) {
    this.previousOperand = previousOperandTextElement
    this.currentOperand = currentOperandpreviousOperandTextElement
    this.clear()
  }

  clear() {
    this.previousOperand = ''
    this.currentOperand = ''
    this.operation = ''
  }

  delete() {
    this.currentOperand = this.currentOperand.slice(0, -1)
  }

  appendNumber(number: string) {
    const checkCurrentOperand = this.currentOperand
    if (number === '.' && checkCurrentOperand.search('.')) return
    this.currentOperand = `${this.currentOperand}  ${number}`
  }

  chooseOperation(operation: string) {
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
    this.currentOperand = computation.toString()
    this.operation = ''
    this.previousOperand = ''
  }

  getDisplayNumber(number: string) {
    const floatNumber: number = parseFloat(number)
    const integerDigits: number = parseFloat(number)
    const decimalDigits: string[] = number.split('.')
    let integerDisplay: string
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0,
      })
    }
    if (decimalDigits !== null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.currentOperand = `${this.getDisplayNumber(this.previousOperand)}  ${
      this.operation
    }`
    if (this.operation !== null) {
      this.previousOperand = `${this.getDisplayNumber(this.previousOperand)}  ${
        this.operation
      }`
    } else {
      this.previousOperand = ''
    }
  }
}

// Initialize a new Calculator instance
const calculator = new Calculator(
  previousOperandTextElement.innerText,
  currentOperandTextElement.innerText
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
if (equalButton) {
  equalButton.addEventListener('click', (button) => {
    calculator.compute()
    calculator.updateDisplay()
  })
}

// Add Clear Button Listener
allClearButton?.addEventListener('click', (button) => {
  calculator.clear()
  calculator.updateDisplay()
})

// Add Delete Button Listener
deleteButton?.addEventListener('click', (button) => {
  calculator.delete()
  calculator.updateDisplay()
})
