import {
  result,
  historyExpression,
  currentExpression,
  canPutDot,
  lastAction,
  symbol,
  expressionString,
  memory,
  memoryChanged,
} from '../GlobalVariables'

export default function clearValues() {
  result = 0
  historyExpression = ''
  currentExpression = ''
  canPutDot = true
  expressionString = ''
  lastAction = ''
  symbol = ''
  memory = 0
  memoryChanged = false
}
