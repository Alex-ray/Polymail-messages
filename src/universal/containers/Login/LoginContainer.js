import React, {Component, PropTypes} from 'react';

import {connect} from 'react-redux';

// Components
import {LoginPage} from 'universal/components/pages/LoginPage.js'

// Actions
import {
  login
} from 'universal/ducks/auth.js';

@connect(mapStateToProps, mapDispatchToProps, mergeProps)
class LoginContainer extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired
  };

  render () {
    const {
      login
    } = this.props;

    return (
      <LoginPage login={login}/>
    );
  }
}

function mapStateToProps (state, ownProps) {
  return {
    authToken: state.auth.get('authToken')
  };
}

function mapDispatchToProps (dispatch) {
  return {
    login: login(dispatch)
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return Object.assign({}, ownProps, {
    login: (userFields) => dispatchProps.login(userFields, stateProps.authToken)
  });
}

export default LoginContainer ;
