import React, {Component, PropTypes} from 'react';

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

    let subject = message.messages[0].subject;

    let participants = this._getParticipants(message.messages).join(', ');


    return (
      <header className={threadHeader}>
        <h1 className={threadSubject}>{subject}</h1>
        <span className={threadParticipants}>{participants} and me</span>
      </header>
    );
  }

  _getParticipants (messages) {
    let participants = [];

    for (var i = 0; i < messages.length; i++) {
      let message = messages[i];
      let from = message.from.split(' ')[0];

      if (participants.indexOf(from) === -1) {
        participants.push(from);
      }
    }

    return participants;
  }
}


export default ThreadHeader;
