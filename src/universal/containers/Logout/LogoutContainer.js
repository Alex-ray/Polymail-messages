import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

// Actions
import {
  logout
} from 'universal/ducks/auth.js';

@connect(mapStateToProps, mapDispatchToProps)
class LogoutContainer extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.logout();
  }

  render () {
    return (
      <h1>Logout</h1>
    );
  }
}

function mapStateToProps (state, ownProps) {
  return {};
}

function mapDispatchToProps (dispatch) {
  return {
    logout: logout(dispatch)
  };
}
export default LogoutContainer ;
