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

  getFitnessByKey(key, min, max) {
    const logPrefix = ':getFitnessByKey] ';
    logger.info(logPrefix, '-->');

    let element = this.getElementByKey(key);
    let fitness = this[element.generateFitness](element.value, min, max);

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

export default SkillsManager;
