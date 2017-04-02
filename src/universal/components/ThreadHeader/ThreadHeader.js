// Libraries
import React, {Component, PropTypes} from 'react';

// Utils
import {
  getParticipants
} from 'universal/utils/messages.js';

// Styles
import {
  threadHeader,
  threadSubject,
  threadParticipants
} from './thread-header.less';

class ThreadHeader extends Component {
  static propTypes = {
    message: PropTypes.object.isRequired
  };

  render() {
    const {
      message
    } = this.props;

    let subject = message.messages[message.messages.length-1].subject;
    let participants = getParticipants(message.messages).join(', ');

    return (
      <header className={threadHeader}>
        <h1 className={threadSubject}>{subject}</h1>
        <span className={threadParticipants}>{participants} and me</span>
      </header>
    );
  }
}


export default ThreadHeader;
