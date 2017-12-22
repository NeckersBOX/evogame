import log from 'loglevel'
import prefix from 'loglevel-plugin-prefix'
import prefixTemplate from '../../loglevel-prefix-template'
import { getValueInScale } from '../../generics'

import { memoize } from 'decko'

prefix.apply(log, prefixTemplate);
const logger = log.getLogger('labelEvaluate');

class LabelEvaluate {
  @memoize
  static labelWind(value) {
    const logPrefix = ':labelWind] ';
    logger.info(logPrefix, '-->');

    const beaufortScale = [
      { label: 'Calm',            value: 1   },
      { label: 'Light Air',       value: 5   },
      { label: 'Light Breeze',    value: 11  },
      { label: 'Gentle Breeze',   value: 19  },
      { label: 'Moderate Breeze', value: 28  },
      { label: 'Fresh Breeze',    value: 38  },
      { label: 'Strong Breeze',   value: 49  },
      { label: 'Moderate Gale',   value: 61  },
      { label: 'Fresh Gale',      value: 74  },
      { label: 'Strong Gale',     value: 88  },
      { label: 'Storm',           value: 102 },
      { label: 'Violent Storm',   value: 117 },
      { label: 'Hurricane Force', value: -1 }
    ];

    let result = getValueInScale(beaufortScale, value);

    logger.info(logPrefix, '<--');
    return result.label;
  };

  @memoize
  static labelRain(value) {
    const logPrefix = ':labelRain] ';
    logger.info(logPrefix, '-->');

    const rainScale = [
      { label: 'Fog',        value: 1  },
      { label: 'Drizzle',    value: 4  },
      { label: 'Heavy Rain', value: 10 },
      { label: 'Shower',     value: 30 },
      { label: 'Cloudburst', value: -1 }
    ];

    let result = getValueInScale(rainScale, value);

    logger.info(logPrefix, '<--');
    return result.label;
  }

  @memoize
  static labelSandstorm(value) {
    const logPrefix = ':labelSandstorm] ';
    logger.info(logPrefix, '-->');

    const sandstormScale = [
      { label: 'Smoke In The Eyes', value: 10  },
      { label: 'Regular Sandstorm', value: 35  },
      { label: 'Haboob',            value: 90  },
      { label: 'Martian Sandstorm', value: -1  }
    ];

    let result = getValueInScale(sandstormScale, value);

    logger.info(logPrefix, '<--');
    return result.label;
  }

  @memoize
  static labelSnow(value) {
    const logPrefix = ':labelSnow] ';
    logger.info(logPrefix, '-->');

    const snowScale = [
      { label: 'Regular Snow', value: 2 },
      { label: 'Heavy Snow',   value: 5 }
    ];

    let result = getValueInScale(snowScale, value);

    logger.info(logPrefix, '<--');
    return result.label;
  }

  @memoize
  static labelWave(value) {
    const logPrefix = ':labelWave] ';
    logger.info(logPrefix, '-->');

    const waveScale = [
      { label: 'Like A Mirror', value: 1  },
      { label: 'Moderate Wave', value: 3  },
      { label: 'High Wave',     value: 8  },
      { label: 'Rogue Wave',    value: 16 },
      { label: 'Tsunami',       value: -1 }
    ];

    let result = getValueInScale(waveScale, value);

    logger.info(logPrefix, '<--');
    return result.label;
  }

  @memoize
  static labelFire(value) {
    const logPrefix = ':labelFire] ';
    logger.info(logPrefix, '-->');

    const fireScale = [
      { label: 'Earth Surface',      value: 21  },
      { label: 'Room Temperature',   value: 28  },
      { label: 'Minimum Human Body', value: 37  },
      { label: 'Human Body',         value: 38  },
      { label: 'Cat Body',           value: 39  },
      { label: 'Death Valley',       value: 90  },
      { label: 'Soup',               value: 100 },
      { label: 'Water Boiling',      value: 150 },
      { label: 'Mercury',            value: 200 },
      { label: 'Venus',              value: 500 },
      { label: 'Burn Burn',          value:  -1 }
    ];

    let result = getValueInScale(fireScale, value);

    logger.info(logPrefix, '<--');
    return result.label;
  }
}

export default LabelEvaluate;
