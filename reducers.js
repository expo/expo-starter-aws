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
        todo(undefined, action),
        ...state
      ]

    case 'DELETE_TODO':
      return state.splice(action.index, 1)
    case 'TOGGLE_TODO':
      return _.map(state, td => todo(td,action))
    case 'IMPORT_TODOS':
      return action.todos
    default:
      return state
  }
}

loading = (state = false, action) => {
  switch(action.type) {
    case 'GET_TODO_DATA':
      return true
    default:
      return false
  }
}



export const todoApp = combineReducers({
  todos,
  loading,
});
