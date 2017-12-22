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
    return {
      wind: value
    };
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

  @memoize
  static damageFire(value) {
    const logPrefix = ':damageFire] ';
    logger.info(logPrefix, '-->');

    logger.info(logPrefix, '<--');
    return {
      heat: value,
      cold: value
    };
  }

  @memoize
  static damageSnow(value) {
    const logPrefix = ':damageSnow] ';
    logger.info(logPrefix, '-->');

    logger.info(logPrefix, '<--');
    return {
      cold: (1 / 24) * value,
      heat: (1 / 24) * value
    };
  }

  @memoize
  static damageWave(value) {
    const logPrefix = ':damageWave] ';
    logger.info(logPrefix, '-->');

    logger.info(logPrefix, '<--');
    return {
      water: value
    };
  }

  @memoize
  static damageSandstorm(value) {
    const logPrefix = ':damageSandstorm] ';
    logger.info(logPrefix, '-->');

    logger.info(logPrefix, '<--');
    return {
      wind: value,
      heat: 50 - (value / 10),
      cold: 50 - (value / 10)
    };
  }
}

export default DamageEvaluate;
