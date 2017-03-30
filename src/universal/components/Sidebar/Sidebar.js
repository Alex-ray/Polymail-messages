// Libraries
import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

// Components
import SidebarSearch from 'universal/components/SidebarSearch/SidebarSearch.js';
import SidebarTitle from 'universal/components/SidebarTitle/SidebarTitle.js';
import SidebarMessageList from 'universal/components/SidebarMessageList/SidebarMessageList.js';

// Styles
import {
  sidebarLayout
} from 'universal/styles/layout.less';

import {
  container
} from './sidebar.less';

class Sidebar extends Component {
  static propTypes = {
    messages: PropTypes.array.isRequired
  };

  render () {
    const {
      messages
    } = this.props;

    return (
      <aside className={classNames(container, sidebarLayout)}>
        <SidebarSearch />
        <SidebarTitle title='All Inboxes' />
        <SidebarMessageList messages={messages} />
      </aside>
    );
  }
}

export default Sidebar;
