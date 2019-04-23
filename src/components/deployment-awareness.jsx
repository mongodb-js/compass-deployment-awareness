import React from 'react';
import PropTypes from 'prop-types';
import TopologyType from 'models/topology-type';
import Single from 'components/single';
import Sharded from 'components/sharded';
import ReplicaSet from 'components/replica-set';
import Unknown from 'components/unknown';

/**
 * The deployment awareness component.
 */
class DeploymentAwarenessComponent extends React.Component {
  static displayName = 'DeploymentAwarenessComponent';

  static propTypes = {
    servers: PropTypes.array,
    setName: PropTypes.string,
    topologyType: PropTypes.string
  }

  /**
   * Renders the topology information.
   *
   * @returns {React.Component} The component.
   */
  renderTopologyInfo() {
    switch (this.props.topologyType) {
      case TopologyType.SINGLE:
        return (<Single server={this.props.servers[0]} />);
      case TopologyType.SHARDED:
        return (<Sharded servers={this.props.servers} />);
      case TopologyType.REPLICA_SET_NO_PRIMARY:
      case TopologyType.REPLICA_SET_WITH_PRIMARY:
        return (<ReplicaSet {...this.props} />);
      default:
        return (<Unknown servers={this.props.servers} />);
    }
  }

  /**
   * Render DeploymentAwareness component.
   *
   * @returns {React.Component} The rendered component.
   */
  render() {
    return (
      <div className="topology">
        {this.renderTopologyInfo()}
      </div>
    );
  }
}

export default DeploymentAwarenessComponent;
