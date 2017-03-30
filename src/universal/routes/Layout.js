import React, {Component, PropTypes} from  'react';
import {Route, Redirect} from 'react-router';

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
        <Route exact location={location}  path='/login' component={Routes.Login} />
        <Route exact location={location} path='/logout' component={Routes.Logout} />
      </div>
    );
  }
}

export default Layout;
