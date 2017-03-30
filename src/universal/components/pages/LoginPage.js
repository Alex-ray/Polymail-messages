import React, {Component, PropTypes} from 'react';

import {LoginForm} from 'universal/components/forms/LoginForm.js';

class LoginPage extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired
  }

  render () {
    const {
      login
    } = this.props;

    return (
      <aside>
        <LoginForm onSubmit={login}/>
      </aside>
    );
  }
}

export {LoginPage};
