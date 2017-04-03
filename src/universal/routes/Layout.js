// Libraries
import React, {Component, PropTypes} from  'react';
import {Route, Redirect} from 'react-router';

// Routes
import * as Routes from 'universal/routes/index.js';

// Containers
import PrivateRouteContainer from 'universal/containers/PrivateRoute/PrivateRouteContainer.js';

// Styles
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
        <Redirect to={{pathname: '/thread'}} />
        <PrivateRouteContainer location={location} exact path='/thread/:id?' component={Routes.Inbox} />
        <Route exact location={location}  path='/login' component={Routes.Login} />
        <Route exact location={location} path='/logout' component={Routes.Logout} />
      </div>
    );
  }
}

export default Layout;
