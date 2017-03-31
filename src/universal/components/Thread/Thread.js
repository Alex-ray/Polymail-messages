// Libraries
import React, {Component, PropTypes} from 'react';

import ThreadHeader from 'universal/components/ThreadHeader/ThreadHeader.js';
import ThreadBody   from 'universal/components/ThreadBody/ThreadBody.js';

function Loading () {
  return (
    <h1>Loading</h1>
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

    const isLoading = message.id ? false : true;

    return (
      <section>
        {isLoading && <Loading />}
        {!isLoading && (
          <div>
            <ThreadHeader message={message} />
            <ThreadBody message={message} />
          </div>
        )}
      </section>
    );
  }
}

export default Thread;
