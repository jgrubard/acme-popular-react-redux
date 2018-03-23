import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Nav from './Nav';
import Home from './Home';
import Users from './Users';
import User from './User';
import UserCreate from './UserCreate';

import { fetchUsers } from '../store';

class App extends Component {

  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    return (
      <Router>
        <div>
          <h1>ACME Users Popularity Contest</h1>
          <h2>React-Redux Remix</h2>
          <Nav />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/users' component={Users} />
            <Route exact path='/users/create' component={UserCreate} />
            <Route exact path='/users/:id' component={User} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers())
  }
}

export default connect(null, mapDispatchToProps)(App);
