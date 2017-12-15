import log from 'loglevel'
import prefix from 'loglevel-plugin-prefix'
import prefixTemplate from '../loglevel-prefix-template'

import EventsManager from '../managers/events'

prefix.apply(log, prefixTemplate);
const logger = log.getLogger('events');

const setEvent = (state, key) => {
  const logPrefix = ':eventReducer] ';
  logger.info(logPrefix, '-->');

  let nextState = {
    ...state,
    event: EventsManager.getEventByKey(key)
  };

  logger.info(logPrefix, '<--');
  return nextState;
};

export { setEvent };
