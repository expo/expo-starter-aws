import React from 'react';
import { TextInput, Button, Image, StyleSheet, FlatList, Text, View } from 'react-native';
import { CheckBox, ListItem, List } from 'react-native-elements'
import { FormLabel, FormInput } from 'react-native-elements'
import { TabNavigator, StackNavigator } from "react-navigation";

import { Provider, connect } from 'react-redux'

import {todoApp, todos} from '../reducers'
import {login} from '../actions'

const styles = {

}

class LoginScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }
  render() {
    return (
      <View style={{flex:1, padding:20}}> 
        <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({username: text})}
        autoCorrect = {false}
        value={this.state.username}
        />
        <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({password: text})}
        secureTextEntry = {true}
        autoCorrect = {false}
        value={this.state.password}
        />
        <Button
        title = 'Login'
        onPress = {() => this.props.dispatch(login(this.state.username,this.state.password))}
        />
      </View>
    )
  }
  
  _login() {
    this.login(this.state.username, this.state.password)
  }
}
export default connect(state => state)(LoginScreen);
