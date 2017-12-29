import { Core } from './Core'

import log from 'loglevel'
import prefix from 'loglevel-plugin-prefix'
import prefixTemplate from '../../loglevel-prefix-template'

prefix.apply(log, prefixTemplate);
const logger = log.getLogger('solutions');

class SolutionsCore extends Core {
  constructor() {
    super();

    this.state = {
      list: [],
      dead: 0
    };
  }

  addSolution(skills, position) {
    const logPrefix = ':addSolution] ';
    logger.info(logPrefix, '-->');

    let list = this.state.list;

    list.push({
      skills,
      position
    });

    this.setState({ list });

    logger.info(logPrefix, '<--');
    return this;
  }

  removeAll() {
    const logPrefix = ':removeAll] ';
    logger.info(logPrefix, '-->');

    this.setState({ list: [], dead: 0 });

    logger.info(logPrefix, '<--');
    return this;
  }

  getList() {
    const logPrefix = ':getList] ';
    logger.info(logPrefix, '-->');

    logger.info(logPrefix, '<--');
    return this.state.list;
  }

  getSolutionAt(position) {
    const logPrefix = ':getSolutionAt] ';
    logger.trace(logPrefix, '-->');

    let solution = this.state.list.find(s => s.position.x == position.x && s.position.y == position.y);

    logger.trace(logPrefix, '<--');
    return (solution === undefined) ? null : solution;
  }

  getSkillRangeByKey(key) {
    const logPrefix = ':getSkillRange] ';
    logger.debug(logPrefix, '-->');
    logger.debug(logPrefix, 'Skill key:', key);

    let range = {
      min: undefined,
      max: undefined
    };

    for ( let i in this.state.list ) {
      let currSkillValue = this.state.list[i].skills.find(s => s.key == key).value;
      logger.debug(logPrefix, 'currSkillValue:', currSkillValue, 'at Index:', i);

      if ( range.min == undefined || currSkillValue < range.min ) {
        range.min = currSkillValue;
      }

      if ( range.max == undefined || currSkillValue > range.max ) {
        range.max = currSkillValue;
      }
    }

    logger.debug(logPrefix, '<--');
    return range;
  }
}

export default SolutionsCore;
