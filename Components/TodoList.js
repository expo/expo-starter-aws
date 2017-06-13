import React from 'react';
import {
  TouchableHighlight,
  TouchableOpacity,
  Button,
  Image,
  Platform,
  StyleSheet,
  FlatList,
  Text,
  View,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Icon } from 'react-native-elements'

import { Provider, connect } from 'react-redux';

import { syncTodos, toggleTodo } from '../actions';

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
    marginRight: 15,
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
    let options = 
    {
      headerRight: (
        <TouchableOpacity
          onPress={() => navigation.navigate('AddTodo')}
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

    // Remove header if android phone
    if (Platform.OS === 'android') {
      options = {...options, header: null}
    }
    return options
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
    const androidButton = (
      <Icon
      raised
      reverse
      containerStyle={{
        position: 'absolute',
          bottom: 20,
          right: 15,
      }}
      color='#2196F3'
      name='playlist-add'
      onPress={() => this.props.navigation.navigate('AddTodo')}
      />
    )
    return (
      <View>
      <FlatList
      onRefresh={() => this.props.dispatch(syncTodos())}
      refreshing={!!this.props.todos.refreshing}
      data={this.state.todos}
      renderItem={i => this._renderItem(i)}
      keyExtractor={item => item.todoId}
      />
      {Platform.OS === 'android' ? androidButton : null}
      </View>
    );
  }
}
export default connect(state => state)(ToDoList);
