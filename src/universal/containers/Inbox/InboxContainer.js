// Libraries
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router';

// Components
import Sidebar from 'universal/components/Sidebar/Sidebar.js';
import * as Routes from 'universal/routes/index.js';

// Actions
import {
  fetchMessages,
  buildMessageList
} from 'universal/ducks/messages.js';

// Styles
import {
  mainLayoutContainer
} from 'universal/styles/layout.less';

@connect(mapStateToProps, mapDispatchToProps, mergeProps)
class InboxContainer extends Component {
  static PropTypes = {
    messages: PropTypes.array.isRequired,
    fetchMessages: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.fetchMessages();
  }

  render () {
    const { messages } = this.props;

    return (
      <section className={mainLayoutContainer}>
        <Sidebar messages={messages} />
        <Route exact path='/thread/:id' component={Routes.Thread} />
      </section>
    );
  }
}

function mapStateToProps (state) {
  let messages = state.messages.get('messages').toJS();
  let list = state.messages.get('messageList').toJS();
  return {
    authToken: state.auth.get('token'),
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
export default InboxContainer;
