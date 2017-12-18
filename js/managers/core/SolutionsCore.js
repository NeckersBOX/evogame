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
      solutions: []
    };
  }

  addSolution(skills, position) {
    const logPrefix = ':addSolution] ';
    logger.info(logPrefix, '-->');

    let solutions = this.state.solutions;

    solutions.push({
      skills,
      position
    });

    this.setState({ solutions });

    logger.info(logPrefix, '<--');
    return this;
  }

  getList() {
    const logPrefix = ':getList] ';
    logger.info(logPrefix, '-->');

    logger.info(logPrefix, '<--');
    return this.state.solutions;
  }

  getSolutionAt(position) {
    const logPrefix = ':getSolutionAt] ';
    logger.info(logPrefix, '-->');

    let solution = this.state.solutions.find(s => s.position.x == position.x && s.position.y == position.y);

    logger.info(logPrefix, '<--');
    return (solution === undefined) ? null : solution;
  }

  getSkillRangeByKey(key) {
    const logPrefix = ':getSkillRange] ';
    logger.debug(logPrefix, '-->');
    logger.debug(logPrefix, 'Skill key:', skill);

    let range = {
      min: undefined,
      max: undefined
    };

    for ( let i in this.state.solutions ) {
      let currSkillValue = this.state.solutions[i].skills.find(s => s.key == key).value;
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
