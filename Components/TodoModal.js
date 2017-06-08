import React from 'react';
import { Picker, Switch, Slider, PickerIOS, TextInput, Button, Image, StyleSheet, FlatList, Text, View } from 'react-native';
import { ListItem, List } from 'react-native-elements'
import { FormLabel, FormInput } from 'react-native-elements'
import Form from 'react-native-form'

import { TabNavigator, StackNavigator } from "react-navigation";

import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'


import {todoApp, todos} from '../reducers'
import {addTodo} from '../actions'




class ToDoModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: "help"
    }
    console.log("l")
    console.log(this.props.dispatch)
  }
  static navigationOptions = ({navigation}) => 
  {
    const _onPress = () => {
      navigation.state.params.onDone()
      navigation.goBack()
    }
    return {
      headerLeft: null,
      headerRight: 
      (<Button title="DONE" onPress={_onPress}/>)
    }
  }

  _onDone = () => {
    console.log('lol')
  }

  componentDidMount(){
    this.props.navigation.setParams({
      onDone: () => {this.props.dispatch(addTodo(this.state.text))}
    })
  }

  render() {
    return (
      <Form ref="form">
      <TextInput
      style={{height: 40, borderColor: 'gray', borderWidth: 1}}
      onChangeText={(text) => this.setState({text})}
      value={this.state.text}
      />
      </Form>

    )
  }
}

export default connect(state => state)(ToDoModal);
