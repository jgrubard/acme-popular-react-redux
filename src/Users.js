import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import store, { putUserThunk } from '../store'

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0
    }

    this.onIncreaseRating = this.onIncreaseRating.bind(this);
    this.onDecreaseRating = this.onDecreaseRating.bind(this);
    this.onSaveRating = this.onSaveRating.bind(this);
  }

  onIncreaseRating(ev) {
    this.setState({ rating: ev.target.value })
  }

  onDecreaseRating(ev) {
    this.setState({ rating: ev.target.value })
  }

  onSaveRating(ev) {
    ev.preventDefault();
    const action = putUserThunk({ rating: this.state.rating })
    store.dispatch(action);

  }

  render() {

    console.log(this.state.rating)

    const { users } = this.props;
    const { onIncreaseRating, onDecreaseRating, onSaveRating } = this;

    return (
      <div>
        <ul>
          {
            users.map(user => (
              <li key={user.id}>
                <Link to={`/users/${user.id}`}>
                  {user.name}
                </Link>
                <br />
                <form onSubmit={onSaveRating} >
                  <button onClick={onIncreaseRating} value={user.rating - 1}>-</button>
                    &nbsp;
                    {user.rating}
                    &nbsp;
                  <button onClick={onDecreaseRating} value={user.rating + 1}>+</button>
                </form>
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

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onIncrease:
//     onDecrease:
//   }
// }

export default connect(mapStateToProps)(Users);
