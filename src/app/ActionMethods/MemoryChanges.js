import { ADD_MEMORY, SUB_MEMORY, RECALL_MEMORY, RESET_MEMORY } from '../Actions'
import { currentExpression, memory, memoryChanged } from '../GlobalVariables'

export default function memoryChanges(action) {
  switch (action) {
    case ADD_MEMORY:
      memory += Number(currentExpression)
      memoryChanged = true
      break
    case SUB_MEMORY:
      memory -= Number(currentExpression)
      memoryChanged = true
      break
    case RECALL_MEMORY:
      if (memoryChanged) currentExpression = memory.toString()
      memoryChanged = false
      break
    case RESET_MEMORY:
      memoryChanged = false
      memory = 0
      currentExpression = ''
      break
    default:
      break
  }
}
