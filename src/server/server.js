import http    from 'http';
import express from 'express';
import colors  from 'colors';

// Server Side Rendering
import {
  renderPage,
  renderDevPage
} from './ssr';

const PROD = process.env.NODE_ENV === 'production';

const app = express();

// Production settings
if (PROD) {

  app.use('/static', express.static('build'));

  app.get('*', renderPage);

// Development settings
} else if (!PROD) {
  const webpack  = require('webpack');
  const devWebpackConfig = require('../../webpack/webpack.config.development.js');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');

  const compiler = webpack(devWebpackConfig);

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    hot: true,
    publicPath: devWebpackConfig.output.publicPath
  }));

  app.use(webpackHotMiddleware(compiler, {
    log: console.log,
    reload: true
  }));

  app.get('*', renderDevPage);
}

const server = http.createServer(app);

server.listen(8080, function() {
   const address = server.address();
   console.log(`${'>>>'.cyan} ${'Listening on:'.rainbow} ${'localhost::'.trap.magenta}${`${address.port}`.green}`);
 });
