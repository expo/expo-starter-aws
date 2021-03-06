import { AsyncStorage } from 'react-native';
import Cognito from './cognito-helper';
import { dispatch } from 'redux';
import AWS from 'aws-sdk/dist/aws-sdk-react-native';
import uuid from 'react-native-uuid';

// Dynamo db database instnace
let db = null;

// Dynamo db table name
const TableName = 'expo-mobile-hub-todos';

// Actually display the todos
export const displayTodos = todos => {
  return {
    type: 'DISPLAY_TODOS',
    todos,
  };
};

// Sync todos from database
export const syncTodos = () => async dispatch => {
  try {
    console.log('Syncing Todos');
    console.log(AWS.config.credentials);
    const userId = AWS.config.credentials.identityId;
    console.log(userId);
    const todos = await db
      .query({
        TableName,
        IndexName: 'DateSorted',
        KeyConditionExpression: '#userId = :userId',
        ExpressionAttributeNames: {
          '#userId': 'userId',
        },
        ExpressionAttributeValues: {
          ':userId': AWS.config.credentials.identityId,
        },
        ScanIndexForward: false,
      })
      .promise();

    console.log('Synced todos');
    dispatch(displayTodos(todos['Items']));
  } catch (err) {
    console.log(err);
    alert(err);
    dispatch({ type: 'SYNC_FAIL' });
  }
};

export const addTodo = (text, category) => async dispatch => {
  try {
    const userId = AWS.config.credentials.identityId;
    const todo = {
      userId,
      text,
      category,
      todoId: uuid.v1(),
      completed: false,
      creationDate: new Date().getTime(),
    };
    console.log(todo);
    await db
      .put({
        TableName,
        Item: todo,
        ConditionExpression: 'attribute_not_exists(id)',
      })
      .promise();

    dispatch(syncTodos());
  } catch (err) {
    console.log('Add Todo Error');
    console.log(err);
    alert(err);
  }
};

export const deleteTodo = todo => async dispatch => {
  try {
    const userId = AWS.config.credentials.identityId;
    await db
      .delete({
        TableName,
        Key: {
          userId,
          todoId: todo.todoId,
          creationData: todo.creationDate,
        },
      })
      .promise();
    dispatch(syncTodos());
  } catch (err) {
    console.log('Add Todo Error');
    console.log(err);
    alert(err);
  }
};

export const setVisibilityFilter = filter => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter,
  };
};

export const toggleTodo = todo => async dispatch => {
  try {
    console.log(todo);
    const userId = AWS.config.credentials.identityId;
    await db
      .update({
        TableName,
        Key: {
          userId,
          creationDate: todo.creationDate,
        },
        UpdateExpression: 'SET #completed = :completed',
        ExpressionAttributeNames: {
          '#completed': 'completed',
        },
        ExpressionAttributeValues: {
          ':completed': !todo.completed,
        },
        ReturnValues: 'UPDATED_NEW',
      })
      .promise();

    // Option to sync todos after each toggle. You can also sync only after each refresh
    dispatch(syncTodos());
  } catch (err) {
    alert(err);
    console.log(err);
  }
};

export const login = (username, password, token) => async dispatch => {
  console.log(`Logging in: ${username} :: ${password}`);
  dispatch({ type: 'LOGIN_REQUEST' });

  // TODO: Find out a better way to seperate the actual login request and rendering the activity indicator
  // This is a currently hacky way of decoupling the two
  setTimeout(async () => {
    try {
      c = new Cognito();

      // Prevent the login auth code from blocking animations
      // https://facebook.github.io/react-native/docs/interactionmanager.html
      if(!token) {
         token = await c.login(username, password);
      }

      // const token = await c.login(username, password);

      // Setting up AWS credentials for current user
      const loginKey =
        'cognito-idp.' +
        AWS.config['aws_cognito_region'] +
        '.amazonaws.com/' +
        AWS.config['aws_user_pools_id'];
      console.log(`Setting token: ${loginKey} : ${token}`);

      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: AWS.config['aws_cognito_identity_pool_id'],
        Logins: {
          [loginKey]: token,
        },
      });

      // Retrieving identity crednetials given a login token
      await AWS.config.credentials.refreshPromise();

      // Now we can access the db api based on these identity credentials that are automatically pulled from AWS.config
      // There is a bug in which crc32 checks fail on iPhones when the response is above a certain size
      // https://github.com/aws/aws-sdk-js/issues?q=is%3Aissue+CRC32CheckFailed+is%3Aclosed
      db = new AWS.DynamoDB.DocumentClient({ dynamoDbCrc32: false });

      console.log('Saving user session')
      // Save the current user session
      await AsyncStorage.setItem('aws_token', token);
      await AsyncStorage.setItem('username', username);

      // Save the new database and sync todos for current user
      dispatch({ type: 'LOGIN_SUCCESS', db, username });
      dispatch(syncTodos());
    } catch (error) {
      console.log(error);
      alert(error);
      dispatch({ type: 'LOGIN_ERROR', error });
    }
  }, 50);
};

export const signUp = (username, password, email) => async dispatch => {
  try {
    const c = new Cognito();
    dispatch({ type: 'SIGNUP_REQUEST' });
    const result = await c.signUp(username, password, email);
    console.log(result);
    dispatch({
      type: 'SIGNUP_SUCCESS',
      username: result.user.username,
      password,
    });
  } catch (error) {
    console.log(error);
    alert(error);
    dispatch({ type: 'SIGNUP_ERROR', error });
  }
};

export const confirmRegistration = (username, code) => async dispatch => {
  try {
    const c = new Cognito();
    dispatch({ type: 'CONFIRM_REGISTRATION_REQUEST' });
    const result = await c.confirmRegistration(username, code);
    console.log(result);
    dispatch({ type: 'CONFIRM_REGISTRATION_SUCCESS' });
  } catch (error) {
    console.log(error);
    alert(error);
    dispatch({ type: 'CONFIRM_REGISTRATION_ERROR', error });
  }
};

export const logout = () => async dispatch => {
  const user = new Cognito().getCurrentUser();
  if (user != null) {
    user.signOut();
  }
  try {
    await AsyncStorage.removeItem("aws_token")
    await AsyncStorage.removeItem("username")
  } catch (error) {
    console.log(error);
    alert(error);
  }
  dispatch({ type: 'LOGIN_NONE' });
};
