// Node Modules
import fs from 'fs';
import {basename, join} from 'path';

// Libraries
import React from 'react';
import {renderToString} from 'react-dom/server'

// Redux
// import {push} from 'react-router-redux';
// import createStore from '../universal/redux/createStore.js';

// Components
import Html from './Html.js';

function renderApp(url, res, store, assets) {
  const context = {};

  const html = renderToString(
    <Html
      title='💥'
      store={store}
      url={url}
      context={context}
      assets={assets} />
  );

  if (context.url) {
    res.writeHead(302, {
      Location: context.url
    });

    res.end();
  } else {
    res.send('<!DOCTYPE html>'+html);
  }
}

export const renderPage = (req, res) => {
  const store = {};// createStore( );
  const assets = require('../../build/assets.json');

  assets.manifest.text = fs.readFileSync(
    join(__dirname, '..', '..', 'build', basename(assets.manifest.js)),
    'utf-8'
  );

  renderApp(req.url, res, store, assets);
};

export const renderDevPage = (req, res) => {
  const store = {};// createStore( );
  renderApp(req.url, res, store);
};

export default renderPage;