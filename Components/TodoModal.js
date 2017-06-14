import React from 'react';
import {
  Picker,
  Switch,
  Slider,
  PickerIOS,
  TextInput,
  Button,
  Image,
  StyleSheet,
  FlatList,
  Text,
  View,
} from 'react-native';
import { ListItem, List } from 'react-native-elements';
import { FormLabel, FormInput } from 'react-native-elements';

import { connect } from 'react-redux';

import { todoApp, todos } from '../reducers';
import { addTodo } from '../actions';

const styles = {
  container: {
    backgroundColor: 'white',
    flex:1
  },
  input: {
    padding: 10,
    backgroundColor: 'white',
    borderColor: 'lightgrey',
    borderWidth: 2,
    margin: 15,
    height: 100,
    fontSize: 16,
  },
  text: {
    fontSize: 17,
    marginTop: 5,
    marginLeft: 5,
    color: 'grey',
  },
};

const categories = ['Work', 'Personal', 'Shopping'];

class ToDoModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      category: categories[0],
    };
  }
  static navigationOptions = ({ navigation }) => {
    const _onPress = () => {
      navigation.state.params.onDone();
      navigation.goBack();
    };
    return {
      title: 'Add Todo Item',
      headerLeft: <Button title="Cancel" onPress={() => navigation.goBack()} />,
      headerRight: <Button title="Done" onPress={_onPress} />,
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({
      onDone: () => {
        this.props.dispatch(addTodo(this.state.text, this.state.category));
      },
    });
  }

  render() {
    const pickerItems = categories.map(s =>
      <Picker.Item key={s} label={s} value={s} />
    );
    return (
      <View style={styles.container}>
        <Text style={styles.text}> Description </Text>
        <TextInput
          style={styles.input}
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
          multiline = {true}
          numberOfLines = {3}
          placeholder=" Insert Todo Text Here"
        />
        <Text style={styles.text}> Category </Text>
        <Picker
          selectedValue={this.state.category}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ category: itemValue })}>
          {pickerItems}
        </Picker>
      </View>
    );
  }
}

export default connect(state => state)(ToDoModal);
