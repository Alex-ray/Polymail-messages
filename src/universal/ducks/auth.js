import Immutable from 'immutable';
import {go} from 'react-router-redux';

// API
import {POSTLogin} from 'universal/api/api.js';

const AUTH_LOGGING_IN  = 'AUTH_LOGGING_IN';
const AUTH_LOGIN_ERROR = 'AUTH_LOGIN_ERROR';
const AUTH_LOGIN_SUCCESS  = 'AUTH_LOGIN_SUCCESS';
const AUTH_LOGOUT         = 'AUTH_LOGOUT';

const AUTH_TOKEN_KEY = 'AUTH_TOKEN_KEY';

let token = '';

const HAS_LOCAL_STORAGE = typeof localStorage !== 'undefined';

if (HAS_LOCAL_STORAGE) {
   token = localStorage.getItem(AUTH_TOKEN_KEY) || '';
}

const initalState = Immutable.fromJS({
  user: {},
  error: '',
  token: token,
  loggingIn: false
});

export default function reducer (state = initalState, action) {
  switch(action.type) {
    case AUTH_LOGOUT:
      return state.merge({
        loggingIn: false,
        error: '',
        token: '',
      });
    case AUTH_LOGGING_IN:
      return state.merge({
        loggingIn: true,
        error: ''
      });
    case AUTH_LOGIN_SUCCESS:
      return state.merge({
        loggingIn: false,
        error: '',
        token: action.token
      });
    case AUTH_LOGIN_ERROR:
      return state.merge({
        loggingIn: false,
        error: action.error
      });
    default:
      return state;
  }
} ;


export const loginSuccess = (dispatch) => {
  return ({token}) => {
    dispatch({
      type: AUTH_LOGIN_SUCCESS,
      token: token
    });

    if (HAS_LOCAL_STORAGE) {
      localStorage.setItem(AUTH_TOKEN_KEY, token);
    }

    dispatch(go('/threads'));
  } ;
}

export const loginError = (dispatch) => {
  return (error) => {
    dispatch({
      type: AUTH_LOGIN_ERROR,
      error: error.message
    });
  };
}


export const login = (dispatch) => {
  return ({email, password}) => {
    dispatch({type: AUTH_LOGGING_IN});

    POSTLogin({email, password}).then((response) => {
      loginSuccess(dispatch)(response);
    }).catch((error) => {
      if (error.response && error.response.status === 400) {
        error.message = 'Wrong email or password!';
      }
      loginError(dispatch)(error);
    })
  };
}

export const logout = (dispatch) => {
  return () => {
    if (HAS_LOCAL_STORAGE) {
      localStorage.setItem(AUTH_TOKEN_KEY, '');
    }
    dispatch({type: AUTH_LOGOUT});
    dispatch(replace('/login'));
  }
}
