// Libraries
import React, {Component, PropTypes} from 'react';

import ThreadHeader from 'universal/components/ThreadHeader/ThreadHeader.js';
import ThreadBody   from 'universal/components/ThreadBody/ThreadBody.js';
import ThreadReply  from 'universal/components/ThreadReply/ThreadReply.js';

import {
  loading
} from 'universal/styles/loading.less';

import {
  threadContainer
} from 'universal/styles/layout.less';

function Loading () {
  return (
    <h1 className={loading}>Loading...</h1>
  );
}

class Thread extends Component {
  static propTypes = {
    message: PropTypes.object.isRequired,
    reply: PropTypes.func.isRequired
  };

  render () {
    const {
      message,
      reply,
      location
    } = this.props;

    const isLoading = message.id ? false : true;

    return (
        <section className={threadContainer}>
          {isLoading && <Loading />}
          {!isLoading && (
            <div>
              <ThreadHeader message={message} />
              <ThreadBody message={message} />
              <ThreadReply messageId={message.id} reply={reply} />
            </div>
          )}
        </section>
    );
  }
}

export default Thread;
