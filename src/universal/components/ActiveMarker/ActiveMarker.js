// Libraries
import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

// Styles
import {
  marker
} from './active-marker.less';

class ActiveMarker extends Component {
  render () {
    return (
      <i className={classNames(marker, this.props.className)}></i>
    );
  }
}

export default ActiveMarker;
