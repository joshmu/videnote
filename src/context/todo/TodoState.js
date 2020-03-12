import React, { createContext, useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid'

import todoReducer from './todoReducer'

import { ADD_TODO, UPDATE_TODO, UPDATE_NEW_TODO, TOGGLE_OPEN } from '../Types'
import { BottomNavigationAction } from '@material-ui/core'

// create context
const todoContext = createContext()

// export provider with actions
const TodoState = props => {
  const initialState = {
    newTodo: {
      msg: '',
      seconds: null,
      checked: false
    },
    open: true,
    todos: []
  }

  // reducer handles state manipulation
  const [state, dispatch] = useReducer(todoReducer, initialState)

  // hold all essential data in 'v' which is given to value prop (this avoids the mistake of forgetting to add actions as props)
  const v = {
    newTodo: state.newTodo,
    open: state.open,
    todos: state.todos
  }

  // actions
  v.toggleOpen = open => {
    dispatch({
      type: TOGGLE_OPEN,
      payload: open
    })
  }

  v.addTodo = () => {
    // provide unique id
    state.newTodo.id = uuidv4()

    dispatch({
      type: ADD_TODO
    })
  }

  v.updateTodo = data => {
    console.log('updateTodo', data)
    if (typeof data.id === 'string' && data.id.length > 0) {
      dispatch({
        type: UPDATE_TODO,
        payload: data
      })
    } else {
      console.error('ID required to update todo')
    }
  }

  v.updateNewTodo = data => {
    dispatch({
      type: UPDATE_NEW_TODO,
      payload: data
    })
  }

  // return provider
  return <todoContext.Provider value={v}>{props.children}</todoContext.Provider>
}

export { TodoState, todoContext }
