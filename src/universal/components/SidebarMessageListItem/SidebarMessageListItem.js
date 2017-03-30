// Libraries
import React, {Component, PropTypes} from 'react';
import moment from 'moment';

// Components
import ActiveMarker from 'universal/components/ActiveMarker/ActiveMarker.js';

// Styles
import {
  container,
  sidebarMarker
} from './sidebar-message-list-item.less';

import {
  subheaderType,
  subjectType,
  bodyType
} from 'universal/styles/typography.less';

class SidebarMessageListItem extends Component {
  static PropTypes = {
    messages: PropTypes.array.isRequired
  };

  render () {
    const {
      messages
    } = this.props;

    // these need to be moved into compoentDidUpdate and be set in state
    const from = this._getFromName(messages[0]);
    const toCount = this._getToCount(messages);
    const unreadMessages = this._hasUnreadMessages(messages);

    const date = moment(messages[0].sent).format('h:MM a');

    const title = messages[0].subject;
    const body  = messages[0].body;

    return (
      <li className={container}>
        {unreadMessages && <ActiveMarker className={sidebarMarker} />}
        <span className={subheaderType}>{from} to {toCount.length} others</span>
        <span className={subheaderType}> {messages.length} &middot; {date}</span>
        <h3 className={subjectType}>{title}</h3>
        <div className={bodyType} dangerouslySetInnerHTML={{__html: body}} />
      </li>
    )
  }

  _getToCount (messages) {
    let toList = [];

    for (var i = 0; i < messages.length; i++) {
      let message = messages[i];
      for (var j = 0; j < message.to.length; j++) {
        let to = message.to[j];
        if (toList.indexOf(to) === -1) {
          toList.push(to);
        }
      }
    }

    return toList;
  }

  _getFromName (message) {
    return  message.from.split(' ')[0];
  }

  _hasUnreadMessages (messages) {
    for (var i = 0; i < messages.length; i++) {
      let message = messages[i];
      if (!message.read) {
        return true;
      }
    }

    return false;
  }

}

export default SidebarMessageListItem;
