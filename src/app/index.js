import '../style/style.css'

let result = 0,
  historyExpression = ' ',
  currentExpression = ' ',
  canPutDot = true,
  lastAction = '',
  symbol,
  expressionString = '',
  eNumber = 2.71828182846,
  memory = 0

const tables = document.querySelector('.tables'),
  historyExpressionElem = document.querySelector('.content__history'),
  currentExpressionElem = document.querySelector('.content__current')

tables.onclick = function (event) {
  let td = event.target.closest('td')

  if (!td) return

  if (!tables.contains(td)) return

  handleClick(td.dataset.action, td.innerText)

  currentExpressionElem.innerText = currentExpression || result
  historyExpressionElem.innerText = historyExpression
}

function handleOperation(action) {
  symbol = handleActionSymbols(action)

  if (lastAction === 'equal') {
    historyExpression = result + symbol
    expressionString = result.toString() + symbol
    console.log('expressionString', expressionString)

    currentExpression = ''
    lastAction = action
    canPutDot = true
    return
  }

  if (action == 'equal') symbol = ''
  expressionString += currentExpression + symbol

  historyExpression = expressionString
  if (action == 'equal') historyExpression += ' ='

  currentExpression = ''
  lastAction = action
  canPutDot = true
}

const handleClick = (action, value) => {
  switch (action) {
    case 'add':
      handleOperation(action)
      break
    case 'subtract':
      handleOperation(action)
      break
    case 'multiply':
      handleOperation(action)
      break
    case 'divide':
      handleOperation(action)
      break
    case 'equal':
      if (!currentExpression || lastAction === 'equal') {
        historyExpression = currentExpression
        break
      }
      handleOperation(action)
      result = eval(expressionString)
      console.log(result)
      break
    case 'dot':
      if (!canPutDot) break
      else currentExpression += !currentExpression ? '0' + value : value
      canPutDot = false
      break
    case '0':
      if (currentExpression[0] == '0' && currentExpression[1] != '.') break

      if (!currentExpression) setNumbers(value, action)
      else setNumbers(value, action)
      break
    case 'clear-expression':
      currentExpression = ''
      result = 0
      break
    case 'clear':
      clearValues()
      break
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      setNumbers(value, action)
      break
    default:
      break
  }
}

function setNumbers(value, action) {
  if (lastAction === 'equal') {
    clearValues()
    lastAction = action
  }
  if (currentExpression === '0') currentExpression = value
  else currentExpression += value
}

function clearValues() {
  result = 0
  historyExpression = ''
  currentExpression = ''
  canPutDot = true
  expressionString = ''
  lastAction = ''
  symbol = ''
}

function handleActionSymbols(action) {
  switch (action) {
    case 'add':
      return ' + '
    case 'subtract':
      return ' - '
    case 'multiply':
      return ' * '
    case 'divide':
      return ' / '
    case 'equal':
      return ' = '
    default:
      return
  }
}
