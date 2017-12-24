import { initState } from './init'

import log from 'loglevel'
import prefix from 'loglevel-plugin-prefix'
import prefixTemplate from '../loglevel-prefix-template'

prefix.apply(log, prefixTemplate);
const logger = log.getLogger('reducer');

const reducerLookup = {
  EVENT_SEND: {
    cb: (state, data) => state.managers.events.sendEvent(state)
  },
  EVENT_SET: {
    cb: (state, data) => state.managers.events.setEventByKey(data)
  },
  EVENT_SET_VALUE: {
    cb: (state, data) => state.managers.events.setCurrentEventValue(data)
  },
  GLOBAL_ADD_DAY: {
    cb: (state, data) => state.managers.globals.addDay(state)
  },
  GLOBAL_STOP_GAME: {
    cb: (state, data) => state.managers.globals.stopGame(state)
  },
  GLOBAL_PAUSE_GAME: {
    cb: (state, data) => state.managers.globals.pauseGame()
  },
  GLOBAL_PLAY_GAME: {
    cb: (state, data) => state.managers.globals.playGame(state, data)
  },
  SKILL_SET: {
    cb: (state, data) => state.managers.skills.setValueByKey(data.key, +data.value)
  },
  PARAMETER_SET: {
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
    logger.info(logPrefix, 'Executing action received');
    reducerLookup[action.type].cb(state, action.data);

    logger.info(logPrefix, 'Updating state');
    nextState = {
      managers: state.managers,
      events: state.managers.events.getCurrentState(),
      globals: state.managers.globals.getCurrentState(),
      skills: state.managers.skills.getCurrentState(),
      parameters: state.managers.parameters.getCurrentState(),
      solutions: state.managers.solutions.getCurrentState()
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
