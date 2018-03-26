import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggingMiddleware from 'redux-logger'

import axios from 'axios';

const initialState = {
  users: [],
  error: ''
}

const GET_USERS = 'GET_USERS';
const CREATE_USER = 'CREATE_USER'
const UPDATE_USER = 'UPDATE_USER';
const DELETE_USER = 'DELETE_USER';

const GOT_ERROR = 'GOT_ERROR';

export const getUsers = (users) => {
  return {
    type: GET_USERS,
    users
  };
}

export const createUser = (user) => {
  return {
    type: CREATE_USER,
    user
  }
}

export const updateUser = (user) => {
  return {
    type: UPDATE_USER,
    user
  }
}

export const deleteUser = (user) => {
  return {
    type: DELETE_USER,
    user
  }
}

export const gotError = (error) => {
  return {
    type: GOT_ERROR,
    error
  }
}

export const fetchUsersThunk = () => {
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

export const postUserThunk = (user, history) => {
  return dispatch => {
    return (
      axios.post('/api/users', user)
        .then(res => res.data)
        .then(_user => {
          const action = createUser(_user);
          dispatch(action);
        })
        .then(() => {
          if (history) {
            history.push('/users');
          }
        })
        // .then(() => dispatch(gotError('')))
        .catch(err => {
          console.error(err);
          dispatch(gotError(err.response.data.errors[0].message));
        })
    );
  }
}

export const putUserThunk = (user, history) => {
  return dispatch => {
    return (
      axios.put(`/api/users/${user.id}`, user)
        .then(res => res.data)
        .then(_user => {
          const action = updateUser(_user);
          dispatch(action);
        })
        .then(() => {
          if (history) {
            history.push('/users');
          }
        })
        .then(() => dispatch(gotError('v')))
        .catch(err => {
          console.error(err);
          dispatch(gotError(err.response.data.errors[0].message));
          // dispatch(gotError(err));
        })
    );
  }
}

export const deleteUserThunk = (user, history) => {
  return dispatch => {
    return axios.delete(`/api/users/${user.id}`)
      .then(() => {
        const action = deleteUser(user);
        dispatch(action);
      })
      .then(() => history.push('/users'))
  }
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return Object.assign({}, state, { users: action.users });
    case CREATE_USER:
      return Object.assign({}, state, {
        users: [ ...state.users, action.user ]
      })
    case UPDATE_USER:
      return Object.assign({}, state, {
        users: [
          ...state.users.filter(user => user.id !== action.user.id),
          action.user
        ]
      })
    case DELETE_USER:
      return Object.assign({}, state, {
        users: [ ...state.users.filter(user => user.id !== action.user.id) ]
      })

    case GOT_ERROR:
      return Object.assign({}, state, {
        error: action.error
      })
    default:
      return state;
  }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware, loggingMiddleware));

export default store;

