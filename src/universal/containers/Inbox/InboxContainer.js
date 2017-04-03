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
  mainLayoutContainer,
  mainLayout
} from 'universal/styles/layout.less';


@connect(mapStateToProps, mapDispatchToProps, mergeProps)
class InboxContainer extends Component {
  static PropTypes = {
    messages: PropTypes.array.isRequired,
    messagesLoading: PropTypes.bool.isRequired,
    fetchMessages: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.fetchMessages();
  }

  render () {
    const {
      messages,
      location,
      messagesLoading
     } = this.props;

    return (
      <section className={mainLayoutContainer}>
        <Sidebar messages={messages} loading={messagesLoading}/>
        <div className={mainLayout}>
          <Route key={location.key} path='/thread/:id' component={Routes.Thread} exact />
        </div>
      </section>
    );
  }
}

function mapStateToProps (state) {
  let messages  = state.messages.get('messages').toJS();
  let list      = state.messages.get('messageList').toJS();
  let fetching  = state.messages.get('fetching');

  return {
    authToken: state.auth.get('token'),
    messagesLoading: fetching,
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
