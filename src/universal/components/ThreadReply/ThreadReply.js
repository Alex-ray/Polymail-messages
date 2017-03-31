import React, {Component, PropTypes} from 'react';


import {
  container,
  composer,
  sumbitButton
} from './thread-reply.less';

class ThreadReply extends Component {
  static propTypes = {
    messageId: PropTypes.string.isRequired,
    reply: PropTypes.func.isRequired
  }

  render ( ) {
    return (
      <div className={container}>
        <form onSubmit={this._handleSubmit}>
          <textarea className={composer} name='reply' placeholder={'type your reply here...'} />
          <input className={sumbitButton} type='submit' />
        </form>
      </div>
    );
  }

  _handleSubmit = (event) => {
    const {
      messageId,
      reply
    } = this.props;

    event.stopPropagation();
    event.preventDefault();
    // BOOG: This needs to be sanatized and is not ready for production
    // I would use this battle tested text editor https://github.com/facebook/draft-js
    let text = event.target.querySelector('textarea[name="reply"]').value;
    reply(messageId, text);
  }

}

export default ThreadReply;
