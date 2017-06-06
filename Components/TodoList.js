import React from 'react';
import { Button, Image, StyleSheet, FlatList, Text, View } from 'react-native';
import { CheckBox, ListItem, List } from 'react-native-elements'
import { FormLabel, FormInput } from 'react-native-elements'
import { TabNavigator, StackNavigator } from "react-navigation";

import { Provider, connect } from 'react-redux'

import {todoApp, todos} from '../reducers'
import {toggleTodo} from '../actions'

class ToDoList extends React.Component {
  constructor(props) {
    super(props)
  }

  static navigationOptions = ({navigation}) => 
  {
    return {
      headerRight: 
      (<Button title="+" onPress={() => navigation.navigate("AddToDo")} />)
    }
  }

  //TODO: Change this into an icon 

  _renderItem({item,index}) {
    const checkbox = (
      <CheckBox
      checked={item.completed}
      title={item.text}
      onPress = {() => {this.props.dispatch(toggleTodo(item.id))}}
      />
    )
    return checkbox
  }

  _renderHeader() {
    return (
      <Text> You can do this! </Text>
    );
  }
  render() {
    return (
        <FlatList
        data={this.props.todos}
        renderItem={(i) => this._renderItem(i)}
        keyExtractor={item => item.id}
        />
    );
  }
}
export default connect(state => state)(ToDoList);
