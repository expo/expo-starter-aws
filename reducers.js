import _ from 'lodash'
import { combineReducers } from 'redux'

todo = (state = {}, action) => {
  switch(action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      }
    case 'TOGGLE_TODO':
      return (action.id == state.id) ? _.extend(state, {completed: !state.completed}) : state
    default:
      return state
  }
}

todos = (state = [], action) => {
  switch(action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ]
    case 'TOGGLE_TODO':
      return state.map(td => todo(td,action))
    case 'IMPORT_TODOS':
      return action.todos
    default:
      return state
  }
}


export const todoApp = combineReducers({
  todos,
});
