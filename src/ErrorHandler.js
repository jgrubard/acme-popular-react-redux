import React from 'react';
import { connect } from 'react-redux';

const ErrorHandler = (props) => {
  if (props.error.length) {
    return (
      <div className='alert alert-danger' role='alert'>
        {props.error}
      </div>
    );
  } else {
    return (
      <span></span>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.error
  }
}

export default connect(mapStateToProps)(ErrorHandler);
