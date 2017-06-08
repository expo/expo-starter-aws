import React from 'react';
import { TextInput, Button, Image, StyleSheet, FlatList, Text, View } from 'react-native';
import { CheckBox, ListItem, List } from 'react-native-elements'
import { FormLabel, FormInput } from 'react-native-elements'
import { TabNavigator, StackNavigator } from "react-navigation";

import { Provider, connect } from 'react-redux'

import {todoApp, todos} from '../reducers'
import {logout} from '../actions'

const styles = {
  container: {
    display: 'flex',
    flex: 1,
    margin: 50
  }
}

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Settings Screens</Text>
          <Button
          style={styles.button}
          title = 'Logout'
          onPress = {() => this.props.dispatch(logout())}
        />
      </View>
    );
  }
}

export default connect(state => state)(SettingsScreen);
