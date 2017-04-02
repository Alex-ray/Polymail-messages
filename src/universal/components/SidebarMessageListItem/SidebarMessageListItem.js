// Libraries
import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import moment from 'moment';
import Dotdotdot from 'react-dotdotdot';
import { NavLink } from 'react-router-dom';

// Utils
import {
  getMessageSender,
  getReciepientCount,
  hasUnreadMessages
} from 'universal/utils/messages.js';

// Components
import ActiveMarker from 'universal/components/ActiveMarker/ActiveMarker.js';

// Styles
import {
  container,
  containerLink,
  highlightedContainer,
  sidebarMarker,
  bodyContainer,
  subheaderInfo
} from './sidebar-message-list-item.less';

import {
  subheaderType,
  subjectType,
  bodyType
} from 'universal/styles/typography.less';

class SidebarMessageListItem extends Component {
  static PropTypes = {
    highlighted: PropTypes.bool.isRequired,
    message: PropTypes.object.isRequired
  };

  render () {
    const {
      highlighted,
      message: {
        messages,
        id
      }
    } = this.props;

    // these need to be moved into compoentDidUpdate and be set in state
    const from = getMessageSender(messages);
    const toCount = getReciepientCount(messages);
    const unreadMessages = hasUnreadMessages(messages);

    const date = moment(messages[0].sent).format('h:MM a');

    const title = messages[messages.length-1].subject;
    const body  = messages[0].body;

    const activeMarker = unreadMessages ? <ActiveMarker className={sidebarMarker} /> : null;

    return (
        <li className={container}>
          <NavLink to={`/thread/${id}`} className={containerLink} activeClassName={highlightedContainer}>
            <h4 className={subheaderType}>{from} to {toCount.length} others</h4>
            <span className={subheaderInfo}> {messages.length} &middot; {date}</span>
            <h3 className={subjectType}>{title}</h3>
            <Dotdotdot clamp={2} className={classNames(bodyType, bodyContainer)} >
              <div dangerouslySetInnerHTML={{__html: body}}></div>
            </Dotdotdot>
            {activeMarker}
          </NavLink>
        </li>
    )
  }
}

export default SidebarMessageListItem;
