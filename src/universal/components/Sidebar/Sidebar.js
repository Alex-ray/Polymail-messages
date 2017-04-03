// Libraries
import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import { withRouter } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

// Components
import Loading from 'react-loading';
import SidebarSearch from 'universal/components/SidebarSearch/SidebarSearch.js';
import SidebarTitle from 'universal/components/SidebarTitle/SidebarTitle.js';
import SidebarMessageList from 'universal/components/SidebarMessageList/SidebarMessageList.js';

// Styles
import {
  sidebarLayout
} from 'universal/styles/layout.less';

import {
  container,
  loadingContainer
} from './sidebar.less';

import {
  transitionNames
} from 'universal/animations/bottomTopTranslateFade.js';

class Sidebar extends Component {
  static propTypes = {
    messages: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
  };

  render () {
    const {
      messages,
      loading,
      match: {
        params
      }
    } = this.props;

    return (
      <aside className={classNames(container, sidebarLayout)}>
        <SidebarSearch />
        <SidebarTitle title='All Inboxes' />
          {loading &&
              <div className={loadingContainer}>
                <Loading type='spinning-bubbles' color='#4a4a4a' width={'50px'} />
              </div>
          }
          <ReactCSSTransitionGroup
            component={'div'}
            transitionName={transitionNames}
            transitionAppear={true}
            transitionLeave={false}
            transitionAppearTimeout={800}
          >
            {!loading &&
              <SidebarMessageList messages={messages} selected={params.id} />
            }
          </ReactCSSTransitionGroup>
      </aside>
    );
  }
}

export default withRouter(Sidebar);
