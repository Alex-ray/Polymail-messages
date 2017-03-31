import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

// Components
import Thread from 'universal/components/Thread/Thread.js';

// Actions
import {
  fetchMessages
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
    fetchMessages: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.fetchMessages();
  }

  render (){
    const {
      message
    } = this.props;
    
    return (
      <div className={mainLayout}>
        <Thread message={message} />
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
    fetchMessages: fetchMessages(dispatch)
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return Object.assign(stateProps, ownProps, {
    fetchMessages: () => dispatchProps.fetchMessages(stateProps.authToken)
  });
}

export default ThreadContainer;
