// Libraries
import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

// Components
import {LoginForm} from 'universal/components/forms/LoginForm.js';

// Styles
import {
  cardHover
} from 'universal/styles/card.less';

import {
  formError
} from 'universal/styles/forms.less';

import {
  centerVerticalHorizontal,
  textCenter
} from 'universal/styles/layout.less';

import {
  border
} from 'universal/components/pages/LoginPage/login-page.less';

class LoginPage extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    error: PropTypes.string,
    loading: PropTypes.bool
  }

  render () {
    const {
      login,
      error,
      loading
    } = this.props;

    return (
      <div className={centerVerticalHorizontal}>
        <aside className={classNames(cardHover, textCenter)}>
          <img style={{width: '100px', height: '58px'}} src='https://cdn.zeplin.io/58c06bc85b0c991c71d514fe/assets/9639F48C-2A25-4C19-870D-8A196E773964.png' />
          <i className={border}></i>
          {error.length > 1 && <span className={formError}>{error}</span>}
          <LoginForm onSubmit={login} loading={loading}/>
        </aside>
      </div>
    );
  }
}

export {LoginPage};
