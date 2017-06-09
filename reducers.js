import _ from 'lodash'
import { combineReducers } from 'redux'
import AWS from 'aws-sdk/dist/aws-sdk-react-native';

todo = (state = {}, action) => {
  switch(action.type) {
    case 'TOGGLE_TODO':
      return (action.todoId == state.todoId) ? {...state, completed: !state.completed} : state
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
    case 'DISPLAY_TODOS':
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
// AWS = {
//  db: db object for todos
//  login_state: LOGIN_SUCCESS/LOGIN_REQUEST/LOGIN_ERROR/LOGIN_NONE
//  token: token string
//  
//
//
// }
aws = (state = {}, action) => {
  switch(action.type) {
    case 'LOGIN_SUCCESS': 
      // After logging in, set up our local databases
      // Save the current authentication token
      return {
        loginState: action.type,
        db: action.db
      }
    case 'LOGIN_ERROR': 
    case 'LOGIN_REQUEST':
    case 'LOGIN_NONE':
      return {loginState: action.type}
    default:  
      return state
  }
}

export const todoApp = combineReducers({
  todos,
  loading,
  aws
});
