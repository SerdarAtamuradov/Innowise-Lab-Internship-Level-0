import { EQUAL } from '../Actions'
import { currentExpression, lastAction } from '../GlobalVariables'
import clearValues from './ClearValues'

export default function setNumbers(value) {
  if (lastAction === EQUAL) clearValues()

  if (currentExpression === '0') currentExpression = value
  else currentExpression += value
}
