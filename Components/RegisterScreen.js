import React from 'react';
import { ActivityIndicator, TextInput, Button, Image, StyleSheet, FlatList, Text, View } from 'react-native';
import { CheckBox, ListItem, List } from 'react-native-elements'
import { FormLabel, FormInput } from 'react-native-elements'
import { TabNavigator, StackNavigator } from "react-navigation";

import { Provider, connect } from 'react-redux'

import {todoApp, todos} from '../reducers'
import {signUp} from '../actions'
const styles = StyleSheet.create({
  loading: {

  },
  container: {
    flex:1,
    padding: 50,
    backgroundColor: 'white'

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

class RegisterScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      email: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.signUpState !== nextProps.signUpState && nextProps.signUpState === "SIGNUP_SUCCESS") {
      nextProps.navigation.navigate("ConfirmRegistration")
    }
  }

  _validateFields() {
    return this.state.username.length > 0 && this.state.password.length >= 8  && this.state.email.length > 3
  }
  render() {
    const loading = <ActivityIndicator/>
    return (
      <View style={styles.container}> 
        <Text style={styles.title}> Register Account </Text>
        <TextInput
        style={styles.input}
        onChangeText={(text) => this.setState({username: text})}
        autoCorrect = {false}
        autoCapitalize = 'none'
        placeholder=" username"
        value={this.state.username}
        />
        <TextInput
        style={styles.input}
        onChangeText={(text) => this.setState({password: text})}
        secureTextEntry = {true}
        autoCorrect = {false}
        autoCapitalize = 'none'
        placeholder=" password"
        value={this.state.password}
        />
        <TextInput
        style={styles.input}
        onChangeText={(text) => this.setState({email: text})}
        autoCorrect = {false}
        autoCapitalize = 'none'
        placeholder=" email"
        value={this.state.email}
        />
        <Button
        title = 'Register'
        disbaled = {!this._validateFields()}
        onPress = {() => this.props.dispatch(signUp(this.state.username,this.state.password,this.state.email))}
        />
        {this.props.signUpState === 'SIGNUP_REQUEST' ? loading : null}
      </View>
    )
  }
  
}
export default connect(state => state.aws)(RegisterScreen);
