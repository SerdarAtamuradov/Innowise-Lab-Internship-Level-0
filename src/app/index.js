import '../style/style.css'
let eNumber = 2.71828182846,
  memory = 0,
  result = 0,
  current = 0,
  firstMultiplier = 0,
  secondMultiplier = 0,
  historyExpression = ' ',
  currentExpression = '',
  canPutDot = true,
  lastAction = ''

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

function handleResult(action, firstVar, secondVar) {
  switch (action) {
    case 'add':
      return firstVar + secondVar
    case 'subtract':
      return secondVar - firstVar
    case 'equal':
      return secondMultiplier
    case 'clear':
      return
    default:
      return firstVar
  }
}

const handleClick = (action, value) => {
  switch (action) {
    case 'equal':
      if (!currentExpression || lastAction === 'equal') {
        historyExpression = currentExpression
        break
      }
      console.log('firstMultiplier', firstMultiplier)

      result = handleResult(lastAction, firstMultiplier, secondMultiplier)
      if (result === null) break
      secondMultiplier = result
      console.log('secondMultiplier', secondMultiplier)

      historyExpression += currentExpression + ' = '

      currentExpression = ''
      lastAction = action
      canPutDot = true

      break
    case 'add':
      console.log('firstMultiplier', firstMultiplier)

      result = handleResult(lastAction, firstMultiplier, secondMultiplier)

      secondMultiplier = result
      console.log('secondMultiplier', secondMultiplier)

      if (!historyExpression) historyExpression = currentExpression + ' + '
      else if (lastAction !== 'equal') historyExpression += firstMultiplier + ' + '
      else historyExpression = result + ' + '

      currentExpression = ''
      lastAction = action
      canPutDot = true
      break
    case 'subtract':
      console.log('firstMultiplier', firstMultiplier)
      result = handleResult(lastAction, firstMultiplier, secondMultiplier)

      secondMultiplier = result
      console.log('secondMultiplier', secondMultiplier)

      if (!historyExpression) historyExpression = currentExpression
      else if (lastAction !== 'equal') historyExpression += firstMultiplier + ' - '
      else historyExpression = result + ' - '

      currentExpression = ''
      lastAction = action
      canPutDot = true

      break
    case 'dot':
      if (!canPutDot) break
      else currentExpression += !currentExpression ? '0' + value : setNumbers(value, action)
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
  firstMultiplier = Number(currentExpression)
}

function clearValues() {
  firstMultiplier = 0
  secondMultiplier = 0
  result = 0
  historyExpression = ''
  currentExpression = ''
  canPutDot = true
  lastAction = ''
}

//sortByTypeOfOperations
//handleSingleOperators
//handleCoupleOperators

// table2.onclick = function (event) {
//   let td = event.target.closest('td')

//   if (!td) return

//   if (!table2.contains(td)) return

//   if (td.dataset.action == 'clear') {
//     currentExpressionElem.value = '0'
//     historyExpressionElem.value = '0'
//     return
//   }

//   console.log(td.innerText)
// }
