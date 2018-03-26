import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { putUserThunk } from '../store'

class Users extends Component {
  constructor(props) {
    super(props);
    this.onChangeRating = this.onChangeRating.bind(this);
  }

  onChangeRating(ev, user) {
    const _user = {
      rating: ev.target.value,
      id: user.id,
      name: user.name
    }
    this.props.onSave(_user);
  }

  render() {

    const { users } = this.props;
    const { onChangeRating } = this;

    return (
      <div>
        <ul className='list-group'>
          {
            users.map(user => (
              <li key={user.id} className='list-group-item'>
                <Link to={`/users/${user.id}`} style={{'marginRight':'15px'}}>
                  {user.name}
                </Link>
                <button onClick={(ev) => onChangeRating(ev, user)} value={(user.rating * 1) - 1} className='btn btn-outline-dark btn-sm'>-</button>
                  &nbsp;&nbsp;
                  {user.rating}
                  &nbsp;&nbsp;
                <button onClick={(ev) => onChangeRating(ev, user)} value={(user.rating * 1) + 1} className='btn btn-outline-dark btn-sm'>+</button>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    users: state.users.sort((lowest, highest) => {
      return highest.rating - lowest.rating;
    }),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSave: (user) => dispatch(putUserThunk(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
