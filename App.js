// React UI
import React from 'react';
import { Button, Image, StyleSheet, FlatList, Text, View } from 'react-native';
import { ListItem, List } from 'react-native-elements'
import { FormLabel, FormInput } from 'react-native-elements'
import { TabNavigator, StackNavigator } from "react-navigation";

// Redux
import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'
import {todoApp, todos} from './reducers'

// Components 
import ToDoModal from './ToDoModal'
import ToDoList from './ToDoList'

import {importTodos} from './actions'
// AWS Integrations
// import AWS from 'aws-sdk/dist/aws-sdk-react-native'
// import { CognitoUserPool, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';
// import AWSHelper from './AWSHelper'




const testData = 
  [{ "id": 1, "text": "Nevins" }, { "id": 2, "text": "Alvy" }, { "id": 3, "text": "Loutitia" }, { "id": 4, "text": "Serene" }, { "id": 5, "text": "Esma" }, { "id": 6, "text": "Bradly" }, { "id": 7, "text": "Antone" }, { "id": 8, "text": "Herminia" }, { "id": 9, "text": "Pauly" }, { "id": 10, "text": "Bartlet" }, { "id": 11, "text": "Fitz" }, { "id": 12, "text": "Dorey" }, { "id": 13, "text": "Antoine" }, { "id": 14, "text": "Sharona" }, { "id": 15, "text": "Robinetta" }, { "id": 16, "text": "Gertruda" }, { "id": 17, "text": "Lilah" }, { "id": 18, "text": "Tremayne" }, { "id": 19, "text": "Englebert" }, { "id": 20, "text": "Geordie" }] 

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


class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Settings Screens</Text>
      </View>
    );
  }
}

const BasicApp = TabNavigator({
  ToDos: {screen: ToDoScreen},
  Settings: {screen: SettingsScreen}
});

class Root extends React.Component {
  componentWillMount() {
    this.store = createStore(todoApp,{todos: testData})
    this.store.dispatch(importTodos(testData))
  }
  render() {
    return (
       <Provider store={this.store}>
         <BasicApp />
       </Provider>
     );
  }
}

SettingsScreen = connect(state => ({}))(SettingsScreen);

export default Root;

