import { skills } from './reducers/skills.js'
import log from 'loglevel'
import prefix from 'loglevel-plugin-prefix'
import prefixTemplate from './loglevel-prefix-template'

import { memoize } from 'decko'

prefix.apply(log, prefixTemplate);
const logger = log.getLogger('events');

export default class evoEvents {
  constructor() {
    const methodCall = this;

    this.eventsList = [
      {
        key: 'wind',
        label: 'Wind',
        affect: [ 'wind' ],
        labelEvaluate: 'evaluateWind'
      }
    ].map(event => {
      let currSkill = skills.find(s => s.key == event.key);

      let result = { ...event, unit: currSkill.unit };
      if ( currSkill.hasOwnProperty('min') ) {
        result.min = currSkill.min;
      }

      if ( currSkill.hasOwnProperty('max') ) {
        result.max = currSkill.max;
      }

      return result;
    });
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
    let valueInfo = methodCall[currentEvent.labelEvaluate](value);

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
}
