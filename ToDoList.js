import React from 'react';
import { Button, Image, StyleSheet, FlatList, Text, View } from 'react-native';
import { ListItem, List } from 'react-native-elements'
import { FormLabel, FormInput } from 'react-native-elements'
import { TabNavigator, StackNavigator } from "react-navigation";

import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'


import {todoApp, todos} from './reducers'

class ToDoList extends React.Component {
  constructor(props) {
    super(props);
    console.log(props)
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
    return (
      <ListItem 
       roundAvatar
       title = {item.first_name}
      />
    )
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
        renderItem={this._renderItem}
        keyExtractor={item => item.id}
        />
    );
  }
}
export default connect(state => state)(ToDoList);
