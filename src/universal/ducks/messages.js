import Immutable from 'immutable';
import {replace} from 'react-router-redux';

// API
import {GETThreads} from 'universal/api/api.js';

let FETCHED = false;

export const MESSAGES_ADD_MESSAGE = "MESSAGES_ADD_MESSAGE";
export const MESSAGES_ADD_LIST    = "MESSAGES_ADD_LIST";
export const MESSAGES_ERROR       = "MESSAGES_ERROR";
export const MESSAGES_SUCCESS     = "MESSAGES_SUCCESS";
export const MESSAGES_FETCHING    = "MESSAGES_FETCHING";

const initalState = Immutable.fromJS({
  messages: {},
  messageList: [],
  error: '',
  fetching: false,
});

export default function reducer (state = initalState, action) {
  let stateJS = state.toJS();
  switch(action.type) {
    case MESSAGES_ADD_LIST:
      let newList = stateJS.messageList.concat(action.list);
      return state.merge({
        messageList: newList
      });
    case MESSAGES_ADD_MESSAGE:
      stateJS.messages[action.message.id] = action.message;
      return state.merge({
        messages: stateJS.messages
      });
    case MESSAGES_SUCCESS:
      return state.merge({
        fetching: false,
        error: ''
      });
    case MESSAGES_FETCHING:
      return state.merge({
        fetching: true,
        error: ''
      });
    case MESSAGES_ERROR:
      return state.merge({
        fetching: false,
        error: action.error
      });
    default:
      return state;
  }
} ;

export const addMessages = (dispatch) => {
  return (messages, messageList = []) => {

    for (var i = 0; i < messages.length; i++) {
      let message = messages[i];

      dispatch({
        type: MESSAGES_ADD_MESSAGE,
        message: message
      });

      messageList.push(message.id);
    }

    dispatch({
      type: MESSAGES_ADD_LIST,
      list: messageList
    });
  }
}

export const fetchMessages = (dispatch) =>  {
  return (authToken) => {

    if (!FETCHED) {
      dispatch({type: MESSAGES_FETCHING});

      GETThreads(authToken).then((messages) => {
        FETCHED = true;
        addMessages(dispatch)(messages);
      }).catch((error) => {
        dispatch({
          type: MESSAGES_ERROR,
          error: error.message
        })
      });
    }
  };
}


// Transformers

export const buildMessageList = (messages, messageIds) => {
  let messageList = [];
  for (var i = 0; i < messageIds.length; i++) {
    let messageId = messageIds[i];
    messageList.push(messages[messageId]);
  }

  return messageList;
}
