import { DIVIDE, E, EQUAL, LOGARITHM, NATURAL_LOGARITHM, RECALL_MEMORY, POWER_Y, SQUARE_ROOT_Y } from '../Actions'
import mathFunctions from './MathFunctions'
import handleActionSymbols from './HandleActionSymbols'
import rootFunction from './RootFunctions'

import { SYMBOL_EQUAL, MESSAGE } from '../Expressions'
import {
  result,
  historyExpression,
  currentExpression,
  canPutDot,
  lastAction,
  symbol,
  expressionString,
} from '../GlobalVariables'

export default function handleOperations(action) {
  symbol = handleActionSymbols(action)
  switch (lastAction) {
    case E:
    case LOGARITHM:
    case NATURAL_LOGARITHM:
      mathFunctions(action, symbol)
      return
  }

  if (lastAction === EQUAL) {
    historyExpression = result + symbol
    expressionString = result.toString() + symbol

    currentExpression = ''
    lastAction = action
    canPutDot = true
    return
  } else if (lastAction === POWER_Y || lastAction === SQUARE_ROOT_Y) {
    rootFunction(action, symbol)
    return
  }

  if ((lastAction === DIVIDE || lastAction === RECALL_MEMORY) && currentExpression === '0') {
    historyExpression += currentExpression + SYMBOL_EQUAL
    currentExpression = MESSAGE
    expressionString = ''
    return
  }

  if (action === EQUAL) symbol = ''
  expressionString += currentExpression + symbol

  historyExpression = expressionString

  if (action === EQUAL) historyExpression += SYMBOL_EQUAL

  currentExpression = ''
  lastAction = action
  canPutDot = true
}
