import React from 'react';
import { TouchableHighlight, TouchableOpacity, Button, Image, StyleSheet, FlatList, Text, View } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import { Provider, connect } from 'react-redux'

import {todoApp, todos} from '../reducers'
import {toggleTodo} from '../actions'

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    margin: 5,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#fafafa',
    borderColor: '#ededed',
    borderWidth: 1,
    padding: 10,
    borderRadius: 3,
  },
  text: {
    marginLeft: 10,
    marginRight: 10,
  },
});


class ToDoList extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.aws.loginState === "LOGIN_NONE") {
      nextProps.navigation.navigate("Auth")
    }
  }

  componentWillMount() {
    if(this.props.aws.loginState !== "LOGIN_SUCCESS") {
      this.props.navigation.navigate("Auth")
    }
  }

  static navigationOptions = ({navigation}) => 
  {
    return {
      headerRight: (
      <TouchableOpacity
      onPress={() => navigation.navigate("AddToDo")}
      style={{
        flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 10,
          paddingTop: 1,
      }}>
        <Ionicons
        name='ios-add'
        size={26}
        />
        </TouchableOpacity>
      )
    }
  }

  _renderItem({item,index}) {
    const checkbox = (
      <View style={styles.container}>
        <TouchableOpacity
            style={styles.wrapper}
            underlayColor="rgba(1, 1, 255, 0.9)"
            onPress={() => {this.props.dispatch(toggleTodo(item))}}>
              <MaterialIcons
              name={item.completed ? "check-box" : "check-box-outline-blank"}
              color={item.completed ? "green" : "grey"}
              size={26}
              />
              <Text style={styles.text}> {item.text} </Text>
        </TouchableOpacity>
      </View>
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
        keyExtractor={item => item.todoId}
        />
    );
  }
}
export default connect(state => state)(ToDoList);
