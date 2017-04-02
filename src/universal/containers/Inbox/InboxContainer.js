// Libraries
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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


import {transitionNames} from 'universal/animations/fade.js';

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
    const {
      messages,
      location
     } = this.props;

    return (
      <section className={mainLayoutContainer}>
        <Sidebar messages={messages} />
        <ReactCSSTransitionGroup
          className={mainLayout}
          component={'div'}
          transitionName={transitionNames}
          transitionEnterTimeout={250}
          transitionLeaveTimeout={0}
        >
          <Route location={location} key={location.key} exact path='/thread/:id' component={Routes.Thread} />
        </ReactCSSTransitionGroup>
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
