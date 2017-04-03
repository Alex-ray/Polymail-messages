// Libraries
import React, {Component, PropTypes} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Loading from 'react-loading';

import ThreadHeader from 'universal/components/ThreadHeader/ThreadHeader.js';
import ThreadBody   from 'universal/components/ThreadBody/ThreadBody.js';
import ThreadReply  from 'universal/components/ThreadReply/ThreadReply.js';

import {
  transitionNames
} from 'universal/animations/fade.js';

import {
  loading
} from 'universal/styles/loading.less';

import {
  threadContainer
} from 'universal/styles/layout.less';


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
          {isLoading && <div className={loading}><Loading type='bubbles' color='#4a4a4a' /></div>}
          {!isLoading && (
            <div>
              <ReactCSSTransitionGroup
                component={'div'}
                transitionName={transitionNames}
                transitionAppear={true}
                transitionLeave={false}
                transitionEnterTimeout={0}
                transitionAppearTimeout={0}
              >
                <ThreadHeader message={message} />
                <ThreadBody message={message} />
              </ReactCSSTransitionGroup>
              <ThreadReply messageId={message.id} reply={reply} />
            </div>
          )}
        </section>
    );
  }
}

export default Thread;
