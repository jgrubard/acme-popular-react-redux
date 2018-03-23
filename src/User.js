import React, { Component } from 'react';
import { connect } from 'react-redux';
import { putUserThunk, deleteUserThunk } from '../store'

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.user ? props.user.name : '',
      rating: props.user ? props.user.rating : 0
    }
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeRating = this.onChangeRating.bind(this);
    this.onSaveUser = this.onSaveUser.bind(this);
    this.onDeleteUser = this.onDeleteUser.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.user ? nextProps.user.name : '',
      rating: nextProps.user ? nextProps.user.rating : 0
    })
  }

  onChangeName(ev) {
    const name = ev.target.value;
    this.setState({ name });
  }

  onChangeRating(ev) {
    const rating = ev.target.value;
    this.setState({ rating });
  }

  onSaveUser(ev) {
    ev.preventDefault();
    const user = {
      name: this.state.name,
      id: this.props.user.id,
      rating: this.state.rating
    }
    this.props.onSave(user)
  }

  onDeleteUser(ev) {
    ev.preventDefault()
    this.props.onDelete(this.props.user)
  }


  render() {

    const { user } = this.props;
    const { name, rating } = this.state;
    const { onChangeName, onChangeRating, onSaveUser, onDeleteUser } = this;

    if (!user) {
      return null;
    }
    return (
      <div>
        <form onSubmit={onSaveUser}>
          <input value={name} onChange={onChangeName} />
          <input value={rating} onChange={onChangeRating} />
          <button>Update</button>
        </form>
          <button onClick={onDeleteUser}>Delete</button>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { users } = state;
  return {
    user: users.find(user => user.id === id * 1)
  }
}

const mapStateToDispatch = (dispatch, ownProps) => {
  return {
    onSave: (user) => dispatch(putUserThunk(user, ownProps.history)),
    onDelete: (user) => dispatch(deleteUserThunk(user, ownProps.history))
  }
}

export default connect(mapStateToProps, mapStateToDispatch)(User);
