import React from 'react';
import {
  TouchableHighlight,
  TouchableOpacity,
  Button,
  Image,
  StyleSheet,
  FlatList,
  Text,
  View,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import { Provider, connect } from 'react-redux';

import { toggleTodo } from '../actions';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fafafa',
    borderColor: '#ededed',
    borderWidth: 1,
    padding: 17,
    borderRadius: 3,
  },
  category: {
    marginLeft: 10,
    top: 4, 
    color: 'grey',
    flex: 1,
    fontSize: 12
  },
  text: {
    flexWrap: 'wrap',
    marginLeft: 10,
    marginRight: 14,
    flex: 1,
    fontSize: 16
  },
});

class ToDoList extends React.Component {
  constructor(props) {
    super(props);
    // Showing toggled todos that
    this.state = {
      todos: this.props.todos,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.aws.loginState !== this.props.aws.loginState &&
      nextProps.aws.loginState === 'LOGIN_NONE'
    ) {
      nextProps.navigation.navigate('Auth');
    }
    this.state.todos = nextProps.todos;
  }

  componentWillMount() {
    if (this.props.aws.loginState !== 'LOGIN_SUCCESS') {
      this.props.navigation.navigate('Auth');
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <TouchableOpacity
          onPress={() => navigation.navigate('AddToDo')}
          hitSlop={{ top: 5, left: 5, bottom: 5, right: 5 }}
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 10,
            paddingTop: 1,
          }}>
          <Ionicons name="ios-add" size={40} style={{ color: 'blue' }} />
        </TouchableOpacity>
      ),
    };
  };

  _renderItem({ item, index }) {
    const tempCheckbox = (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.wrapper}
          underlayColor="rgba(1, 1, 255, 0.9)"
          onPress={() => this._toggleTodo(item, index)}>
          <MaterialIcons
            name={item.completed ? 'check-box' : 'check-box-outline-blank'}
            color={item.completed ? 'lightgreen' : 'lightgrey'}
            size={26}
          />
          <View style={{flexDirection: 'column'}}>
            <Text style={styles.text}> {item.text} </Text>
      {!!item.category ? <Text style={styles.category}> {item.category} </Text> : null}
          </View>
        </TouchableOpacity>
      </View>
    );
    const checkbox = (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.wrapper}
          underlayColor="rgba(1, 1, 255, 0.9)"
          onPress={() => this._toggleTodo(item, index)}>
          <MaterialIcons
            name={item.completed ? 'check-box' : 'check-box-outline-blank'}
            color={item.completed ? 'green' : 'grey'}
            size={26}
          />
          <Text style={styles.text}> {item.text} </Text>
        </TouchableOpacity>
      </View>
    );
    return tempCheckbox
    return item.temp ? tempCheckbox : checkbox;
  }

  _toggleTodo(item, index) {
    this.props.dispatch(toggleTodo(item));
    tempTodos = this.state.todos.slice();
    tempTodos[index].temp = true;
    tempTodos[index].completed = !tempTodos[index].completed;
    this.setState({ todos: tempTodos });
  }
  render() {
    return (
      <FlatList
        data={this.state.todos}
        renderItem={i => this._renderItem(i)}
        keyExtractor={item => item.todoId}
      />
    );
  }
}
export default connect(state => state)(ToDoList);
