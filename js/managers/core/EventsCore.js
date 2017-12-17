import { CoreList } from './Core'
import events from './lists/events'
import skills from './lists/skills'

import log from 'loglevel'
import prefix from 'loglevel-plugin-prefix'
import prefixTemplate from '../../loglevel-prefix-template'

import { memoize } from 'decko'

prefix.apply(log, prefixTemplate);
const logger = log.getLogger('events');

class EventsCore extends CoreList {
  constructor() {
    super(events.map(event => ({
      ...event,
      affect: event.affect.map(skillKey => ({
        label: skillKey,
        color: skills.find(s => s.key == skillKey).color
      }))
    })));

    this.state = {
      current: this.state.list[0]
    }
  }

  setEventByKey(key) {
    const logPrefix = ':setEventByKey] ';
    logger.info(logPrefix, '-->');

    this.setState({ current: this.getElementByKey(key) });

    logger.info(logPrefix, '<--');
    return this;
  }

  setValueByKey(key, value) {
    const logPrefix = ':setValueByKey] ';
    logger.info(logPrefix, '-->');
    logger.warn(logPrefix, 'Method not available with events');
    logger.info(logPrefix, '<--');
  }

  @memoize
  getValueLabel(key, value) {
    const logPrefix = ':getValueLabel] ';
    logger.info(logPrefix, '-->');

    let valueInfo = this[this.getElementByKey(key).labelEvaluate](value);

    logger.info(logPrefix, '<--');
    return valueInfo;
  }

  @memoize
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
