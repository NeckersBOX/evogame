import skills from './lists/skills'

import log from 'loglevel'
import prefix from 'loglevel-plugin-prefix'
import prefixTemplate from '../../loglevel-prefix-template'

import { memoize } from 'decko'

prefix.apply(log, prefixTemplate);
const logger = log.getLogger('skillsCore');

class SkillsCore {
  constructor() {
    this.skillsList = skills;
  }

  @memoize
  getList() {
    const logPrefix = ':getList] ';
    logger.info(logPrefix, '-->');

    logger.info(logPrefix, '<--');
    return this.skillsList;
  }

  @memoize
  getSkillByKey(skillKey) {
    const logPrefix = ':getSkillByKey] ';
    logger.info(logPrefix, '-->');

    let skill = this.skillsList.find(s => s.key == skillKey);
    logger.debug(logPrefix, 'skill:', skill);

    logger.info(logPrefix, '<--');
    return skill;
  }
}

export default SkillsCore;
