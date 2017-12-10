import log from 'loglevel'
import prefix from 'loglevel-plugin-prefix'
import prefixTemplate from '../loglevel-prefix-template'

prefix.apply(log, prefixTemplate);
const logger = log.getLogger('timers');

const addDay = state => {
  const logPrefix = ':addDay] ';
  logger.debug(logPrefix, '-->');
  
  logger.debug(logPrefix, 'End of day ' + state.day);
  let nextState = {
    ...state,
    day: state.day + 1
  }

  logger.debug(logPrefix, '<--');
  return nextState;
}

export { addDay };
