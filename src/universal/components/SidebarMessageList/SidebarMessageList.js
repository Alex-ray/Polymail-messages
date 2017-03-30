// Libraries
import React, {Component, PropTypes} from 'react';

// Components
import SidebarMessageListItem from 'universal/components/SidebarMessageListItem/SidebarMessageListItem.js';

import {
  messageList
} from './sidebar-message-list.less';

class SidebarMessageList extends Component {
  static PropTypes = {
    messages: PropTypes.array.isRequired
  };

  render () {
    const {
      messages
    } = this.props;

    let listItems = this._getList(messages);

    return (
      <ul className={messageList}>
        {listItems}
      </ul>
    );
  }

  _getList = (messages) => {
    let list = [];
    for (var i = 0; i < messages.length; i++) {
      let message = messages[i];
      list.push(
        <SidebarMessageListItem key={i} messages={message.messages} />
      );
    }

    return list;
  }
}

export default SidebarMessageList;
