import Cognito from './AWSHelper'
import {dispatch} from 'redux'

let nextTodoId = 0

export const importTodos = (todos) => {
  nextTodoId = todos.length + 1
  return {
    type: 'IMPORT_TODOS',
    todos
  }

}
export const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
  }
}

export const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  }
}

export const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id
  }
}

export const deleteTodo = (index) => {
  return {
    type: 'DELETE_TODO',
    index
  }
}

export const login = (username, password) => async (dispatch) => {
  try {
    console.log(`Logging in: ${username} :: ${password}`)

    dispatch({ type: 'LOGIN_REQUEST' });
    c = new Cognito()
    let data = await c.login(username, password);
    console.log('Login Success!')
    dispatch({ type: 'LOGIN_SUCCESS', data});
  } catch(error) {
    console.log(error)
    alert(error);

    dispatch({ type: 'LOGIN_ERROR', error})
  }
}

export const loginRequest = (username, password) => {
  return {
    type: 'LOGIN_REQUEST', 
  }
}

export const loginSuccess = (data) => {
  return {
    type: 'LOGIN_SUCCESS', 
    data
  }
}

export const loginError = (err) => {
  return {
    type: 'LOGIN_ERROR', 
    err
  }
}

export const signup_request = (username, password, email) => {
  return {
    type: 'SIGNUP_REQUEST',
    username,
    password,
    email
  }
}

    
