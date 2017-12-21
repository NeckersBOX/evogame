import { initState } from './init'

import log from 'loglevel'
import prefix from 'loglevel-plugin-prefix'
import prefixTemplate from '../loglevel-prefix-template'

prefix.apply(log, prefixTemplate);
const logger = log.getLogger('reducer');

const reducerLookup = {
  EVENT_SET: {
    param: 'events',
    cb: (state, data) => state.managers.events.setEventByKey(data)
  },
  GLOBAL_ADD_DAY: {
    param: 'globals',
    cb: (state, data) => state.managers.globals.addDay(state)
  },
  GLOBAL_STOP_GAME: {
    param: 'globals',
    cb: (state, data) => state.managers.globals.stopGame()
  },
  GLOBAL_PAUSE_GAME: {
    param: 'globals',
    cb: (state, data) => state.managers.globals.pauseGame()
  },
  GLOBAL_PLAY_GAME: {
    param: 'globals',
    cb: (state, data) => state.managers.globals.playGame(state, data)
  },
  SKILL_SET: {
    param: 'skills',
    cb: (state, data) => state.managers.skills.setValueByKey(data.key, +data.value)
  },
  PARAMETER_SET: {
    param: 'parameters',
    cb: (state, data) => state.managers.parameters.setValueByKey(data.key, +data.value)
  }
};

const reducer = (state, action) => {
  const logPrefix = ':reducer] ';
  logger.info(logPrefix, '-->');
  logger.info(logPrefix, 'type:', action.type, 'data:', action.data);
  logger.debug(logPrefix, 'Current state:', state);

  let nextState = state;
  if ( action.type == '@@redux/INIT' ) {
    nextState = initState();
  }
  else if ( reducerLookup.hasOwnProperty(action.type) ) {
    let ref = reducerLookup[action.type];

    nextState = {
      ...state,
      [ref.param]: ref.cb(state, action.data).getCurrentState()
    };
  }
  else {
    logger.warn(logPrefix, 'Action not recognized.');
  }

  logger.debug(logPrefix, 'New state:', nextState);
  logger.info(logPrefix, '<--');
  return nextState;
};

export default reducer;
