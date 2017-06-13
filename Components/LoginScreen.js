import React from 'react';
import {
  Keyboard,
  InteractionManager,
  ActivityIndicator,
  TextInput,
  Image,
  StyleSheet,
  FlatList,
  Text,
  View,
} from 'react-native';
import { Button } from 'react-native-elements';
import { FormLabel, FormInput } from 'react-native-elements';
import { TabNavigator, StackNavigator } from 'react-navigation';

import { Provider, connect } from 'react-redux';

import { todoApp, todos } from '../reducers';
import { login } from '../actions';

const styles = StyleSheet.create({
  loading: {},
  container: {
    flex: 1,
    padding: 50,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: 'lightblue'
  },
  buttons: {
    margin: 20,
    borderColor: 'blue',
  },
  input: {
    margin: 10,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: 'lightgray',
    padding: 10,
    height: 50,
  },

  title: {
    textAlign: 'center',
    fontSize: 25,
    margin: 35,
  },
});

class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      password: '',
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.loginState === 'LOGIN_SUCCESS') {
      nextProps.navigation.goBack(null);
    }
  }
  _validateLogin() {
    return (
      this.props.loginState !== 'LOGIN_REQUEST' &&
      this.state.password.length >= 8 &&
      this.state.username.length > 0
    );
  }
  render() {
    const loading = <ActivityIndicator />;
    const buttons = (
      <View style={styles.buttons}>
        <Button
          raised
          backgroundColor='blue'
          black='white'
          containerViewStyle={styles.button}
          title="Login"
          disabled={!this._validateLogin()}
          onPress={() => this._login()}
        />
        <Text> {"\n"} </Text>
        <Button
          containerViewStyle={styles.button}
          title="Register"
          disabled={this.props.loginState === 'LOGIN_REQUEST'}
          onPress={() => this.props.navigation.navigate('Register')}
        />
      </View>
    );

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Expo AWS Todo List</Text>
        <TextInput
          ref="username"
          style={styles.input}
          onChangeText={text => this.setState({ username: text })}
          autoCapitalize="none"
          autoCorrect={false}
          value={this.state.username}
          returnKeyType="next"
          placeholder=" Username"
        />
        <TextInput
          ref="password"
          style={styles.input}
          onChangeText={text => this.setState({ password: text })}
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
          value={this.state.password}
          returnKeyType="done"
          placeholder=" Password"
          onSubmitEditing={() => this._login()}
        />
        {buttons}
        {this.props.loginState === 'LOGIN_REQUEST' ? loading : null}
      </View>
    );
  }

  _login() {
    Keyboard.dismiss();
    this.props.dispatch(login(this.state.username, this.state.password));
  }
}

export default connect(state => state.aws)(LoginScreen);
