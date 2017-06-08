import Cognito from './AWSHelper'
import {dispatch} from 'redux'
import AWS, {Config, CognitoIdentityServiceProvider} from 'aws-sdk/dist/aws-sdk-react-native';

let nextTodoId = 0
TableName = 'expo-mobile-hub-todos'

const generateId = () => {
  var len = 16;
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charLength = chars.length;
  var result = "";
  let randoms = window.crypto.getRandomValues(new Uint32Array(len));
  for(var i = 0; i < len; i++) {
    result += chars[randoms[i] % charLength];
  }
  return result.toLowerCase();
}

// Import test todos from existing data
export const importTodos = (todos) => {
  nextTodoId = todos.length + 1
  return {
    type: 'IMPORT_TODOS',
    todos
  }
}

// Sync todos from database
// TODO: Check if it is best practices to have source of truth to be in remote db
export const syncTodos = (db) => async (dispatch) => {
  try {
    console.log('Syncing Todos')
    console.log(AWS.config.credentials)
    const userId = AWS.config.credentials.identityId
    console.log(userId)
    const todos = await db.query({
      TableName,
      IndexName: 'DateSorted',
      KeyConditionExpression: "#userId = :userId",
      ExpressionAttributeNames: {
        '#userId': 'userId',
      },
      ExpressionAttributeValues: {
        //':userId': self.user.getUser().getUsername(),
        ':userId': AWS.config.credentials.identityId
      },
      'ScanIndexForward': false
    }).promise()

    console.log(todos)
    console.log('Updated todos')
    dispatch(importTodos(todos))

  } catch (err) {
    console.log(err)
    alert(err)
    dispatch({type: 'SYNC_FAIL'})
  }
}
export const addTodo = (db, text) => async (dispatch) => {
  try {
    const userId = AWS.config.credentials.identityId
    await db.getDocumentClient().put({
      TableName,
      Item: {
        userId,
        text,
        todoId: generateId(),
        creationDate: (new Date().getTime()),
        completed: false
      },
      ConditionExpression: 'attribute_not_exists(id)'
    }).promise()

    dispatch(syncTodos(db))
  } catch (err) {
    console.log("Add Todo Error")
    console.log(adderr)
    alert(err)
  }
}

export const deleteTodo = (db, todoId) => async (dispatch) => {
  try {
    const userId = AWS.config.credentials.identityId
    await db.getDocumentClient().delete({
      TableName,
      Item: {
        userId,
        todoId,
      }
    }).promise()

    dispatch(syncTodos(db))
  } catch (err) {
    console.log("Add Todo Error")
    console.log(adderr)
    alert(err)
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


export const login = (username, password) => async (dispatch) => {
  try {
    console.log(`Logging in: ${username} :: ${password}`)
    dispatch({ type: 'LOGIN_REQUEST' });
    c = new Cognito()
    const token = await c.login(username, password);

    // Setting up AWS credentials for current user
    const loginKey = 'cognito-idp.' + 
      AWS.config[ 'aws_cognito_region' ] + 
      '.amazonaws.com/' + 
      AWS.config[ 'aws_user_pools_id' ];
    console.log(`Setting token: ${loginKey} : ${token}`)

    console.log('Login Success!')
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      'IdentityPoolId': AWS.config['aws_cognito_identity_pool_id'],
      'Logins': {
        [loginKey]: token
      }
    })
    await AWS.config.credentials.refreshPromise()
    const db = new AWS.DynamoDB.DocumentClient()
    dispatch({ type: 'LOGIN_SUCCESS', db})
    dispatch(syncTodos(db))
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


