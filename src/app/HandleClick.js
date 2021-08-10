import * as ACTIONS from './Actions'
import {
  SYMBOL_POWER_Y,
  SYMBOL_POWER_MATH,
  SYMBOL_ONE_DIVIDE_X,
  SYMBOL_SQUARE_ROOT_2,
  SYMBOL_SQUARE_ROOT_Y,
} from './Expressions'
import { memoryChanges, handleOperations, powerFunctions, setNumbers, clearValues } from './ActionMethods/'
import {
  result,
  historyExpression,
  currentExpression,
  canPutDot,
  lastAction,
  expressionString,
} from './GlobalVariables'

export default function handleClick(action, value) {
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
        currentExpression += SYMBOL_SQUARE_ROOT_Y + SYMBOL_SQUARE_ROOT_2
        historyExpression += currentExpression
      }

      lastAction = action
      break
    }

    case ACTIONS.POWER_Y: {
      if (!currentExpression) break
      else {
        expressionString += currentExpression
        currentExpression += SYMBOL_POWER_Y
        historyExpression += currentExpression
        expressionString += SYMBOL_POWER_MATH
      }

      lastAction = action
      break
    }

    case ACTIONS.SQUARE_ROOT_2:
    case ACTIONS.SQUARE_ROOT_3:
    case ACTIONS.POWER_2:
    case ACTIONS.POWER_3: {
      if (!currentExpression) break
      else powerFunctions(action, Number(currentExpression))

      lastAction = action
      break
    }

    case ACTIONS.LOGARITHM: {
      if (!currentExpression) currentExpression = SYMBOL_LOGARITHM
      else currentExpression += ' * ' + SYMBOL_LOGARITHM

      lastAction = action
      break
    }

    case ACTIONS.NATURAL_LOGARITHM: {
      if (!currentExpression) currentExpression = SYMBOL_NATURAL_LOGARITHM
      else currentExpression += ' * ' + SYMBOL_NATURAL_LOGARITHM

      lastAction = action
      break
    }

    case ACTIONS.E: {
      if (!currentExpression) currentExpression = SYMBOL_E
      else currentExpression += ' * ' + SYMBOL_E

      lastAction = action
      break
    }

    case ACTIONS.ONE_DIVIDE_X: {
      if (!currentExpression) currentExpression = SYMBOL_ONE_DIVIDE_X
      else currentExpression += ' * ' + SYMBOL_ONE_DIVIDE_X

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
      memoryChanges(action)
      break

    default:
      break
  }
}
