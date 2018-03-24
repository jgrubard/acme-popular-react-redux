import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postUserThunk } from '../store';

class UserCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      rating: 0
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
    const user = this.state;
    this.props.onSave(user)
  }

  render() {
    const { onInputName, onInputRating, onSaveUser } = this;
    const { name } = this.state;
    return (
      <div>
        <form onSubmit={onSaveUser}>
          <input onChange={onInputName} placeholder='Please enter a User Name' className='form-control' />
          <input onChange={onInputRating} placeholder='Please enter a Rating' className='form-control'  style={{'marginTop':'15px'}}/>
          <button className='btn btn-primary' disabled={!name.length} style={{'marginTop':'15px'}}>Create User</button>
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
