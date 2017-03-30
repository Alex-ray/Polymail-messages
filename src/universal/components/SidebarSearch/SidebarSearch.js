import React, {Component, PropTypes} from 'react';

import {
  sidebarSearchLayout
} from 'universal/styles/layout.less';

import {
  searchInput
} from 'universal/styles/forms.less';

class SidebarSearch extends Component {
  render () {
    return (
      <form className={sidebarSearchLayout}>
        <input className={searchInput} type='text' value="Search" />
      </form>
    );
  }
}

export default SidebarSearch;
