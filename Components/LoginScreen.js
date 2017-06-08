import React from 'react';
import { ActivityIndicator, TextInput, Button, Image, StyleSheet, FlatList, Text, View } from 'react-native';
import { CheckBox, ListItem, List } from 'react-native-elements'
import { FormLabel, FormInput } from 'react-native-elements'
import { TabNavigator, StackNavigator } from "react-navigation";

import { Provider, connect } from 'react-redux'

import {todoApp, todos} from '../reducers'
import {login} from '../actions'

const styles = StyleSheet.create({
  loading: {

  },
  container: {
    flex:1,
    padding: 50
  }, 
  buttons: {
    margin: 20,
    borderColor: 'gray'
  },
  input: {
    margin: 10,
    height: 50,
    borderColor: 'gray',
    borderWidth: 2
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    margin: 35
  }


})

class LoginScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }
  render() {
    const loading = <ActivityIndicator/>
    const buttons = (
        <View style={styles.buttons}>
        <Button
        style={styles.button}
        title = 'Login'
        onPress = {() => this.props.dispatch(login(this.state.username,this.state.password))}
        />
        <Button 
        style={styles.button}
        title = 'Register'
        onPress = {() => this._register()}
        />
       </View>
    )

    return (
      <View style={styles.container}> 
        <Text style={styles.title}>Expo AWS Todo List</Text>
        <TextInput
        style={styles.input}
        onChangeText={(text) => this.setState({username: text})}
        autoCapitalize= 'none'
        autoCorrect= {false}
        value={this.state.username}
        returnKeyType='next'
        placeholder=' Username'
        />
        <TextInput
        style={styles.input}
        onChangeText={(text) => this.setState({password: text})}
        secureTextEntry = {true}
        autoCapitalize= 'none'
        autoCorrect = {false}
        value={this.state.password}
        returnKeyType='done'
        placeholder=' Password'
        />

        {this.props.loginState === 'LOGIN_REQUEST' ? loading : buttons}
      </View>
    )
  }
  _register() {

  }
}
export default connect(state => state.aws)(LoginScreen);
