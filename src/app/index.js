import '../style/style.css'

let result = 0,
  nextNumber = 0,
  previousNumber = 0,
  historyExpression = ' ',
  currentExpression = '',
  canPutDot = true,
  lastAction = '',
  firstMultiplier
// eNumber = 2.71828182846,
// memory = 0

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

function handleActionSymbols(action) {
  switch (action) {
    case 'add':
      return ' + '
    case 'subtract':
      return ' - '
    case 'multiply':
      return ' × '
    case 'divide':
      return ' ÷ '
    case 'equal':
      return ' = '
    default:
      return
  }
}

function handleResult(action, firstVar, secondVar) {
  switch (action) {
    case 'add':
      return firstVar + secondVar
    case 'subtract':
      return secondVar - firstVar
    case 'multiply':
      return firstVar * secondVar
    case 'divide':
      return firstVar / secondVar
    case 'equal':
      return nextNumber
    default:
      return firstVar
  }
}

function handleCases(action) {
  // console.log('previousNumber', previousNumber)
  console.log('nextNumber', nextNumber)

  if (firstMultiplier) {
    console.log('firstMultiplier', firstMultiplier)
    console.log('previousNumber', previousNumber)
    result += handleResult(lastAction, firstMultiplier, previousNumber)
    console.log('result', result)
    firstMultiplier = undefined
  } else result = handleResult(lastAction, previousNumber, nextNumber)

  switch (action) {
    case 'equal':
      nextNumber = result
      previousNumber = result
      break
    case 'add':
    case 'subtract':
      nextNumber = result
      break
    case 'multiply':
    case 'divide':
      // result = handleResult(action, firstMultiplier, nextNumber)
      firstMultiplier = previousNumber
      // console.log('firstMultiplier', firstMultiplier)
      // if (firstMultiplier) {
      //   lastAction = action
      //   result = handleResult(action, firstMultiplier, previousNumber)
      // }
      console.log('befr', result)
      result = nextNumber < result ? nextNumber : 0
      console.log('afr', result)
      // result = nextNumber || 0
      break
  }

  let actionSymbol = handleActionSymbols(action)

  if (!historyExpression) historyExpression = currentExpression + actionSymbol
  else if (lastAction !== 'equal') historyExpression += previousNumber + actionSymbol
  else historyExpression = (result || nextNumber) + actionSymbol

  currentExpression = ''
  lastAction = action
  canPutDot = true
}

const handleClick = (action, value) => {
  switch (action) {
    case 'equal':
      if (!currentExpression || lastAction === 'equal') {
        historyExpression = currentExpression
        break
      }
      // console.log('previousNumber', previousNumber)
      // console.log('nextNumber', nextNumber)
      handleCases(action)
      // result = handleResult(lastAction, previousNumber, nextNumber)
      // if (result === null) break
      // nextNumber = result

      // historyExpression += currentExpression + ' = '
      // currentExpression = ''
      // lastAction = action
      // canPutDot = true
      if (result === null) break
      break
    case 'add':
      handleCases(action)
      break
    case 'subtract':
      handleCases(action)
      break
    case 'multiply':
      handleCases(action)
      break
    case 'divide':
      handleCases(action)
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
    case '1':
      setNumbers(value, action)
      break
    case '2':
      setNumbers(value, action)
      break
    case '3':
      setNumbers(value, action)
      break
    case '4':
      setNumbers(value, action)
      break
    case '5':
      setNumbers(value, action)
      break
    case '6':
      setNumbers(value, action)
      break
    case '7':
      setNumbers(value, action)
      break
    case '8':
      setNumbers(value, action)
      break
    case '9':
      setNumbers(value, action)
      break
    case 'clear':
      clearValues()
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

  currentExpression += value
  previousNumber = Number(currentExpression)
}

function clearValues() {
  nextNumber = 0
  previousNumber = 0
  result = 0
  historyExpression = ''
  currentExpression = ''
  canPutDot = true
  lastAction = ''
  firstMultiplier = 0
}

//sortByTypeOfOperations
//handleSingleOperators
//handleCoupleOperators
