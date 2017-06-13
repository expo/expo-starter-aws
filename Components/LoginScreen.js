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
    flex:1,
    padding: 50,
    backgroundColor: 'white',
  },
  button: {
    margin: 5,
    flex: 1
  },
  buttons: {
    flexDirection: 'row',
    flex: 1,
    margin: 20,
    borderColor: 'blue',
  },
  input: {
    marginBottom: 5,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: 'lightgray',
    padding: 10,
    height: 50,
    fontSize: 13,
    width: '90%',
    alignSelf: 'center'
  },
  logo:{
    width:80, height:80, margin: 30,  alignSelf: 'center'
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    marginTop: 15,
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
    const loading = <ActivityIndicator style={{flex:1}} />;
    const buttons = (
      <View style={styles.buttons}>
        <Button
          containerViewStyle={styles.button}
          backgroundColor='#397af8'
          title="Login"
          disabled={!this._validateLogin()}
          onPress={() => this._login()}
        />
        <Button
          containerViewStyle={styles.button}
          backgroundColor='#397af8'
          title="Register"
          disabled={this.props.loginState === 'LOGIN_REQUEST'}
          onPress={() => this.props.navigation.navigate('Register')}
        />
      </View>
    );

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Expo AWS Todo List</Text>
        <Image style={styles.logo} source={require('../assets/mobile-hub-icon.png')}/>
        <View>
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
      </View>
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
