import { initState } from './init'

import log from 'loglevel'
import prefix from 'loglevel-plugin-prefix'
import prefixTemplate from '../loglevel-prefix-template'

prefix.apply(log, prefixTemplate);
const logger = log.getLogger('reducer');

const reducerLookup = {
  EVENT_SET:          data => state.managers.events.setEventByKey(data),
  GLOBAL_ADD_DAY:     data => state.managers.globals.addDay(),
  GLOBAL_STOP_GAME:   data => state.managers.globals.stopGame(),
  GLOBAL_PAUSE_GAME:  data => state.managers.globals.pauseGame(),
  GLOBAL_PLAY_GAME:   data => state.managers.globals.playGame(data),
  SKILL_SET:          data => state.managers.skills.setValueByKey(data.key, +data.value),
  PARAMETER_SET:      data => state.managers.parameters.setValueByKey(data.key, +data.value)
};

const reducer = (state, action) => {
  const logPrefix = ':reducer] ';
  logger.info(logPrefix, '-->');
  logger.info(logPrefix, 'type:', action.type, 'data:', action.data);

  let nextState = state;
  if ( action.type == 'INIT' ) {
    nextState = initState();
  }
  else if ( reducerLookup.hasOwnProperty(action.type) ) {
    nextState = {
      ...state,
      ...reducerLookup[action.type](action.data).getCurrentState()
    };
  }
  else {
    logger.warn(logPrefix, 'Action not recognized.');
  }

  logger.info(logPrefix, '<--');
  return nextState;
};

export default reducer;
