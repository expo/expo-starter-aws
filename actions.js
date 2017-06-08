import Cognito from './AWSHelper'
import {dispatch} from 'redux'
import AWS, {Config, CognitoIdentityServiceProvider} from 'aws-sdk/dist/aws-sdk-react-native';

let nextTodoId = 0
TableName = 'expo-mobile-hub-todos'

let db = null

const generateId = () => {
  var len = 16;
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charLength = chars.length;
  var result = "";
  let randoms = window.crypto.getRandomValues(new Uint32Array(len));
  for(var i = 0; i < len; i++) {
    result += chars[randoms[i] % charLength];
  }
  console.log(result)
  return result.toLowerCase();
}

// Refresh todos
export const displayTodos = (todos) => {
  return {
    type: 'DISPLAY_TODOS',
    todos
  }
}

// Sync todos from database
// TODO: Check if it is best practices to have source of truth to be in remote db
export const syncTodos = () => async (dispatch) => {
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
    console.log('Synced todos')
    dispatch(displayTodos(todos['Items']))

  } catch (err) {
    console.log(err)
    alert(err)
    dispatch({type: 'SYNC_FAIL'})
    dispatch(syncTodos())
  }
}
export const addTodo = (text) => async (dispatch) => {
  try {
    const userId = AWS.config.credentials.identityId
    const todo = {
      userId,
      text,
      todoId: (generateId()),
      completed: false,
      creationDate: (new Date().getTime()),
    }
    console.log(todo)
    await db.put({
      TableName,
      Item: todo,
      ConditionExpression: 'attribute_not_exists(id)'
    }).promise()

    dispatch(syncTodos())
  } catch (err) {
    console.log("Add Todo Error")
    console.log(err)
    alert(err)
  }
}

export const deleteTodo = (todo) => async (dispatch) => {
  try {
    const userId = AWS.config.credentials.identityId
    await db.delete({
      TableName,
      Key: {
        userId,
        todoId: todo.todoId,
        creationData: todo.creationDate
      }
    }).promise()
    dispatch(syncTodos())
  } catch (err) {
    console.log("Add Todo Error")
    console.log(err)
    alert(err)
  }
}


export const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  }
}

export const toggleTodo = (todo) => async (dispatch) => {
  try {
    console.log(todo)
    const userId = AWS.config.credentials.identityId
    await db.update({
      TableName,
      Key: {
        userId,
        creationDate: todo.creationDate
      },
      UpdateExpression: "SET #completed = :completed",
      ExpressionAttributeNames: {
        "#completed": "completed"
      },
      ExpressionAttributeValues: {
        ":completed": !todo.completed
      },
      ReturnValues: "UPDATED_NEW"
    }).promise()
    dispatch(syncTodos())
  } catch (err) {
    alert(err)
    console.log(err)
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

    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      'IdentityPoolId': AWS.config['aws_cognito_identity_pool_id'],
      'Logins': {
        [loginKey]: token
      }
    })

    // Retrieving identity crednetials given a login token
    await AWS.config.credentials.refreshPromise()

    // Now we can access the db api based on these identity credentials that are automatically pulled from AWS.config
    db = new AWS.DynamoDB.DocumentClient()

    // Save the new database and sync todos for current user
    dispatch({ type: 'LOGIN_SUCCESS', db})
    dispatch(syncTodos())
  } catch(error) {
    console.log(error)
    alert(error);
    dispatch({ type: 'LOGIN_ERROR', error})
  }
}

export const logout = () => (dispatch) => {
  const user = new Cognito().getCurrentUser()
  user.signout()
  dispatch({ type: 'LOGIN_NONE' })
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


