// React UI
import React from 'react'
import _ from 'lodash'
import { Button, Image, StyleSheet, FlatList, Text, View } from 'react-native'
import { ListItem, List } from 'react-native-elements'
import { FormLabel, FormInput } from 'react-native-elements'
import { TabNavigator, StackNavigator } from "react-navigation"

// Redux
import { Provider, connect } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {todoApp, todos} from './reducers'
import {importTodos, login} from './actions'

// Components 
import ToDoModal from './Components/TodoModal'
import ToDoList from './Components/TodoList'
import LoginScreen from './Components/LoginScreen'
import SettingsScreen from './Components/SettingsScreen'

// AWS Integrations
// TODO: Add AWS Integrations that DO NOT BREAK
import { CognitoUserPool, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';
import Cognito from './AWSHelper';
import AWS from 'aws-sdk/dist/aws-sdk-react-native'
import * as AWSConfig from './aws-config'

// Setting up AWS configuration
// TODO: Kind of hacky way of doing this. ALl the configuration information is in aws-config.js that is downloaded
// from the mobile hub website. There should be a better way of setting the config.
AWS.config = new AWS.Config()
AWS.config['aws_cognito_region'] = AWSConfig.aws_cognito_region
AWS.config['aws_user_pools_id'] = AWSConfig.aws_user_pools_id
AWS.config['aws_cognito_identity_pool_id'] = AWSConfig.aws_cognito_identity_pool_id
AWS.config['region'] = AWSConfig.aws_project_region

let testData = 
  [{ "id": 1, "text": "Nevins" }, { "id": 2, "text": "Alvy" }, { "id": 3, "text": "Loutitia" }, { "id": 4, "text": "Serene" }, { "id": 5, "text": "Esma" }, { "id": 6, "text": "Bradly" }, { "id": 7, "text": "Antone" }, { "id": 8, "text": "Herminia" }, { "id": 9, "text": "Pauly" }, { "id": 10, "text": "Bartlet" }, { "id": 11, "text": "Fitz" }, { "id": 12, "text": "Dorey" }, { "id": 13, "text": "Antoine" }, { "id": 14, "text": "Sharona" }, { "id": 15, "text": "Robinetta" }, { "id": 16, "text": "Gertruda" }, { "id": 17, "text": "Lilah" }, { "id": 18, "text": "Tremayne" }, { "id": 19, "text": "Englebert" }, { "id": 20, "text": "Geordie" }] 
testData = testData.map(x => _.extend(x,{completed: false})) //TODO: Remove test data and use real data

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffa',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const navigationConfig = {
  headerMode: 'float',
  mode: 'modal'
}

const ToDoScreen = StackNavigator({
  ListScreen: {
    screen: ToDoList
  },
  AddToDo: {
    screen: ToDoModal
  }}, navigationConfig)


const MainScreen = TabNavigator({
  ToDos: {screen: ToDoScreen},
  Settings: {screen: SettingsScreen}
});

class App extends React.Component {
  render() {
    switch(this.props.loginState) {
      case 'LOGIN_SUCCESS':
        return <MainScreen/>
      default:
        return <LoginScreen/>

    }
  }
}
App = connect(state => state.aws)(App)

class Root extends React.Component {
  componentWillMount() {
    this.store = createStore(todoApp,{}, applyMiddleware(thunk))
    // this.store.dispatch(importTodos(testData))
    let c = new Cognito()
    // Code for signingup, logging in, confirming registration
    // c.signup('wilson','password','wilzh40@gmail.com')
    // c.confirmregistration('wilson','931659')
    this.store.dispatch(login('wilson','password'))
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

