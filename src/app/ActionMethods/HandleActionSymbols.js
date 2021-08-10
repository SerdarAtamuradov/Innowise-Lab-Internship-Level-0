import { ADD, SUBTRACT, MULTIPLY, DIVIDE, E, EQUAL, LOGARITHM, NATURAL_LOGARITHM } from '../Actions'
import {
  SYMBOL_ADD,
  SYMBOL_SUBTRACT,
  SYMBOL_MULTIPLY,
  SYMBOL_DIVIDE,
  SYMBOL_EQUAL,
  SYMBOL_E,
  SYMBOL_LOGARITHM,
  SYMBOL_NATURAL_LOGARITHM,
} from '../Expressions'

export default function handleActionSymbols(action) {
  switch (action) {
    case ADD:
      return SYMBOL_ADD
    case SUBTRACT:
      return SYMBOL_SUBTRACT
    case MULTIPLY:
      return SYMBOL_MULTIPLY
    case DIVIDE:
      return SYMBOL_DIVIDE
    case EQUAL:
      return SYMBOL_EQUAL
    case E:
      return SYMBOL_E
    case LOGARITHM:
      return SYMBOL_LOGARITHM
    case NATURAL_LOGARITHM:
      return SYMBOL_NATURAL_LOGARITHM
    default:
      return
  }
}
