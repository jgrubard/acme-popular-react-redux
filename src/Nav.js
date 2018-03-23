import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Nav = (props) => {

  const { count, mostPopular } = props;

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
            Users: {count}
          </Link>
        </li>
        <li>
          <Link to='/users/create'>
            Create a New User
          </Link>
        </li>
        {
          count ? (
            <li>
              <Link to={`/users/${mostPopular.id}`}>
                {mostPopular.name} is the most popular!
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
    count: state.users.length,
    mostPopular: state.users.sort((lowest, highest) => {
      return highest.rating - lowest.rating;
    })[0]
  }
}

export default connect(mapStateToProps)(Nav);
