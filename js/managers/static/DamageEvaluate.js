import log from '../../loglevel-custom'
import { memoize } from 'decko'

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
      wind: value / 5,
      heat: (value / 10),
      cold: (value / 10)
    };
  }

  static isFatalCold(resistance, value) {
    const logPrefix = ':isFatalCold] ';
    logger.debug(logPrefix, '-->');

    logger.debug(logPrefix, '<--');
    return value <= resistance;
  }

  static isFatalHeat(resistance, value) {
    const logPrefix = ':isFatalHeat ] ';
    logger.debug(logPrefix, '-->');

    logger.debug(logPrefix, '<--');
    return value >= resistance;
  }

  static isFatalWind(resistance, value) {
    const logPrefix = ':isFatalWind ] ';
    logger.debug(logPrefix, '-->');

    logger.debug(logPrefix, '<--');
    return value >= resistance;
  }

  static isFatalWater(resistance, value) {
    const logPrefix = ':isFatalWater ] ';
    logger.debug(logPrefix, '-->');

    logger.debug(logPrefix, '<--');
    return value >= resistance;
  }
}

export default DamageEvaluate;
