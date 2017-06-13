// React UI
import React from 'react';
import { Button, Image, StyleSheet, FlatList, Text, View } from 'react-native';
import { ListItem, List } from 'react-native-elements';
import { FormLabel, FormInput } from 'react-native-elements';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

// Redux
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { todoApp, todos } from './reducers';
import { importTodos, login } from './actions';

// Components
import ToDoModal from './Components/TodoModal';
import ToDoList from './Components/TodoList';
import LoginScreen from './Components/LoginScreen';
import RegisterScreen from './Components/RegisterScreen.js';
import ConfirmRegistrationScreen from './Components/ConfirmRegistrationScreen.js';
import SettingsScreen from './Components/SettingsScreen';

// AWS Integrations
// TODO: Add AWS Integrations that DO NOT BREAK
import AWS from 'aws-sdk/dist/aws-sdk-react-native';
import Cognito from './cognito-helper';
import { awsmobile } from './aws-exports';

// Setting up AWS configuration
// TODO: Kind of hacky way of doing this. ALl the configuration information is in aws-exports.js that is downloaded
// from the mobile hub website. You then have to delete everything outside of the exports statement because React Native cannot use the default require('aws-sdk'). There should be a better way of setting the config. These settings persist throughout the app.
AWS.config = new AWS.Config();
AWS.config['aws_cognito_region'] = awsmobile.aws_cognito_region;
AWS.config['aws_user_pools_id'] = awsmobile.aws_user_pools_id;
AWS.config['aws_cognito_identity_pool_id'] =
  awsmobile.aws_cognito_identity_pool_id;
AWS.config['region'] = awsmobile.aws_project_region;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const ToDoScreen = StackNavigator(
  {
    ListScreen: {
      screen: ToDoList,
    },
    AddTodo: {
      screen: ToDoModal,
    },
  },
  {
    headerMode: 'float',
    mode: 'modal',
  }
);

const MainScreen = TabNavigator({
  ToDos: {
    screen: ToDoScreen,
    navigationOptions: {
      tabBarLabel: 'Todos',
      tabBarIcon: ({ tintColor, focused }) =>
        <Ionicons
          name={focused ? 'ios-menu' : 'ios-menu-outline'}
          size={26}
          style={{ color: tintColor }}
        />,
    },
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: ({ tintColor, focused }) =>
        <Ionicons
          name={focused ? 'ios-settings' : 'ios-settings-outline'}
          size={26}
          style={{ color: tintColor }}
        />,
    },
  },
});
const AuthScreen = StackNavigator({
  Login: {
    screen: LoginScreen,
  },
  Register: {
    screen: RegisterScreen,
  },
  ConfirmRegistration: {
    screen: ConfirmRegistrationScreen,
  },
});

const App = StackNavigator(
  {
    Main: {
      screen: MainScreen,
    },
    Auth: {
      screen: AuthScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

App = connect(state => state.aws)(App);

class Root extends React.Component {
  componentWillMount() {
    this.store = createStore(todoApp, {}, applyMiddleware(thunk));
    // this.store.dispatch(importTodos(testData))
    let c = new Cognito();
    // Code for signing up, logging in, confirming registration
    // c.signup('wilson','password','wilzh40@gmail.com')
    // c.confirmregistration('wilson','931659')
    this.store.dispatch(login('wilson', 'password'));
  }
  render() {
    return (
      <Provider store={this.store}>
        <App />
      </Provider>
    );
  }
}

export default Root;
