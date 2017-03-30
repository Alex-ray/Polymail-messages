import React, {Component, PropTypes} from 'react';

class LoginForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func
  }

  render ( ) {
    return (
      <form action="/login" method="post" onSubmit={this._handleSubmit}>
        <div>
            <label>email:</label>
            <input type="text" name="email"/>
        </div>
        <div>
            <label>Password:</label>
            <input type="password" name="password"/>
        </div>
        <div>
            <input type="submit" value="Log In"/>
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
