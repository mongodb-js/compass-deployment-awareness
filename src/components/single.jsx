import React from 'react';
import PropTypes from 'prop-types';
import { humanize } from 'models/server-type';

/**
 * The single component.
 */
class Single extends React.Component {
  static displayName = 'Single';

  static propTypes = {
    server: PropTypes.object.isRequired
  }

  /**
   * Render single component.
   *
   * @returns {React.Component} The rendered component.
   */
  render() {
    return (
      <div className="topology-single">
        <div className="topology-single-address">
          {this.props.server.address}
        </div>
        <div className="topology-single-type">
          {humanize(this.props.server.type)}
        </div>
      </div>
    );
  }
}

export default Single;
