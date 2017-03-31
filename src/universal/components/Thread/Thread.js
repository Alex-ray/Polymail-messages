// Libraries
import React, {Component, PropTypes} from 'react';

import {
  threadHeader,
  threadSubject,
  threadParticipants
} from './thread.less';

function Loading () {
  return (
    <h1>Loading</h1>
  );
}

function MessageThread (props) {
  const {
    message: {
      messages
    }
  } = props;

  const subject = messages[0].subject;

  return (
    <div>
      <header className={threadHeader}>
        <h1 className={threadSubject}>{subject}</h1>
        <span className={threadParticipants}>Brandon Shin, Annie Clark and me</span>
      </header>
      <div>
      </div>
    </div>
  );
}

class Thread extends Component {
  static propTypes = {
    message: PropTypes.object.isRequired
  };

  render () {
    const {
      message
    } = this.props;

    console.log(message);

    // const subject = message.messages[0].subject;

    const isLoading = message.id ? false : true;


    return (
      <section>
        {isLoading && <Loading />}
        {!isLoading && <MessageThread message={message}/>}
      </section>
    );
  }
}

export default Thread;
