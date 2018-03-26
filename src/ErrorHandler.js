import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gotError } from '../store'

class ErrorHandler extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentWillUnmount() {
    this.props.resetError()
  }

  render() {
    if (this.props.error.length) {
      return (
        <div className='alert alert-danger' role='alert'>
          {this.props.error}
        </div>
      );
    } else {
      return (
        <span></span>
      );
    }
  }

}

const mapStateToProps = (state) => {
  return {
    error: state.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetError: () => dispatch(gotError(''))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler);






/*import React from 'react';
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
*/
