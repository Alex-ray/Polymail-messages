import React, {Component, PropTypes} from 'react';
import moment from 'moment';

import {
  threadHeader,
  threadFromType,
  threadDateType,
  threadToType,
  threadBodyType
} from './thread-body-message.less';

class ThreadBodyMessage extends Component {
  static propType = {
    message: PropTypes.object.isRequired
  }

  render () {
    const {
      _messageReciepients,
      props: {
        message
      }
    } = this;

    let reciepients = _messageReciepients(message.to);

    let from = message.from.split(' ')[0];

    let today = moment(new Date());
    let sent  = moment(new Date(message.sent));
    let isToday = sent.isSame(today, 'day');

    let date = isToday ? sent.format('h:mm a') : sent.format('MMM Do');

    return (
      <section>
        <header className={threadHeader}>
          <h2 className={threadFromType}>{from}</h2>
          <span className={threadDateType}>{date}</span>
          <h3 className={threadToType}>to {reciepients} & Me</h3>
        </header>
        <div className={threadBodyType} dangerouslySetInnerHTML={{__html: message.body}}></div>
      </section>
    );
  }

  _messageReciepients (to) {
    let reciepients = [];

    for (var i = 0; i < to.length; i++) {
      let name = to[i].split(' ')[0];
      reciepients.push(name);
    }

    return reciepients;
  }
}

export default ThreadBodyMessage;
