import fs from 'fs';
import path from 'path';

export const findUserById = function(id, cb) {
  var records = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8')).users;

  var idx = id - 1;
  if (records[idx]) {
    cb(null, records[idx]);
  } else {
    cb(new Error('User ' + id + ' does not exist'));
  }
}

export const findUserByEmail = function(email, cb) {
  var records = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8')).users;

  for (var i = 0, len = records.length; i < len; i++) {
    var record = records[i];
    if (record.email === email) {
      return cb(null, record);
    }
  }
  return cb(null, null);
}

export const authenticateUser = function(email, password, done) {
  findUserByEmail(email, (err, user) => {
    if (!user) {
      done(null, false, {message: 'Incorrect email address'});
    } else if (user.password !== password) {
      done(null, false, {message: 'Incorrect username or password'});
    } else if (user.password === password) {
      done(null, user);
    }
  });
}

export const serializeUser = function(user, done) {
  done(null, user.id);
}

export const deserializeUser = (id, done) => {
  findUserById(id, function(err, user) {
    done(err, user);
  });
}
