import React, {Component, PropTypes} from 'react';

import {
  inputLabel,
  inputText,
  submitButton
} from 'universal/styles/forms.less';

class LoginForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    loading: PropTypes.bool
  }

  render ( ) {
    const {
      loading
    } = this.props;

    const submitValue = loading ? 'Loading...' : 'Log In';
    return (
      <form action="/login" method="post" onSubmit={this._handleSubmit}>
        <div>
            <label className={inputLabel}>Email Address</label>
            <input className={inputText} type="text" name="email" placeholder="name@company.com"/>
        </div>
        <div>
            <label className={inputLabel}>Password:</label>
            <input className={inputText} type="password" name="password" placeholder="password"/>
        </div>
        <div>
            <input className={submitButton} type="submit" value={submitValue}/>
        </div>
      </form>
    );
  }

  // Private
  _handleSubmit = (event) => {
    const { onSubmit } = this.props;

    if (onSubmit) {
      event.stopPropagation();
      event.preventDefault();
      const email = event.target.querySelector('input[name="email"]').value;
      const password = event.target.querySelector('input[name="password"]').value;

      onSubmit({email, password});
    }
  }

}

export {LoginForm};
