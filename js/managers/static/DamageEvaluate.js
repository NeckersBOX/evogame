import log from 'loglevel'
import prefix from 'loglevel-plugin-prefix'
import prefixTemplate from '../../loglevel-prefix-template'

import { memoize } from 'decko'

prefix.apply(log, prefixTemplate);
const logger = log.getLogger('damageEvaluate');

class DamageEvaluate {
  @memoize
  static damageWind(value) {
    const logPrefix = ':damageWind] ';
    logger.info(logPrefix, '-->');

    logger.info(logPrefix, '<--');
    return { wind: value };
  }

  @memoize
  static damageRain(value) {
    const logPrefix = ':damageRain] ';
    logger.info(logPrefix, '-->');

    logger.info(logPrefix, '<--');
    return {
      water: value * 0.24,
      wind: value * 2.2
    };
  }
}

export default DamageEvaluate;
