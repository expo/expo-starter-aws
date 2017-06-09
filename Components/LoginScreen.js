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
  button: {
    borderColor: 'blue',
    borderRadius: 3,
    borderWidth: 2
  },
  buttons: {
    margin: 20,
    borderColor: 'gray'
  },
  input: {
    margin: 10,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    height: 50,
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
  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if(nextProps.loginState === "LOGIN_SUCCESS") {
      nextProps.navigation.goBack(null)
    }
  }
  render() {
    const loading = <ActivityIndicator/>
    const buttons = (
        <View style={styles.buttons}>
        <Button
        style={styles.button}
        title = 'Login'
        disabled = {this.props.loginState === "LOGIN_REQUEST"}
        onPress = {() => this.props.dispatch(login(this.state.username,this.state.password))}
        />

        <Button 
        style={styles.button}
        title = 'Register'
        disabled = {this.props.loginState === "LOGIN_REQUEST"}
        onPress = {() => this.props.navigation.navigate("Register")}
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
        {buttons}
        {this.props.loginState === 'LOGIN_REQUEST' ? loading : null}
      </View>
    )
  }
  _register() {

  }
}


export default connect(state => state.aws)(LoginScreen);
