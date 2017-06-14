import React from 'react';
import {
  TextInput,
  Button,
  Image,
  StyleSheet,
  FlatList,
  Text,
  View,
} from 'react-native';

import { Provider, connect } from 'react-redux';

import { logout } from '../actions';

const styles = {
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'white',
    padding: 50,
  },
  text: {
    margin: 8,
    fontSize: 18,
    flex: 1,
    color: 'darkgrey',
  },
};

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}> This is an example app created using Expo, Amazon Mobile Hub, Amazong Cognito, and DynamoDB.</Text>
        <Text style={styles.text}> Username: {this.props.aws.username} </Text>
        <Text style={styles.text}> Todo Length: {this.props.todos.length} </Text>
        <Button
          style={styles.button}
          title="Logout"
          onPress={() => this.props.dispatch(logout())}
        />
      </View>
    );
  }
}

export default connect(state => state)(SettingsScreen);
