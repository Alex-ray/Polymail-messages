import http    from 'http';
import express from 'express';
import colors  from 'colors';
import path    from 'path';

import cookieParser from 'cookie-parser';
import bodyParser   from 'body-parser';
import session      from 'express-session';

// Server Side Rendering
import {
  renderPage,
  renderDevPage
} from './ssr';

import {
  findUserByEmail,
  authenticateUser,
  serializeUser,
  deserializeUser
} from '../db/users.js';

import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';

const PROD = process.env.NODE_ENV === 'production';

const app = express();

// Middleware
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));
app.use(passport.initialize());
app.use(passport.session());

// Passport config
passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

// Authentication Routes
app.post('/login', passport.authenticate('local'),  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
      res.status(200).json({user: req.user});
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

// Production settings
if (PROD) {
  app.use('/static', express.static('build'));

  app.get('*', renderPage);
// Development settings
} else if (!PROD) {
  const jsonServer = require('json-server');
  const HMR = require('./hmr.js');
  const mockDataPath = path.join(__dirname, '../db/db.json');
  const MockServer = jsonServer.router(mockDataPath);

  HMR(app);
  // app.use(jsonServer.defaults());
  app.use('/api', (req, res, next) => {
    if (req.user) { // add your authorization logic here
     next() // continue to JSON Server router
   } else {
     res.sendStatus(401)
   }
  });
  app.use('/api', MockServer);
  app.get('*', renderDevPage);
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        console.error('error : ', err)
        res.status(err.status || 500);
        // res.render('error', {
        //     message: err.message,
        //     error: err
        // });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  console.error('error : ', err.message)
    res.status(err.status || 500);
    // res.render('error', {
    //     message: err.message,
    //     error: {}
    // });
});


const server = http.createServer(app);

server.listen(8080, function() {
   const address = server.address();
   console.log(`${'>>>'.cyan} ${'Listening on:'.rainbow} ${'localhost::'.trap.magenta}${`${address.port}`.green}`);
 });


module.exports = server; // for testing
