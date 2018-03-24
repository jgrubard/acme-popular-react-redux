import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Nav = (props) => {
  // console.log(props)
  const { count, mostPopular } = props;
  const path = props.location.pathname;

  return (

    <div>
      <ul className='nav'>
        <li className='nav-item'>
          {
            path === '/' ? (
              <span className='nav-link disabled'>
                Home
              </span>
            ) : (
              <Link to='/' className='nav-link'>
                Home
              </Link>
            )
          }

        </li>
        <li className='nav-item'>
          {
            path === '/users' ? (
              <span className='nav-link disabled'>
                Users &nbsp;
                <span className='badge badge-secondary'>
                  {count}
                </span>
              </span>
            ) : (
              <Link to='/users' className='nav-link'>
                Users &nbsp;
                <span className='badge badge-primary'>
                  {count}
                </span>
              </Link>
            )
          }

        </li>
        <li className='nav-item'>
          {
            path === '/users/create' ? (
              <span className='nav-link disabled'>
                Create a New User
              </span>
            ) : (
              <Link to='/users/create' className='nav-link'>
                Create a New User
              </Link>
            )
          }

        </li>
        {
          count ? (
            <li className='nav-item'>
              {
                path === `/users/${mostPopular.id}` ? (
                  <span className='nav-link disabled'>
                    <strong>{mostPopular.name} is the most popular!</strong>
                  </span>
                ) : (
                  <Link to={`/users/${mostPopular.id}`} className='nav-link'>
                    <strong>{mostPopular.name} is the most popular!</strong>
                  </Link>
                )
              }

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
