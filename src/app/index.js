import '../style/style.css'
let eNumber = 2.71828182846,
  memory = 0,
  firstMultiplier = 0,
  secondMultiplier = 0,
  historyExpression = ' ',
  currentExpression = ''

const tables = document.querySelector('.tables'),
  historyExpressionElem = document.querySelector('.content__history'),
  currentExpressionElem = document.querySelector('.content__current')
// const table1 = document.querySelector('.tables__first-table')
// const table2 = document.querySelector('.tables__second-table')

tables.onclick = function (event) {
  let td = event.target.closest('td')

  if (!td) return

  if (!tables.contains(td)) return

  // console.log(td.dataset.action)

  handleClickOfNumbers(td.dataset.action, td.innerText)

  // history += ` ${td.innerText}`

  /* console.log(target.dataset)
   console.log(td.innerText)*/

  // historyExpressionElem.value = history

  // if (currentExpression) currentExpressionElem.value = currentExpression
  // else currentExpressionElem.value = firstMultiplier
  currentExpressionElem.value = currentExpression || firstMultiplier
  // historyExpressionElem.value = historyExpression
}

const handleClickOfNumbers = (action, value) => {
  switch (action) {
    case '0':
      // if (firstMultiplier.startsWith('0')) return ''
      // else return '0'
      // return 0
      currentExpression += value
      break
    case '1':
      currentExpression += value
      break
    case '2':
      currentExpression += value
      break
    case '3':
      currentExpression += value
      break
    case '4':
      currentExpression += value
      break
    case '5':
      currentExpression += value
      break
    case '6':
      currentExpression += value
      break
    case '7':
      currentExpression += value
      break
    case '8':
      currentExpression += value
      break
    case '9':
      currentExpression += value
      break
    case 'dot':
      currentExpression += value
      break
    case 'clear':
      clearValues()
      break
    case 'equal':
      firstMultiplier += Number(currentExpression)
      console.log(firstMultiplier)
      currentExpression += ' ='
      historyExpression += currentExpression
      historyExpressionElem.value = historyExpression
      historyExpression = firstMultiplier
      currentExpression = ''
      break
    case 'add':
      firstMultiplier += Number(currentExpression)
      console.log(firstMultiplier)
      currentExpression += ' +'
      historyExpression += currentExpression
      historyExpressionElem.value = historyExpression
      // historyExpression = currentExpression + ''
      currentExpression = ' '
      break
    default:
      // currentExpression += ''
      break
  }
}

function clearValues() {
  firstMultiplier = 0
  secondMultiplier = 0
  historyExpression = ''
  currentExpression = ''
}

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
