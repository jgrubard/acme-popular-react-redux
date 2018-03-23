import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Nav = (props) => {

  const { users } = props;

  return (
    <div>
      <ul>
        <li>
          <Link to='/'>
            Home
          </Link>
        </li>
        <li>
          <Link to='/users'>
            Users: {users.length}
          </Link>
        </li>
        <li>
          <Link to='/users/create'>
            Create a New User
          </Link>
        </li>
        {
          users.length ? (
            <li>
              <Link to={`/users/${users[0].id}`}>
                {users[0].name} is the most popular!
              </Link>
            </li>
          ) : (
            <span></span>
          )
        }
      </ul>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    users: state.users.sort((lowest, highest) => {
      return highest.rating - lowest.rating;
    }),
  }
}

export default connect(mapStateToProps)(Nav);
