import React from 'react';
import {BrowserRouter} from 'react-router-dom';

// Components
import RoutePaths from 'universal/routes/RoutePaths.js';

render(
  <BrowserRouter>
    <RoutePaths />
  </BrowserRouter>,
  document.getElementById('root')
);
