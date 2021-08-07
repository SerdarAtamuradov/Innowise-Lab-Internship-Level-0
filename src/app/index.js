import '../style/style.css'
let eNumber = 2.71828182846,
  memory = 0,
  result = 0,
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

const handleClick = (action, value) => {
  switch (action) {
    case 'dot':
      if (!canPutDot) break
      else currentExpression += !currentExpression ? '0' + value : value
      canPutDot = false
      break
    case '0':
      if (currentExpression[0] == '0' && currentExpression[1] != '.') break
      // currentExpression += !currentExpression ? value : value
      if (!currentExpression) currentExpression = value
      else currentExpression += value
      break
    case '1':
      currentExpression += Number(value)
      break
    case '2':
      currentExpression += Number(value)
      break
    case '3':
      currentExpression += Number(value)
      break
    case '4':
      currentExpression += Number(value)
      break
    case '5':
      currentExpression += Number(value)
      break
    case '6':
      currentExpression += Number(value)
      break
    case '7':
      currentExpression += Number(value)
      break
    case '8':
      currentExpression += Number(value)
      break
    case '9':
      currentExpression += Number(value)
      break
    case 'clear':
      clearValues()
      break
    case 'equal':
      if (!currentExpression || lastAction === 'equal') break
      secondMultiplier = Number(currentExpression)
      console.log(secondMultiplier)
      currentExpression += ' ='
      historyExpression += currentExpression
      // result = firstMultiplier + secondMultiplier
      result = handle(lastAction, firstMultiplier, secondMultiplier)
      if (result === null) break
      firstMultiplier = result
      currentExpression = ''
      lastAction = action
      console.log(lastAction)
      break
    case 'add':
      // if(!currentExpression) break
      firstMultiplier += Number(currentExpression)
      result = firstMultiplier
      currentExpression += ' +'
      if (!historyExpression) historyExpression += currentExpression
      else historyExpression = result + ' + '
      currentExpression = ''
      lastAction = action
      console.log(lastAction)
      break
    default:
      break
  }
}

function clearValues() {
  firstMultiplier = 0
  secondMultiplier = 0
  result = 0
  historyExpression = ''
  currentExpression = ''
  canPutDot = true
}

function handle(action, firstVar, secondVar) {
  switch (action) {
    case 'add':
      return firstVar + secondVar
    case 'equal':
      return null
    default:
      return 0
  }
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
