import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

import {
  titleType
} from 'universal/styles/typography.less';

import {
  sidebarTitleLayout
} from 'universal/styles/layout.less';

class SidebarTitle extends Component {
  render () {
    const {
      title
    } = this.props;

    return (
      <h2 className={classNames(titleType, sidebarTitleLayout)}>{title}</h2>
    );
  }
}

export default SidebarTitle;
