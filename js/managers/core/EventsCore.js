import { CoreList } from './Core'
import events from './lists/events'
import skills from './lists/skills'

import log from 'loglevel'
import prefix from 'loglevel-plugin-prefix'
import prefixTemplate from '../../loglevel-prefix-template'

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
      current: {
        ...this.state.list[0],
        value: this.state.list[0].defaultValue
      }
    }
  }

  setEventByKey(key) {
    const logPrefix = ':setEventByKey] ';
    logger.info(logPrefix, '-->');

    let element = this.getElementByKey(key);

    this.setState({
      current: {
        ...element,
        value: element.defaultValue
      }
    });

    logger.info(logPrefix, '<--');
    return this;
  }

  setValueByKey(key, value) {
    const logPrefix = ':setValueByKey] ';
    logger.info(logPrefix, '-->');
    logger.warn(logPrefix, 'Method not available with events');
    logger.info(logPrefix, '<--');

    return this;
  }

  setCurrentEventValue(value) {
    const logPrefix = ':setCurrentEventValue] ';
    logger.info(logPrefix, '-->');

    if ( this.state.current.hasOwnProperty('min') && value < this.state.current.min ) {
      logger.info(logPrefix, 'Prevent to set a value less than minimum.');
      value = event.min;
    }

    if ( this.state.current.hasOwnProperty('max') && value > this.state.current.max ) {
      logger.info(logPrefix, 'Prevent to set a value more than maximum.');
      value = event.max;
    }

    this.setState({
      current: {
        ...this.state.current,
        value
      }
    });

    logger.info(logPrefix, '<--');
    return this;
  }

  setCurrentEventTime(dispatchTime) {
    const logPrefix = ':setCurrentEventTime] ';
    logger.info(logPrefix, '-->');

    if ( dispatchTime < 0 ) {
      logger.info(logPrefix, 'Prevent to set a value less than minimum.');
      value = 0;
    }

    this.setState({
      current: {
        ...this.state.current,
        dispatchTime
      }
    });

    logger.info(logPrefix, '<--');
    return this;
  }
}

export default EventsCore;
