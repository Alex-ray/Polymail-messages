import React, {Component, PropTypes} from  'react';
import {Route, Redirect} from 'react-router';

import * as Routes from 'universal/routes/index.js';

import PrivateRouteContainer from 'universal/containers/PrivateRoute/PrivateRouteContainer.js';

import {
  background
} from 'universal/styles/global.less';

class Layout extends Component {
  render () {
    return (
      <div className={background}>
        <PrivateRouteContainer path='/' component={Routes.Inbox} />
        <Route exact path='/login' component={Routes.Login} />
      </div>
    );
  }
}

export default Layout;
