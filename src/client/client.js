import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';

// Components
import App from './containers/App.js';

// Redux
import { Provider } from 'react-redux';
import createStore from '../universal/redux/createStore.js';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();
const store = createStore(history);

render(
  <AppContainer>
    <Provider store={store}>
      <App />
    </Provider>
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
