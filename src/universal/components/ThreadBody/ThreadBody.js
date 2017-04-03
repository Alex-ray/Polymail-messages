// Libraries
import React, {Component, PropTypes} from 'react';

// Components
import ThreadBodyMessage from 'universal/components/ThreadBodyMessage/ThreadBodyMessage.js';

class ThreadBody extends Component {
  static propTypes = {
    message: PropTypes.object.isRequired
  };

  render () {
    const {
      _getMessages,
      props: {
        message
      }
    } = this;

    let messageList = _getMessages(message.messages);

    return (
      <div>
        {messageList}
      </div>
    );
  }

  _getMessages(messages) {
    let list = [];

    for (var i = 0; i < messages.length; i++) {
      list.push(<ThreadBodyMessage key={i} message={messages[i]} />);
    }

    return list;
  }
}

export default ThreadBody;
