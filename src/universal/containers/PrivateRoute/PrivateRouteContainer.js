import React, {Component, PropTypes} from 'react';
import {Route, Redirect} from 'react-router';

import {connect} from 'react-redux';

@connect(mapStateToProps)
class PrivateRouteContainer extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    routProps: PropTypes.object
  };

  renderComponentOrRedirect = (isAuthenticated, component) => {
    return (props) => {
      if (isAuthenticated) {
        return React.createElement(component, props);
      } else {
        return <Redirect to={{
          pathname: '/login',
          state: {from: props.location}
        }} />
      }
    };
  }

  render () {
    const {
      props: {
        isAuthenticated,
        routeProps: {
          component,
          ...rest
        }
      },
      renderComponentOrRedirect
    } = this;

    return (
      <Route {...rest} render={renderComponentOrRedirect(isAuthenticated, component)} />
    );
  }
}


function mapStateToProps (state, ownProps) {
  return {
    isAuthenticated: state.auth.get('token').length > 1,
    routeProps: ownProps
  }
}

export default PrivateRouteContainer;
