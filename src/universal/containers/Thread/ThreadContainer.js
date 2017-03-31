import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

// Components
import Thread from 'universal/components/Thread/Thread.js';

// Actions
import {
  fetchMessages,
  postReply
} from 'universal/ducks/messages.js';

// Styles
import {
  mainLayoutContainer,
  mainLayout
} from 'universal/styles/layout.less';

@connect(mapStateToProps, mapDispatchToProps, mergeProps)
class ThreadContainer extends Component {
  static propTypes = {
    message: PropTypes.object.isRequired,
    fetchMessages: PropTypes.func.isRequired,
    reply: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.fetchMessages();
  }

  render (){
    const {
      message ,
      reply
    } = this.props;

    return (
      <div className={mainLayout}>
        <Thread message={message} reply={reply}/>
      </div>
    );
  }
}

function mapStateToProps (state, ownProps) {
  let messages = state.messages.get('messages').toJS();
  let list = state.messages.get('messageList').toJS();

  const {
    match: {
      params
    }
  } = ownProps;

  return {
    authToken: state.auth.get('token'),
    message: messages[params.id] || {}
  };
}

function mapDispatchToProps (dispatch) {
  return  {
    reply: postReply(dispatch),
    fetchMessages: fetchMessages(dispatch)
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return Object.assign(stateProps, ownProps, {
    reply: (messageId, text) => dispatchProps.reply(messageId, text, stateProps.authToken),
    fetchMessages: () => dispatchProps.fetchMessages(stateProps.authToken)
  });
}

export default ThreadContainer;
