import Immutable from 'immutable';
import {replace} from 'react-router-redux';

// API
import {POSTLogin} from 'universal/api/api.js';

const AUTH_LOGGING_IN  = 'AUTH_LOGGING_IN';
const AUTH_LOGIN_ERROR = 'AUTH_LOGIN_ERROR';
const AUTH_LOGIN_SUCCESS  = 'AUTH_LOGIN_SUCCESS';

const initalState = Immutable.fromJS({
  user: {},
  error: '',
  token: '',
  loggingIn: false
});

export default function reducer (state = initalState, action) {
  switch(action.type) {
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

    dispatch(replace('/'));
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
