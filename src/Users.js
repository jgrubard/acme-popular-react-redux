import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Users = (props) => {
  const { users } = props;
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
              <button>-</button>
                &nbsp;
                {user.rating}
                &nbsp;
              <button>+</button>
            </li>
          ))
        }
      </ul>
    </div>

  );
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
  }
}

export default connect(mapStateToProps)(Users);
