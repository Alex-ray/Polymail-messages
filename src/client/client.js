import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';

// Components
import App from './containers/App.js';

render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
