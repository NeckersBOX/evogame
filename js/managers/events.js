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
      { label: 'Hurricane Force', value: 118 }
    ];

    let result = null;
    for ( let i in beaufortScale ) {
      if ( value <= beaufortScale[i].value || i == beaufortScale.length - 1 ) {
        result = beaufortScale[i];
        break;
      }
    }
    logger.debug(logPrefix, 'value in scale:', result.value, 'associated with label:', result.label);

    logger.info(logPrefix, '<--');
    return info;
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
      { label: 'Cloudburst', value: 31 }
    ];

    let result = null;
    for ( let i in rainScale ) {
      if ( value <= rainScale[i].value || i == rainScale.length - 1 ) {
        result = rainScale[i];
        break;
      }
    }
    logger.debug(logPrefix, 'value in scale:', result.value, 'associated with label:', result.label);

    logger.info(logPrefix, '<--');
    return info;
  }
}

export default new EventsManager();
