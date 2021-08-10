import { POWER_Y, EQUAL } from '../Actions'
import {
  SYMBOL_EQUAL,
  SYMBOL_POWER_Y,
  SYMBOL_POWER_MATH,
  SYMBOL_SQUARE_ROOT_2,
  SYMBOL_SQUARE_ROOT_Y,
} from '../Expressions'
import { currentExpression, lastAction, canPutDot, historyExpression, expressionString } from '../GlobalVariables'

export default function rootFunction(action, symbol) {
  let mathStr, startPos, mathNumber

  if (lastAction === POWER_Y) {
    startPos = currentExpression.lastIndexOf(SYMBOL_POWER_Y) + 1
    mathStr = currentExpression.slice(startPos)
    expressionString += mathStr
  } else {
    startPos = currentExpression.indexOf(SYMBOL_SQUARE_ROOT_Y)

    let endPos = currentExpression.lastIndexOf(SYMBOL_SQUARE_ROOT_2)
    mathNumber = currentExpression.slice(endPos + 1)
    expressionString += mathNumber + SYMBOL_POWER_MATH

    mathStr = currentExpression.slice(0, startPos)
    expressionString += `(1 / ${mathStr} )`
  }

  if (action === EQUAL) symbol = ''

  expressionString += symbol
  historyExpression += lastAction === POWER_Y ? mathStr : mathNumber

  if (action === EQUAL) historyExpression += SYMBOL_EQUAL

  currentExpression = ''
  lastAction = action
  canPutDot = true
}
