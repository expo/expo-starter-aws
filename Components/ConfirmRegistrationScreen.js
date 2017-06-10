import React from 'react';
import { ActivityIndicator, TextInput, Button, Image, StyleSheet, FlatList, Text, View } from 'react-native';
import { connect } from 'react-redux'
import {confirmRegistration} from '../actions'

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
    height: 80,
    fontSize: 30
  },

  title: {
    textAlign: 'center',
    fontSize: 25,
    margin: 20
  }
})

class ConfirmRegistrationScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      code: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if(nextProps.confirmRegistrationState !== this.props.confirmRegistrationState &&
      nextProps.confirmRegistrationState === "CONFIRM_REGISTRATION_SUCCESS") {
      alert("Confirmation Successful!")

      // Go back two screens to the login page
      const {goBack} = this.props.navigation
      goBack(null)
      goBack(null)
    }

  }

  render() {
    const loading = <ActivityIndicator/>
    return (
      <View style={styles.container}> 
        <Text style={styles.title}> Register Account: </Text>
        <Text style={styles.title}> {this.props.username} </Text>
        <TextInput
        style={styles.input}
        onChangeText={(text) => this.setState({code: text})}
        autoCorrect = {false}
        autoCapitalize = 'none'
        placeholder=" code"
        value={this.state.code}
        />
        <Button
        title = 'Register'
        onPress = {() => this.props.dispatch(confirmRegistration
          (this.props.username, this.state.code))}
        />
        {this.props.signUpState === 'CONFIRM_REGISTRATION_REQUEST' ? loading : null}
      </View>
    )
  }
  
}
export default connect(state => state.aws)(ConfirmRegistrationScreen);
