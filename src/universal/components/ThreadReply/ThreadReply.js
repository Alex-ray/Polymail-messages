import React, {Component, PropTypes} from 'react';

import clipImage from 'universal/../images/clip.png';
import clipImage2x from 'universal/../images/clip@2x.png';
import clipImage3x from 'universal/../images/clip@3x.png';

import trashIcon   from 'universal/../images/trash-icon-dark.png';
import trashIcon2x from 'universal/../images/trash-icon-dark@2x.png';
import trashIcon3x from 'universal/../images/trash-icon-dark@3x.png';

import {
  container,
  composer,
  sumbitButton,
  icon
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
          <img src={trashIcon} srcSet={`${trashIcon2x} 2x, ${trashIcon3x} 3x`} className={icon} />
          <img src={clipImage} srcSet={`${clipImage2x} 2x, ${clipImage3x} 3x`} className={icon} />
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
