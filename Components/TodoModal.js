import React from 'react';
import { Picker, Switch, Slider, PickerIOS, TextInput, Button, Image, StyleSheet, FlatList, Text, View } from 'react-native';
import { ListItem, List } from 'react-native-elements'
import { FormLabel, FormInput } from 'react-native-elements'

import { connect } from 'react-redux'


import {todoApp, todos} from '../reducers'
import {addTodo} from '../actions'




class ToDoModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: ""
    }
    console.log(this.props.dispatch)
  }
  static navigationOptions = ({navigation}) => 
  {
    const _onPress = () => {
      navigation.state.params.onDone()
      navigation.goBack()
    }
    return {
      headerLeft: (<Button title="Cancel" onPress={()=>navigation.goBack()}/>) ,
      headerRight: 
      (<Button title="Done" onPress={_onPress}/>)
    }
  }

  componentDidMount(){
    this.props.navigation.setParams({
      onDone: () => {this.props.dispatch(addTodo(this.state.text))}
    })
  }

  render() {
    return (
      <TextInput
      style={{top: 10, padding: 5,  backgroundColor: 'white', margin: 10, height: 40, fontSize: 14}}
      onChangeText={(text) => this.setState({text})}
      value={this.state.text}
      placeholder=" Insert Todo Text Here"
      disabled={this.state.text.length == 0}
      />
    )
  }
}

export default connect(state => state)(ToDoModal);
