// Libraries
import React, {Component, PropTypes} from 'react';

// Components
import SidebarMessageListItem from 'universal/components/SidebarMessageListItem/SidebarMessageListItem.js';

import {
  messageList
} from './sidebar-message-list.less';

class SidebarMessageList extends Component {
  static PropTypes = {
    selected: PropTypes.string,
    messages: PropTypes.array.isRequired
  };

  render () {
    const {
      selected,
      messages
    } = this.props;

    let listItems = this._getList(messages, selected);

    return (
      <ul className={messageList}>
        {listItems}
      </ul>
    );
  }

  _getList = (messages, selected) => {
    let list = [];
    for (var i = 0; i < messages.length; i++) {
      let message = messages[i];
      let highlighted = selected === message.id;
      list.push(
        <SidebarMessageListItem key={i} message={message} highlighted={highlighted} />
      );
    }

    return list;
  }
}

export default SidebarMessageList;
