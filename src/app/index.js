import '../style/style.css'

let result = 0,
  historyExpression = ' ',
  currentExpression = '',
  canPutDot = true,
  lastAction = '',
  symbol,
  expressionString = '',
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
    case 'equal': {
      if (!currentExpression || lastAction === 'equal') {
        historyExpression = currentExpression
        break
      }
      handleOperation(action)
      result = eval(expressionString)
      break
    }

    case 'square-root-y': {
      if (!currentExpression) break
      else {
        currentExpression += 'ʸ√'
        historyExpression += currentExpression
      }

      lastAction = action
      break
    }
    case 'power-y': {
      if (!currentExpression) break
      else {
        expressionString += currentExpression
        currentExpression += '^'
        historyExpression += currentExpression
        expressionString += ' ** '
      }

      lastAction = action
      break
    }

    case 'square-root-2':
    case 'square-root-3':
    case 'power-2':
    case 'power-3': {
      if (!currentExpression) break
      else handlePowerFunctions(action, Number(currentExpression))

      lastAction = action
      break
    }

    case 'logarithm': {
      if (!currentExpression) currentExpression = 'log('
      else currentExpression += ' * log( '

      lastAction = action
      break
    }

    case 'natural-logarithm': {
      if (!currentExpression) currentExpression = 'ln('
      else currentExpression += ' * ln( '

      lastAction = action
      break
    }

    case 'e': {
      if (!currentExpression) currentExpression = 'e^('
      else currentExpression += ' * e^( '

      lastAction = action
      break
    }

    case 'one-div-x': {
      if (!currentExpression) currentExpression = '1 / '
      else currentExpression += ' * (1 / '

      lastAction = action
      break
    }

    case 'clear-expression':
      currentExpression = ''
      result = 0
      break

    case 'clear':
      clearValues()
      break

    case 'plus-minus': {
      if (currentExpression[0] === '-') {
        if (currentExpression.length == 1) currentExpression = ''
        else currentExpression = currentExpression.slice(1)
        break
      }

      lastAction = currentExpression
      currentExpression = '-' + lastAction.trim()
      lastAction = action
      break
    }

    case 'dot': {
      if (!canPutDot) break
      else currentExpression += !currentExpression ? '0' + value : value
      canPutDot = false
      break
    }

    case '0': {
      if (currentExpression[0] == '0' && currentExpression[1] != '.') break

      if (!currentExpression) setNumbers(value)
      else setNumbers(value)
      break
    }

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
      setNumbers(value)
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

function handleOperation(action) {
  symbol = handleActionSymbols(action)

  switch (lastAction) {
    case 'e':
    case 'logarithm':
    case 'natural-logarithm':
      mathFunctions(action, symbol)
      return
  }

  if (lastAction === 'equal') {
    historyExpression = result + symbol
    expressionString = result.toString() + symbol

    currentExpression = ''
    lastAction = action
    canPutDot = true
    return
  } else if (lastAction === 'power-y' || lastAction === 'square-root-y') {
    rootFunction(action, symbol)
    return
  }

  if ((lastAction == 'divide' || lastAction == 'recall-memory') && currentExpression == '0') {
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

function setNumbers(value) {
  if (lastAction === 'equal') clearValues()

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
  memory = 0
  memoryChanged = false
}

function mathFunctions(action, symbol) {
  if (action == 'equal') symbol = ''
  let mathNumber,
    startPos,
    endPos,
    cutString,
    mathStr = handleActionSymbols(lastAction)

  startPos = currentExpression.indexOf(mathStr) + mathStr.length
  if (startPos == -1) return

  endPos = currentExpression.indexOf(')', startPos)
  if (endPos == -1) return
  cutString = currentExpression.slice(startPos, endPos)

  switch (lastAction) {
    case 'e':
      mathNumber = eval(`Math.exp(${cutString})`)
      break
    case 'logarithm':
      mathNumber = eval(`Math.log10(${cutString})`)
      break
    case 'natural-logarithm':
      mathNumber = eval(`Math.log(${cutString})`)
      break
    default:
      break
  }

  expressionString += mathNumber + symbol
  historyExpression += mathStr + cutString + ')' + symbol
  if (action == 'equal') historyExpression += ' ='

  currentExpression = ''
  lastAction = action
  canPutDot = true
}

function rootFunction(action, symbol) {
  let mathStr, startPos, mathNumber

  if (lastAction === 'power-y') {
    startPos = currentExpression.lastIndexOf('^') + 1
    mathStr = currentExpression.slice(startPos)
    expressionString += mathStr
  } else {
    startPos = currentExpression.indexOf('ʸ')

    let endPos = currentExpression.lastIndexOf('√')
    mathNumber = currentExpression.slice(endPos + 1)
    expressionString += mathNumber + ' ** '

    mathStr = currentExpression.slice(0, startPos)
    expressionString += `(1 / ${mathStr} )`
  }

  if (action == 'equal') symbol = ''

  expressionString += symbol
  historyExpression += lastAction === 'power-y' ? mathStr : mathNumber

  if (action == 'equal') historyExpression += ' ='

  currentExpression = ''
  lastAction = action
  canPutDot = true
}

function handlePowerFunctions(action, value = 0) {
  let mathNumber
  switch (action) {
    case 'power-2':
      mathNumber = value ** 2
      historyExpression += `${value}²` + ' ='
      break
    case 'power-3':
      mathNumber = value ** 3
      historyExpression += `${value}³` + ' ='
      break
    case 'square-root-2':
      mathNumber = value ** (1 / 2)
      historyExpression += `√${value}` + ' ='
      break
    case 'square-root-3':
      mathNumber = value ** (1 / 3)
      historyExpression += `∛${value}` + ' ='
      break
  }

  expressionString += mathNumber.toString()
  result = eval(expressionString)

  currentExpression = ''
  lastAction = action
  canPutDot = true
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
    case 'e':
      return 'e^('
    case 'logarithm':
      return 'log('
    case 'natural-logarithm':
      return 'ln('
    default:
      return
  }
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
