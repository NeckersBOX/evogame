import SkillsManager from './skills'
import events from './lists/events'

import log from 'loglevel'
import prefix from 'loglevel-plugin-prefix'
import prefixTemplate from '../loglevel-prefix-template'

import { memoize } from 'decko'

prefix.apply(log, prefixTemplate);
const logger = log.getLogger('eventsManager');

class EventsManager {
  constructor() {
    const logPrefix = ':constructor] ';

    logger.debug(logPrefix, '-->');

    this.eventsList = events.map(event => ({
      ...event,
      affect: event.affect.map(skillKey => ({
        label: skillKey,
        color: SkillsManager.getSkillByKey(skillKey).color
      }))
    }));

    logger.debug(logPrefix, '<--');
  }

  @memoize
  getList() {
    const logPrefix = ':getList] ';
    logger.info(logPrefix, '-->');

    let eventsFilteredList = this.eventsList.map(e => ({ key: e.key, label: e.label }));

    logger.info(logPrefix, '<--');
    return eventsFilteredList;
  }

  @memoize
  getEventByKey(eventKey) {
    const logPrefix = ':getEventByKey] ';
    logger.info(logPrefix, '-->');

    let event = this.eventsList.find(s => s.key == eventKey);
    logger.debug(logPrefix, 'event:', event);

    logger.info(logPrefix, '<--');
    return event;
  }

  getValueInfo(eventKey, value) {
    const logPrefix = ':getValueInfo] ';
    logger.info(logPrefix, '-->');

    let currentEvent = this.getEventByKey(eventKey);
    let valueInfo = this[currentEvent.labelEvaluate](value);

    logger.info(logPrefix, '<--');
    return valueInfo;
  }

  getValueInScale(scale, value) {
    const logPrefix = ':getValueInScale] ';
    logger.info(logPrefix, '-->');

    let result = null;

    for ( let i in scale ) {
      if ( value <= scale[i].value || i == scale.length - 1 ) {
        result = scale[i];
        break;
      }
    }

    if ( result === null ) {
      logger.info(logPrefix, 'No valid value found');
      result = { label: '', value: 0 };
    }

    logger.debug(logPrefix, 'value in scale:', result.value, 'associated with label:', result.label);

    logger.info(logPrefix, '<--');
    return result;
  }

  @memoize
  evaluateWind(value) {
    const logPrefix = ':evaluateWind] ';
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
  evaluateRain(value) {
    const logPrefix = ':evaluateRain] ';
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
  evaluateSandstorm(value) {
    const logPrefix = ':evaluateSandstorm] ';
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
  evaluateSnow(value) {
    const logPrefix = ':evaluateSnow] ';
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
  evaluateWave(value) {
    const logPrefix = ':evaluateWave] ';
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
    return result;
  }

  @memoize
  evaluateFire(value) {
    const logPrefix = ':evaluateFire] ';
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
      { label: 'Burn Burn',          value: -1  }
    ];

    let result = getValueInScale(fireScale, value);

    logger.info(logPrefix, '<--');
    return result;
  }
}

export default new EventsManager();
