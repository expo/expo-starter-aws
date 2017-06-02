import React from 'react';
import { Button, Image, StyleSheet, FlatList, Text, View } from 'react-native';
import { ListItem, List } from 'react-native-elements'
import { FormLabel, FormInput } from 'react-native-elements'
import { TabNavigator, StackNavigator } from "react-navigation";

import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'


import {todoApp, todos} from './reducers'


class ToDoModal extends React.Component {
  static navigationOptions = ({navigation}) => 
  {
    return {
      headerLeft: null,
      headerRight: 
      (<Button title="DONE" onPress={() => navigation.goBack()} />)
    }
  }
  render() {
    return (
      <FormInput
      ref='forminput'
      textInputRef='email'/>
    )
  }
}

export default connect(state => ({}))(ToDoModal);
