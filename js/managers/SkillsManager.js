import SkillsCore from './core/SkillsCore'

import log from 'loglevel'
import prefix from 'loglevel-plugin-prefix'
import prefixTemplate from '../loglevel-prefix-template'

import { memoize } from 'decko'

prefix.apply(log, prefixTemplate);
const logger = log.getLogger('skills');

class SkillsManager extends SkillsCore {
  constructor() {
    super();
  }

  getFitness(skill, min, max) {
    const logPrefix = ':getFitnessByKey] ';
    logger.info(logPrefix, '-->');

    let element = this.getElementByKey(skill.key);
    let fitness = this[element.generateFitness](skill.value, min, max);
    logger.debug(logPrefix, 'fitness:', fitness);

    logger.info(logPrefix, '<--');
    return fitness;
  }

  @memoize
  fitnessCold(value, min, max) {
    const logPrefix = ':fitnessCold] ';
    logger.debug(logPrefix, '-->');

    let result = 1;
    if ( max != min ) {
      result = (max - value) / Math.abs(max - min);
    }

    logger.debug(logPrefix, '<--');
    return result;
  }

  @memoize
  fitnessHeat(value, min, max) {
    const logPrefix = ':fitnessHeat] ';
    logger.debug(logPrefix, '-->');

    let result = 1;
    if ( max != min ) {
      result = (value - min) / Math.abs(max - min);
    }

    logger.debug(logPrefix, '<--');
    return result;
  }

  @memoize
  fitnessWater(value, min, max) {
    const logPrefix = ':fitnessWater] ';
    logger.debug(logPrefix, '-->');

    let result = 1;
    if ( max != min ) {
      result = (value - min) / Math.abs(max - min);
    }

    logger.debug(logPrefix, '<--');
    return result;
  }

  @memoize
  fitnessWind(value, min, max) {
    const logPrefix = ':fitnessWind] ';
    logger.debug(logPrefix, '-->');

    let result = 1;
    if ( max != min ) {
      result = (value - min) / Math.abs(max - min);
    }

    logger.debug(logPrefix, '<--');
    return result;
  }
}

export default SkillsManager;
