import React, {Component, PropTypes} from 'react';
import { ConnectedRouter } from 'react-router-redux';
import {Route} from 'react-router';

// Redux
import { Provider } from 'react-redux';

// Components
import Layout from 'universal/routes/Layout.js';

class App extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  }

  render () {
    const {
      history
    } = this.props;

    return (
      <ConnectedRouter history={history} >
        <Route render={({location}) => {
          return <Layout location={location} />
        }}/>
      </ConnectedRouter>
    ) ;
  }
}

export default App;
