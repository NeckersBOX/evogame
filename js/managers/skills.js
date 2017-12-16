import SkillsCore from './core/skills'

import log from 'loglevel'
import prefix from 'loglevel-plugin-prefix'
import prefixTemplate from '../loglevel-prefix-template'

import { memoize } from 'decko'

prefix.apply(log, prefixTemplate);
const logger = log.getLogger('skillsManager');

class SkillsManager extends SkillsCore {
  constructor() {
    super();
  }

  evaluateFitness(skill, min, max) {
    const logPrefix = ':evaluateFitness] ';
    logger.info(logPrefix, '-->');

    let fitness = this[skill.generateFitness](skill.value, min, max);

    logger.info(logPrefix, '<--');
    return fitness;
  }

  @memoize
  fitnessCold(value, min, max) {
    return max == min ? 1 : ((max - value) / Math.abs(max - min));
  }

  @memoize
  fitnessHeat(value, min, max) {
    return max == min ? 1 : ((value - min) / Math.abs(max - min));
  }

  @memoize
  fitnessWater(value, min, max) {
    return max == min ? 1 : ((value - min) / Math.abs(max - min));
  }

  @memoize
  fitnessWind(value, min, max) {
    return max == min ? 1 : ((value - min) / Math.abs(max - min));
  }
}

export default new SkillsManager();
