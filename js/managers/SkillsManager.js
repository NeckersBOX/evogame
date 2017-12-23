import SkillsCore from './core/SkillsCore'
import DamageEvaluate from './static/DamageEvaluate'
import FitnessEvaluate from './static/FitnessEvaluate'

import log from 'loglevel'
import prefix from 'loglevel-plugin-prefix'
import prefixTemplate from '../loglevel-prefix-template'

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
    let fitness = FitnessEvaluate[element.generateFitness](skill.value, min, max);
    logger.debug(logPrefix, 'fitness:', fitness);

    logger.info(logPrefix, '<--');
    return fitness;
  }

  isFatalDamage(skill, damages) {
    const logPrefix = ':isFatalDamage] ';
    logger.debug(logPrefix, '-->');

    let isFatal = false;
    if ( damages.hasOwnProperty(skill.key) ) {
      let element = this.getElementByKey(skill.key);
      isFatal = DamageEvaluate[element.isFatal](skill.value, damages[skill.key]);
    }

    logger.debug(logPrefix, '<--');
    return isFatal;
  }
}

export default SkillsManager;
