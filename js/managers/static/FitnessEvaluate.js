import log from 'loglevel'
import prefix from 'loglevel-plugin-prefix'
import prefixTemplate from '../../loglevel-prefix-template'

import { memoize } from 'decko'

prefix.apply(log, prefixTemplate);
const logger = log.getLogger('fitnessEvaluate');


class FitnessEvaluate {
  @memoize
  static fitnessCold(value, min, max) {
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
  static fitnessHeat(value, min, max) {
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
  static fitnessWater(value, min, max) {
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
  static fitnessWind(value, min, max) {
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

export default FitnessEvaluate;
