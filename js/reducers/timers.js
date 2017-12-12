import log from 'loglevel'
import prefix from 'loglevel-plugin-prefix'
import prefixTemplate from '../loglevel-prefix-template'

prefix.apply(log, prefixTemplate);
const logger = log.getLogger('timers');

const addDay = state => {
  const logPrefix = ':addDay] ';
  logger.debug(logPrefix, '-->');
  let year = state.parameters.find(s => s.key == 'days_per_generation').value;

  logger.debug(logPrefix, 'End of day ' + state.day);
  let nextState = {
    ...state,
    day: state.day + 1
  };

  if ( state.day == year ) {
    nextState = nextGeneration(state);
  }

  logger.debug(logPrefix, '<--');
  return nextState;
}

const nextGeneration = state => {
  const logPrefix = ':nextGeneration] ';
  logger.info(logPrefix, '-->');

  let nextState = {
    ...state,
    day: 1,
    generation: state.generation + 1
  };

  /* TODO: reproductivity, ecc.. */

  logger.info(logPrefix, '<--');
  return nextState;
}

export { addDay };
