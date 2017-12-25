import { Component } from 'preact'
import State from '../managers/core/State'
import { compareObjects } from '../generics'

import log from 'loglevel'
import prefix from 'loglevel-plugin-prefix'
import prefixTemplate from '../loglevel-prefix-template'

prefix.apply(log, prefixTemplate);
const logger = log.getLogger('EvoComponent');

export default class EvoComponent extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    const logPrefix = ':shouldComponentUpdate] ';
    logger.debug(logPrefix, '-->');

    const ignoreProps = [ 'dispatch', 'managers', 'children' ];
    let [oldProps, newProps] = [
      new State(this.props).ignore(ignoreProps),
      new State(nextProps).ignore(ignoreProps)
    ];

    let result = compareObjects(oldProps.state, newProps.state);
    logger.debug(logPrefix, 'Props are ' + (result ? '' : 'not ') + 'equals');

    logger.debug(logPrefix, '<--');
    return !result;
  }
}
