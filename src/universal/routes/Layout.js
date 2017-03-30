import React, {Component, PropTypes} from  'react';
import {Route, Redirect} from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import {
  fadeEnter,
  fadeEnteActive,
  fadeLeave,
  fadeLeaveActive
} from 'universal/styles/transitions.less';

import * as Routes from 'universal/routes/index.js';

import PrivateRouteContainer from 'universal/containers/PrivateRoute/PrivateRouteContainer.js';

import {
  background
} from 'universal/styles/global.less';

class Layout extends Component {
  render () {
    const {
      location
    } = this.props;

    return (
      <div className={background}>
        <PrivateRouteContainer location={location} path='/' component={Routes.Inbox} />
        <ReactCSSTransitionGroup
          transitionName={{
            enter: fadeEnter,
            enterActive: fadeEnteActive,
            leave: fadeLeave,
            leaveActive: fadeLeaveActive,
          }}
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}>
          <Route exact location={location}  path='/login' component={Routes.Login} />
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default Layout;
