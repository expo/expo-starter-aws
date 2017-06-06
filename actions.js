let nextTodoId = 0

export const importTodos = (todos) => {
  nextTodoId = todos.length + 1
  return {
    type: 'IMPORT_TODOS',
    todos
  }

}
export const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
  }
}

export const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  }
}

export const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id
  }
}

export const deleteTodo = (index) => {
  return {
    type: 'deleteTodo',
    index
  }
}
