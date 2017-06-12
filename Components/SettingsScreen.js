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
    margin: 50,
  },
};

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
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
