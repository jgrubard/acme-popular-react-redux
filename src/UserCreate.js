import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postUserThunk } from '../store';
import ErrorHandler from './ErrorHandler'

class UserCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      rating: 0,
      error: ''
    }
    this.onInputName = this.onInputName.bind(this);
    this.onInputRating = this.onInputRating.bind(this);
    this.onSaveUser = this.onSaveUser.bind(this);
  }

  onInputName(ev) {
    this.setState({ name: ev.target.value })
  }

  onInputRating(ev) {
    this.setState({ rating: ev.target.value * 1 })
  }

  onSaveUser(ev) {
    ev.preventDefault();
    const user = {
      name: this.state.name,
      rating: this.state.rating
    }
    this.props.onSave(user)
  }

  render() {
    const { onInputName, onInputRating, onSaveUser } = this;
    const { name, rating } = this.state;

    return (
      <div>
        <ErrorHandler />
        <form onSubmit={onSaveUser}>
          <input onChange={onInputName} placeholder='enter your name' className='form-control' />
          <input onChange={onInputRating} placeholder='on a scale of 1-10, how would you rate yourself?' className='form-control'  style={{'marginTop':'15px'}}/>
          <button className='btn btn-primary' disabled={!name.length || rating <= 1 || rating >= 10} style={{'marginTop':'15px'}}>Create User</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSave: (user) => dispatch(postUserThunk(user, ownProps.history))
  }
}

export default connect(null, mapDispatchToProps)(UserCreate);
