import '../style/style.css'
import * as ACTIONS from './Actions'
import { handleMemoryChange, handleOperations, handlePowerFunctions, setNumbers, clearValues } from './HandleActions'

import {
  result,
  historyExpression,
  currentExpression,
  canPutDot,
  lastAction,
  expressionString,
} from './GlobalVariables'

const tables = document.querySelector('.tables')
const historyExpressionElem = document.querySelector('.content__history')
const currentExpressionElem = document.querySelector('.content__current')

tables.onclick = function (event) {
  let td = event.target.closest('td')

  if (!td) return

  if (!tables.contains(td)) return

  handleClick(td.dataset.action, td.innerText)

  currentExpressionElem.innerText = currentExpression || result
  historyExpressionElem.innerText = historyExpression
}

const handleClick = (action, value) => {
  switch (action) {
    case ACTIONS.ADD:
      handleOperations(action)
      break

    case ACTIONS.SUBTRACT:
      handleOperations(action)
      break

    case ACTIONS.MULTIPLY:
      handleOperations(action)
      break

    case ACTIONS.DIVIDE:
      handleOperations(action)
      break

    case ACTIONS.EQUAL: {
      if (!currentExpression || lastAction === ACTIONS.EQUAL) {
        historyExpression = currentExpression
        break
      }
      handleOperations(action)
      result = eval(expressionString)
      break
    }

    case ACTIONS.SQUARE_ROOT_Y: {
      if (!currentExpression) break
      else {
        currentExpression += 'ʸ√'
        historyExpression += currentExpression
      }

      lastAction = action
      break
    }

    case ACTIONS.POWER_Y: {
      if (!currentExpression) break
      else {
        expressionString += currentExpression
        currentExpression += '^'
        historyExpression += currentExpression
        expressionString += ' ** '
      }

      lastAction = action
      break
    }

    case ACTIONS.SQUARE_ROOT_2:
    case ACTIONS.SQUARE_ROOT_3:
    case ACTIONS.POWER_2:
    case ACTIONS.POWER_3: {
      if (!currentExpression) break
      else handlePowerFunctions(action, Number(currentExpression))

      lastAction = action
      break
    }

    case ACTIONS.LOGARITHM: {
      if (!currentExpression) currentExpression = 'log('
      else currentExpression += ' * log( '

      lastAction = action
      break
    }

    case ACTIONS.NATURAL_LOGARITHM: {
      if (!currentExpression) currentExpression = 'ln('
      else currentExpression += ' * ln( '

      lastAction = action
      break
    }

    case ACTIONS.E: {
      if (!currentExpression) currentExpression = 'e^('
      else currentExpression += ' * e^( '

      lastAction = action
      break
    }

    case ACTIONS.ONE_DIVIDE_X: {
      if (!currentExpression) currentExpression = '1 / '
      else currentExpression += ' * (1 / '

      lastAction = action
      break
    }

    case ACTIONS.CLEAR_EXPRESSION:
      currentExpression = ''
      result = 0
      break

    case ACTIONS.CLEAR:
      clearValues()
      break

    case ACTIONS.PLUS_MINUS: {
      if (currentExpression[0] === '-') {
        if (currentExpression.length === 1) currentExpression = ''
        else currentExpression = currentExpression.slice(1)
        break
      }

      lastAction = currentExpression
      currentExpression = '-' + lastAction.trim()
      lastAction = action
      break
    }

    case ACTIONS.DOT: {
      if (!canPutDot) break
      else currentExpression += !currentExpression ? '0' + value : value
      canPutDot = false
      break
    }

    case '0': {
      if (currentExpression[0] === '0' && currentExpression[1] !== '.') break

      if (!currentExpression) setNumbers(value)
      else setNumbers(value)
      break
    }

    case ACTIONS.LEFT_BRACKET:
    case ACTIONS.RIGHT_BRACKET:
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      setNumbers(value)
      console.log('value', value)
      break

    case ACTIONS.ADD_MEMORY:
    case ACTIONS.SUB_MEMORY:
    case ACTIONS.RECALL_MEMORY:
    case ACTIONS.RESET_MEMORY:
      handleMemoryChange(action)
      break

    default:
      break
  }
}
