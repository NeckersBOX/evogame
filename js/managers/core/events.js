import SkillsCore from './skills'
import events from './lists/events'

import log from 'loglevel'
import prefix from 'loglevel-plugin-prefix'
import prefixTemplate from '../../loglevel-prefix-template'

import { memoize } from 'decko'

prefix.apply(log, prefixTemplate);
const logger = log.getLogger('eventsCore');

class EventsCore {
  constructor() {
    const logPrefix = ':constructor] ';

    logger.debug(logPrefix, '-->');

    this.eventsList = events.map(event => ({
      ...event,
      affect: event.affect.map(skillKey => ({
        label: skillKey,
        color: new SkillsCore().getSkillByKey(skillKey).color
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
}

export default EventsCore;
