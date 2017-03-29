import React, {Component, PropTypes} from  'react';
import {Route} from 'react-router';

import * as Routes from 'universal/routes/index.js';

class Layout extends Component {
  render () {
    return (
      <div>
        <Route exactly={true} pattern='/' component={Routes.Home} />
      </div>
    );
  }
}

export default Layout;
