import { h } from 'preact'
import EvoComponent from './EvoComponent'
import State from '../managers/core/State'

import { connect } from 'preact-redux'
import { List, ListItem } from './extra-mui/list'
import log from 'loglevel'
import prefix from 'loglevel-plugin-prefix'
import prefixTemplate from '../loglevel-prefix-template'

prefix.apply(log, prefixTemplate);
const logger = log.getLogger('GeneralInfo');

class GeneralInfo extends EvoComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const logPrefix = ':render] ';
    logger.info(logPrefix, '-->');

    let stage = (
      <List>
        <ListItem label="Generation">{this.props.globals.generation}</ListItem>
        <ListItem label="Solutions">{this.props.solutions.list.length}</ListItem>
        <ListItem label="Day">{this.props.globals.day}</ListItem>
      </List>
    );

    logger.info(logPrefix, '<--');
    return stage;
  }
}

export default connect(state => new State(state)
  .ignore([ 'events', 'parameters', 'skills' ])
  .ignoreGlobals([ 'timers', 'status' ]).state
)(GeneralInfo);
