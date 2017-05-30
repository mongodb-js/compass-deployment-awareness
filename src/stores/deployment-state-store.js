const Reflux = require('reflux');
const StateMixin = require('reflux-state-mixin');
const DeploymentAwarenessStore = require('./index');
const ServerType = require('../models/server-type');
const TopologyType = require('../models/topology-type');

/**
 * The default description.
 */
const DEFAULT_DESCRIPTION = 'Topology type not yet discovered.';

/**
 * Deployment State store.
 */
const DeploymentStateStore = Reflux.createStore({
  /**
   * adds a state to the store, similar to React.Component's state
   * @see https://github.com/yonatanmn/Super-Simple-Flux#reflux-state-mixin
   *
   * If you call `this.setState({...})` this will cause the store to trigger
   * and push down its state as props to connected components.
   */
  mixins: [StateMixin.store],

  /**
   * Initialize by listening to topology changes.
   */
  init() {
    DeploymentAwarenessStore.listen(this.topologyChanged.bind(this));
  },

  /**
   * Looks at the topology description and determines if Compass is in a
   * writable state.
   *
   * @param {Object} description - The topology description.
   */
  topologyChanged(description) {
    const topologyType = description.topologyType;
    if (TopologyType.isWritable(topologyType)) {
      if (topologyType === TopologyType.SINGLE) {
        const serverType = description.servers[0].type;
        const serverWritable = ServerType.isWritable(serverType);
        const message = serverWritable ? 'is writable' : 'is not writable';
        this.setState({
          isWritable: serverWritable,
          description: `Topology type ${topologyType} with server type ${serverType} ${message}.`
        });
      } else {
        this.setState({
          isWritable: true,
          description: `Topology type ${topologyType} is writable.`
        });
      }
    } else {
      this.setState({
        isWritable: false,
        description: `Topology type ${topologyType} is not writable.`
      });
    }
  },

  /**
   * Initialize the Deployment State store state. The returned object must
   * contain all keys that you might want to modify with this.setState().
   *
   * @return {Object} initial store state.
   */
  getInitialState() {
    return {
      isWritable: false,
      description: DEFAULT_DESCRIPTION
    };
  }
});

module.exports = DeploymentStateStore;