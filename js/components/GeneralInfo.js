import { h } from 'preact'
import EvoComponent from './EvoComponent'
import State from '../managers/core/State'

import { connect } from 'preact-redux'
import { List, ListItem } from './extra-mui/list'
import Solution from './Solution'

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

    let bestSolution = this.props.managers.solutions.getBestSolution();

    let stage = (
      <div>
        <List>
          <ListItem label="Generation">{this.props.globals.generation}</ListItem>
          <ListItem label="Day">{this.props.globals.day}</ListItem>
          <ListItem label="Current Solutions">{this.props.solutions.list.length}</ListItem>
          <ListItem label="Dead Solutions">{this.props.solutions.dead}</ListItem>
        </List>
        { bestSolution ?
          <div>
            <h2>Best Solution ( Fitness: {bestSolution.fitness.toFixed(3)} )</h2>
            <Solution solution={bestSolution} labelCb={this.props.managers.skills.getLabelByKey} />
          </div> : null }
      </div>
    );

    logger.info(logPrefix, '<--');
    return stage;
  }
}

export default connect(state => new State(state)
  .ignore([ 'events', 'parameters', 'skills' ])
  .ignoreGlobals([ 'timers', 'status' ]).state
)(GeneralInfo);
