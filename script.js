const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector(
  '[data-previous-operand]'
).innerHTML
const currentOperandTextElement = document.querySelector(
  '[data-current-operand]'
).innerHTML

class Calculator {
  constructor(previousOperand, currentOperand) {
    this.previousOperand = previousOperand
    this.currentOperand = currentOperand
    this.clear()
  }

  clear() {
    console.log(this.previousOperand)
  }
}

const calculaltor = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
)
