import _ from 'lodash';
import {AsyncStorage} from 'react-native'
import { combineReducers } from 'redux';
import AWS from 'aws-sdk/dist/aws-sdk-react-native';

todo = (state = {}, action) => {
  switch (action.type) {
    case 'TOGGLE_TODO':
      return action.todoId == state.todoId
        ? { ...state, completed: !state.completed }
        : state;
    default:
      return state;
  }
};

todos = (state = [], action) => {
  switch (action.type) {
    // case 'ADD_TODO':
    //   return [todo(undefined, action), ...state];
    // case 'DELETE_TODO':
    //   return state.splice(action.index, 1);
    // case 'TOGGLE_TODO':
    //   return _.map(state, td => todo(td, action));
    case 'DISPLAY_TODOS':
      return action.todos;
    case 'SYNC_TODOS': 
      return {refreshing: true}
    default:
      return state;
  }
};

// aws = {
//  db: db object for todos
//  login_state: LOGIN_SUCCESS/LOGIN_REQUEST/LOGIN_ERROR/LOGIN_NONE
//  token: token string
// }
aws = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      // After logging in, set up our local databases
      // Save the current authentication token
      return {
        ...state,
        username: action.username,
        loginState: action.type,
        db: action.db,
      };
    case 'LOGIN_ERROR':
    case 'LOGIN_REQUEST':
    case 'LOGIN_NONE':
      return { ...state, loginState: action.type, db: null };

    case 'SIGNUP_SUCCESS':
      return { ...state, signUpState: action.type, username: action.username };
    case 'SIGNUP_ERROR':
    case 'SIGNUP_REQUEST':
    case 'SIGNUP_NONE':
      return { ...state, signUpState: action.type };

    case 'CONFIRM_REGISTRATION_SUCCESS':
    case 'CONFIRM_REGISTRATION_ERROR':
    case 'CONFIRM_REGISTRATION_REQUEST':
    case 'CONFIRM_REGISTRATION_NONE':
      return { ...state, confirmRegistrationState: action.type };
    default:
      return state;
  }
};

export const todoApp = combineReducers({
  todos,
  aws,
});
