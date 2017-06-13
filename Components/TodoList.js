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
import { Icon } from 'react-native-elements';

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
    fontSize: 12,
  },
  text: {
    flexWrap: 'wrap',
    marginLeft: 10,
    marginRight: 15,
    flex: 1,
    fontSize: 16,
  },
});

class TodoListItem extends React.Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (this.props.completed !== nextProps.completed)
  }

  render() {
    const { category, text } = this.props.item;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.wrapper}
          underlayColor="rgba(1, 1, 255, 0.9)"
          onPress={() =>
            this.props.onPressItem(this.props.item, this.props.index)}>

          <MaterialIcons
            name={this.props.completed ? 'check-box' : 'check-box-outline-blank'}
            color={this.props.completed ? 'lightgreen' : 'lightgrey'}
            size={26}
          />
          <View style={{ flexDirection: 'column' }}>
            <Text style={styles.text}> {text} </Text>
            {!!category
              ? <Text style={styles.category}> {category} </Text>
              : null}
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

class ToDoList extends React.Component {
  constructor(props) {
    super(props);
    // Showing toggled todos that
    this.state = {
      completed: this._todosToSelectedState(props.todos),
    };
  }

  _todoToMap = todo => {
    return [ todo.todoId, todo.completed ];
  };

  _todosToSelectedState = todos => {
    return new Map(todos.map(this._todoToMap));
  };

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.aws.loginState !== this.props.aws.loginState &&
      nextProps.aws.loginState === 'LOGIN_NONE'
    ) {
      nextProps.navigation.navigate('Auth');
    }
    this.state.completed = this._todosToSelectedState(nextProps.todos);
  }

  componentWillMount() {
    if (this.props.aws.loginState !== 'LOGIN_SUCCESS') {
      this.props.navigation.navigate('Auth');
    }
  }

  static navigationOptions = ({ navigation }) => {
    let options = {
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
      options = { ...options, header: null };
    }
    return options;
  };

  _renderItem({ item, index }) {
    const listItem = (
      <TodoListItem
        item={item}
        index={index}
        completed={!!this.state.completed.get(item.todoId)}
        onPressItem={this._toggleTodo.bind(this)}
      />
    );
    return listItem;
    // return item.temp ? tempCheckbox : checkbox;
  }

  _toggleTodo(item, index) {
    const tempItem = { ...item };
    this.setState((state) => {
      const completed = new Map(state.completed);
      completed.set(item.todoId, !completed.get(item.todoId)); 
      return {completed}
    })
    this.props.dispatch(toggleTodo(tempItem));
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
        color="#2196F3"
        name="playlist-add"
        onPress={() => this.props.navigation.navigate('AddTodo')}
      />
    );
    return (
      <View>
        <FlatList
          onRefresh={() => this.props.dispatch(syncTodos())}
          refreshing={!!this.props.todos.refreshing}
          data={this.props.todos}
          renderItem={i => this._renderItem(i)}
          keyExtractor={item => item.todoId}
        />
        {Platform.OS === 'android' ? androidButton : null}
      </View>
    );
  }
}
export default connect(state => state)(ToDoList);
