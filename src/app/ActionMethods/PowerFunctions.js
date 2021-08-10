import { POWER_2, POWER_3, SQUARE_ROOT_2, SQUARE_ROOT_3 } from '../Actions'
import {
  SYMBOL_EQUAL,
  SYMBOL_POWER_2,
  SYMBOL_POWER_3,
  SYMBOL_SQUARE_ROOT_2,
  SYMBOL_SQUARE_ROOT_3,
} from '../Expressions'
import {
  currentExpression,
  lastAction,
  canPutDot,
  historyExpression,
  expressionString,
  result,
} from '../GlobalVariables'

export default function PowerFunctions(action, value = 0) {
  let mathNumber
  switch (action) {
    case POWER_2:
      mathNumber = value ** 2
      historyExpression += value + SYMBOL_POWER_2 + SYMBOL_EQUAL
      break
    case POWER_3:
      mathNumber = value ** 3
      historyExpression += value + SYMBOL_POWER_3 + SYMBOL_EQUAL
      break
    case SQUARE_ROOT_2:
      mathNumber = value ** (1 / 2)
      historyExpression += value + SYMBOL_SQUARE_ROOT_2 + SYMBOL_EQUAL
      break
    case SQUARE_ROOT_3:
      mathNumber = value ** (1 / 3)
      historyExpression += value + SYMBOL_SQUARE_ROOT_3 + SYMBOL_EQUAL
      break
  }

  expressionString += mathNumber.toString()
  result = eval(expressionString)

  currentExpression = ''
  lastAction = action
  canPutDot = true
}
