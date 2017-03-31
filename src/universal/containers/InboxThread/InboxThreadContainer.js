import React, {Component, PropTypes} from 'react';

import {connect} from 'react-redux';

// Components
import Sidebar from 'universal/components/Sidebar/Sidebar.js';

// Actions
import {
  fetchMessages,
  buildMessageList
} from 'universal/ducks/messages.js';

// Styles
import {
  mainLayoutContainer,
  mainLayout
} from 'universal/styles/layout.less';

@connect(mapStateToProps, mapDispatchToProps, mergeProps)
class InboxThreadContainer extends Component {
  static propTypes = {
    messageDictionary: PropTypes.object.isRequired,
    messages: PropTypes.array.isRequired
  }

  componentDidMount() {
    this.props.fetchMessages();
  }

  render () {
    const {
      messages,
      messageDictionary,
      match: {
        params
      }
    } = this.props;

    let message = messageDictionary[params.id] || {};

    return (
      <div className={mainLayoutContainer}>
        <Sidebar messages={messages}/>
            <div className={mainLayout}>
              <Thread message={message} />
            </div>
      </div>
    );
  }
}

function mapStateToProps (state, ownProps) {
  let messages = state.messages.get('messages').toJS();
  let list = state.messages.get('messageList').toJS();

  return {
    authToken: state.auth.get('token'),
    messageDictionary: messages,
    messages: buildMessageList(messages, list)
  };
}

function mapDispatchToProps (dispatch) {
  return  {
    fetchMessages: fetchMessages(dispatch)
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return Object.assign(stateProps, ownProps, {
    fetchMessages: () => dispatchProps.fetchMessages(stateProps.authToken)
  });
}

export default InboxThreadContainer;
