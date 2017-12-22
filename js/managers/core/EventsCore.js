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
}

export default EventsCore;
