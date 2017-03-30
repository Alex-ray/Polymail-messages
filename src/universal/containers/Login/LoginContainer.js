import React, {Component, PropTypes} from 'react';

import {connect} from 'react-redux';

// Components
import {LoginPage} from 'universal/components/pages/LoginPage/LoginPage.js'

// Actions
import {
  login
} from 'universal/ducks/auth.js';

@connect(mapStateToProps, mapDispatchToProps, mergeProps)
class LoginContainer extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    error: PropTypes.string,
    loading: PropTypes.bool
  };

  render () {
    const {
      login,
      error,
      loading
    } = this.props;

    return (
      <LoginPage login={login} error={error} loading={loading}/>
    );
  }
}

function mapStateToProps (state, ownProps) {
  return {
    error: state.auth.get('error'),
    authToken: state.auth.get('authToken'),
    loading: state.auth.get('loggingIn')
  };
}

function mapDispatchToProps (dispatch) {
  return {
    login: login(dispatch)
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return Object.assign(stateProps, ownProps, {
    login: (userFields) => dispatchProps.login(userFields, stateProps.authToken)
  });
}

export default LoginContainer ;
