import handleActionSymbols from './HandleActionSymbols'
import { E, EQUAL, LOGARITHM, NATURAL_LOGARITHM } from '../Actions'
import { currentExpression, lastAction, canPutDot, historyExpression, expressionString } from '../GlobalVariables'
import { SYMBOL_EQUAL, SYMBOL_RIGHT_BRACKET } from '../Expressions'
export default function mathFunctions(action, symbol) {
  if (action === EQUAL) symbol = ''
  let mathNumber
  let startPos
  let endPos
  let cutString
  let mathStr = handleActionSymbols(lastAction)

  startPos = currentExpression.indexOf(mathStr) + mathStr.length
  if (startPos === -1) return

  endPos = currentExpression.indexOf(SYMBOL_RIGHT_BRACKET, startPos)
  if (endPos === -1) return
  cutString = currentExpression.slice(startPos, endPos)

  switch (lastAction) {
    case E:
      mathNumber = eval(`Math.exp(${cutString})`)
      break
    case LOGARITHM:
      mathNumber = eval(`Math.log10(${cutString})`)
      break
    case NATURAL_LOGARITHM:
      mathNumber = eval(`Math.log(${cutString})`)
      break
    default:
      break
  }

  expressionString += mathNumber + symbol
  historyExpression += mathStr + cutString + SYMBOL_RIGHT_BRACKET + symbol
  if (action === EQUAL) historyExpression += SYMBOL_EQUAL

  currentExpression = ''
  lastAction = action
  canPutDot = true
}
