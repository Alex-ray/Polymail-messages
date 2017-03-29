import React, {Component} from 'react';
import { BrowserRouter } from 'react-router-dom';

// Components
import Layout from 'universal/routes/Layout.js';

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    ) ;
  }
}

export default App;
