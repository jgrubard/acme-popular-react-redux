import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggingMiddleware from 'redux-logger'

import axios from 'axios';

const initialState = {
  users: []
}

const GET_USERS = 'GET_USERS';
const UPDATE_USER = 'UPDATE_USER';

export const getUsers = (users) => {
  return {
    type: GET_USERS,
    users
  };
}

export const updateUser = (user) => {
  return {
    type: UPDATE_USER,
    user
  }
}

export const fetchUsers = () => {
  return dispatch => {
    return (
      axios.get('/api/users')
        .then(result => result.data)
        .then(users => {
          const action = getUsers(users);
          dispatch(action);
        })
    );
  }
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return Object.assign({}, state, { users: action.users });
    case UPDATE_USER:
      return Object.assign({}, state, {
        users: [
          ...state.users.filter(user => user.id !== action.user.id),
          action.user
        ]
      })
    default:
      return state;
  }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware, loggingMiddleware));

export default store;

