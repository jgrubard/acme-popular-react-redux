import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../store'

class User extends Component {
  constructor(props) {
    super(props);
    // console.log(props)
  }

  render() {

    const { user, handleChange } = this.props;

    return (
      <div>
        <form>
          <input value={user.name} onChange={handleChange}/>
          <button>Update</button>
        </form>
          <button>Delete</button>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  return {
    users: state.users,
    user: state.users.find(user => user.id === id * 1)
  }
}

const mapStateToDispatch = (dispatch, ownProps) => {

  // console.log(ownProps)

  return {
    handleChange: (ev) => {
      const action = updateUser({
        name: ev.target.value,
      //   id: ownProps.user.id,
      //   rating: ownProps.user.rating
      })
      dispatch(action);
    }
  }
}

export default connect(mapStateToProps, mapStateToDispatch)(User);
