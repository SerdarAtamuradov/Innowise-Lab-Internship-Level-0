import '../style/style.css';
import * as ACTIONS from './Actions';
import {
  SYMBOL_POWER_Y,
  SYMBOL_POWER_MATH,
  SYMBOL_ONE_DIVIDE_X,
  SYMBOL_SQUARE_ROOT_2,
  SYMBOL_SQUARE_ROOT_3,
  SYMBOL_SQUARE_ROOT_Y,
  SYMBOL_LOGARITHM,
  SYMBOL_NATURAL_LOGARITHM,
  SYMBOL_E,
  SYMBOL_EQUAL,
  MESSAGE,
} from './Expressions';

let result = 0;
let historyExpression = '';
let currentExpression = '';
let canPutDot = true;
let lastAction = '';
let symbol = '';
let expressionString = '';
let memory = 0;
let memoryChanged = false;

const tables = document.querySelector('.tables');
const historyExpressionElem = document.querySelector('.content__history');
const currentExpressionElem = document.querySelector('.content__current');

tables.onclick = function (event) {
  let td = event.target.closest('td');

  if (!td) return;

  if (!tables.contains(td)) return;

  handleClick(td.dataset.action, td.innerText);

  currentExpressionElem.innerText = currentExpression || result;
  historyExpressionElem.innerText = historyExpression;
};

const handleClick = (action, value) => {
  switch (action) {
    case ACTIONS.ADD:
    case ACTIONS.SUBTRACT:
    case ACTIONS.MULTIPLY:
    case ACTIONS.DIVIDE:
      handleOperation(action);
      break;
    case ACTIONS.EQUAL: {
      if (!currentExpression || lastAction === ACTIONS.EQUAL) {
        historyExpression = currentExpression;
        break;
      }
      handleOperation(action);
      result = eval(expressionString);
      break;
    }

    case ACTIONS.SQUARE_ROOT_Y: {
      if (!currentExpression) break;
      else {
        currentExpression += SYMBOL_SQUARE_ROOT_Y + SYMBOL_SQUARE_ROOT_2;
        historyExpression += currentExpression;
      }

      lastAction = action;
      break;
    }
    case ACTIONS.POWER_Y: {
      if (!currentExpression) break;
      else {
        expressionString += currentExpression;
        currentExpression += SYMBOL_POWER_Y;
        historyExpression += currentExpression;
        expressionString += SYMBOL_POWER_MATH;
      }

      lastAction = action;
      break;
    }

    case ACTIONS.POWER_2:
    case ACTIONS.POWER_3:
    case ACTIONS.SQUARE_ROOT_2:
    case ACTIONS.SQUARE_ROOT_3: {
      if (!currentExpression) break;
      else handlePowerFunctions(action, Number(currentExpression));

      lastAction = action;
      break;
    }

    case ACTIONS.LOGARITHM: {
      if (!currentExpression) currentExpression = SYMBOL_LOGARITHM;
      else currentExpression += ' * ' + SYMBOL_LOGARITHM;

      lastAction = action;
      break;
    }

    case ACTIONS.NATURAL_LOGARITHM: {
      if (!currentExpression) currentExpression = SYMBOL_NATURAL_LOGARITHM;
      else currentExpression += ' * ' + SYMBOL_NATURAL_LOGARITHM;

      lastAction = action;
      break;
    }

    case ACTIONS.E: {
      if (!currentExpression) currentExpression = SYMBOL_E;
      else currentExpression += ' * ' + SYMBOL_E;

      lastAction = action;
      break;
    }

    case ACTIONS.ONE_DIVIDE_X: {
      if (!currentExpression) currentExpression = SYMBOL_ONE_DIVIDE_X;
      else currentExpression += ' * (' + SYMBOL_ONE_DIVIDE_X;

      lastAction = action;
      break;
    }

    case ACTIONS.CLEAR_EXPRESSION:
      currentExpression = '';
      result = 0;
      break;

    case ACTIONS.CLEAR:
      clearValues();
      break;

    case ACTIONS.PLUS_MINUS: {
      if (currentExpression[0] === '-') {
        if (currentExpression.length === 1) currentExpression = '';
        else currentExpression = currentExpression.slice(1);
        break;
      }

      lastAction = currentExpression;
      currentExpression = '-' + lastAction.trim();
      lastAction = action;
      break;
    }

    case ACTIONS.DOT: {
      if (!canPutDot) break;
      else currentExpression += !currentExpression ? '0' + value : value;
      canPutDot = false;
      break;
    }

    case '0': {
      if (currentExpression[0] === '0' && currentExpression[1] !== '.') break;

      if (!currentExpression) setNumbers(value);
      else setNumbers(value);
      break;
    }

    case ACTIONS.LEFT_BRACKET:
    case ACTIONS.RIGHT_BRACKET:
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      setNumbers(value);
      break;

    case ACTIONS.ADD_MEMORY:
    case ACTIONS.SUB_MEMORY:
    case ACTIONS.RECALL_MEMORY:
    case ACTIONS.RESET_MEMORY:
      handleMemoryChange(action);
      break;

    default:
      break;
  }
};

function handleOperation(action) {
  symbol = handleActionSymbols(action);

  switch (lastAction) {
    case ACTIONS.E:
    case ACTIONS.LOGARITHM:
    case ACTIONS.NATURAL_LOGARITHM:
      mathFunctions(action, symbol);
      return;
  }

  if (lastAction === ACTIONS.EQUAL) {
    historyExpression = result + symbol;
    expressionString = result.toString() + symbol;

    currentExpression = '';
    lastAction = action;
    canPutDot = true;
    return;
  } else if (lastAction === ACTIONS.POWER_Y || lastAction === ACTIONS.SQUARE_ROOT_Y) {
    rootFunction(action, symbol);
    return;
  }

  if ((lastAction === ACTIONS.DIVIDE || lastAction === ACTIONS.RECALL_MEMORY) && currentExpression === '0') {
    historyExpression += currentExpression + SYMBOL_EQUAL;
    currentExpression = MESSAGE;
    expressionString = '';
    return;
  }

  if (action === ACTIONS.EQUAL) symbol = '';
  expressionString += currentExpression + symbol;

  historyExpression = expressionString;

  if (action === ACTIONS.EQUAL) historyExpression += SYMBOL_EQUAL;

  currentExpression = '';
  lastAction = action;
  canPutDot = true;
}

function setNumbers(value) {
  if (lastAction === ACTIONS.EQUAL) clearValues();

  if (currentExpression === '0') currentExpression = value;
  else currentExpression += value;
}

function clearValues() {
  result = 0;
  historyExpression = '';
  currentExpression = '';
  canPutDot = true;
  expressionString = '';
  lastAction = '';
  symbol = '';
  memory = 0;
  memoryChanged = false;
}

function mathFunctions(action, symbol) {
  if (action === ACTIONS.EQUAL) symbol = '';
  let mathNumber;
  let startPos;
  let endPos;
  let cutString;
  let mathStr = handleActionSymbols(lastAction);

  startPos = currentExpression.indexOf(mathStr) + mathStr.length;
  if (startPos === -1) return;

  endPos = currentExpression.indexOf(')', startPos);
  if (endPos === -1) return;
  cutString = currentExpression.slice(startPos, endPos);

  switch (lastAction) {
    case ACTIONS.E:
      mathNumber = eval(`Math.exp(${cutString})`);
      break;
    case ACTIONS.LOGARITHM:
      mathNumber = eval(`Math.log10(${cutString})`);
      break;
    case ACTIONS.NATURAL_LOGARITHM:
      mathNumber = eval(`Math.log(${cutString})`);
      break;
    default:
      break;
  }

  expressionString += mathNumber + symbol;
  historyExpression += mathStr + cutString + ')' + symbol;
  if (action === ACTIONS.EQUAL) historyExpression += SYMBOL_EQUAL;

  currentExpression = '';
  lastAction = action;
  canPutDot = true;
}

function rootFunction(action, symbol) {
  let mathStr;
  let startPos;
  let mathNumber;

  if (lastAction === ACTIONS.POWER_Y) {
    startPos = currentExpression.lastIndexOf(SYMBOL_POWER_Y) + 1;
    mathStr = currentExpression.slice(startPos);
    expressionString += mathStr;
  } else {
    startPos = currentExpression.indexOf(SYMBOL_SQUARE_ROOT_Y);

    let endPos = currentExpression.lastIndexOf(SYMBOL_SQUARE_ROOT_2);
    mathNumber = currentExpression.slice(endPos + 1);
    expressionString += mathNumber + SYMBOL_POWER_MATH;

    mathStr = currentExpression.slice(0, startPos);
    expressionString += `(1 / ${mathStr} )`;
  }

  if (action === ACTIONS.EQUAL) symbol = '';

  expressionString += symbol;
  historyExpression += lastAction === ACTIONS.POWER_Y ? mathStr : mathNumber;

  if (action === ACTIONS.EQUAL) historyExpression += SYMBOL_EQUAL;

  currentExpression = '';
  lastAction = action;
  canPutDot = true;
}

function handlePowerFunctions(action, value = 0) {
  let mathNumber;
  switch (action) {
    case ACTIONS.POWER_2:
      mathNumber = value ** 2;
      historyExpression += `${value}²` + SYMBOL_EQUAL;
      break;
    case ACTIONS.POWER_3:
      mathNumber = value ** 3;
      historyExpression += `${value}³` + SYMBOL_EQUAL;
      break;
    case ACTIONS.SQUARE_ROOT_2:
      mathNumber = value ** (1 / 2);
      historyExpression += SYMBOL_SQUARE_ROOT_2 + value + SYMBOL_EQUAL;
      break;
    case ACTIONS.SQUARE_ROOT_3:
      mathNumber = value ** (1 / 3);
      historyExpression += SYMBOL_SQUARE_ROOT_3 + value + SYMBOL_EQUAL;
      break;
  }

  expressionString += mathNumber.toString();
  result = eval(expressionString);

  currentExpression = '';
  lastAction = action;
  canPutDot = true;
}

function handleActionSymbols(action) {
  switch (action) {
    case ACTIONS.ADD:
      return ' + ';
    case ACTIONS.SUBTRACT:
      return ' - ';
    case ACTIONS.MULTIPLY:
      return ' * ';
    case ACTIONS.DIVIDE:
      return ' / ';
    case ACTIONS.EQUAL:
      return SYMBOL_EQUAL;
    case ACTIONS.E:
      return SYMBOL_E;
    case ACTIONS.LOGARITHM:
      return SYMBOL_LOGARITHM;
    case ACTIONS.NATURAL_LOGARITHM:
      return SYMBOL_NATURAL_LOGARITHM;
    default:
      return;
  }
}

function handleMemoryChange(action) {
  switch (action) {
    case ACTIONS.ADD_MEMORY:
      memory += Number(currentExpression);
      memoryChanged = true;
      break;
    case ACTIONS.SUB_MEMORY:
      memory -= Number(currentExpression);
      memoryChanged = true;
      break;
    case ACTIONS.RECALL_MEMORY:
      if (memoryChanged) currentExpression = memory.toString();
      memoryChanged = false;
      break;
    case ACTIONS.RESET_MEMORY:
      memoryChanged = false;
      memory = 0;
      currentExpression = '';
      break;
    default:
      break;
  }
}
