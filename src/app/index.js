import '../style/style.css'

let result = 0,
  historyExpression = ' ',
  currentExpression = '',
  canPutDot = true,
  lastAction = '',
  symbol,
  expressionString = '',
  eNumber = 2.71828182846,
  memory = 0,
  memoryChanged = false

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

  if ((lastAction == 'divide' || lastAction == 'recall-memory') && currentExpression == '0') {
    console.log(memory)
    console.log(currentExpression)
    historyExpression += currentExpression + ' ='
    currentExpression = 'На ноль делить нельзя'
    expressionString = ''
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
    case 'clear-expression':
      currentExpression = ''
      result = 0
      break
    case 'clear':
      clearValues()
      break
    case 'plus-minus':
      if (currentExpression[0] === '-') {
        if (currentExpression.length == 1) currentExpression = ''
        else currentExpression = currentExpression.slice(1)
        break
      }
      // else if (currentExpression[0] === '-' && currentExpression.length >= 2) {
      //   currentExpression = currentExpression.slice(1)
      //   break
      // }

      lastAction = currentExpression
      currentExpression = '-' + lastAction.trim()
      lastAction = action
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
    case 'left-bracket':
    case 'right-bracket':
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
    case 'add-memory':
    case 'sub-memory':
    case 'recall-memory':
    case 'reset-memory':
      handleMemoryChange(action)
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

function handleMemoryChange(action) {
  switch (action) {
    case 'add-memory':
      memory += Number(currentExpression)
      memoryChanged = true
      break
    case 'sub-memory':
      memory -= Number(currentExpression)
      memoryChanged = true
      break
    case 'recall-memory':
      if (memoryChanged) currentExpression = memory.toString()
      memoryChanged = false
      break
    case 'reset-memory':
      memoryChanged = false
      memory = 0
      currentExpression = ''
      break
    default:
      break
  }
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
