import '../style/style.css'
import handleClick from './HandleClick'
import { result, historyExpression, currentExpression } from './GlobalVariables'

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
