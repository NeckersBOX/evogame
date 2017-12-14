import { paramReducer } from './parameters'
import { skillReducer } from './skills'
import { playGame, pauseGame, stopGame } from './controls'
import { addDay } from './timers'

import SkillsManager from '../managers/skills'
import ParametersManager from '../managers/parameters'

import log from 'loglevel'
import prefix from 'loglevel-plugin-prefix'
import prefixTemplate from '../loglevel-prefix-template'

prefix.apply(log, prefixTemplate);
const logger = log.getLogger('reducer');

const initialState = {
  generation: 0,
  initialized: false,
  solutions: [],
  day: 0,
  status: 'stop',
  timers: {
    day: null
  },
  parameters: ParametersManager.getList(),
  skills: SkillsManager.getList()
};

const reducerLookup = {
         ADD_DAY: (state, data) => addDay(state),
      PAUSE_GAME: (state, data) => pauseGame(state),
       PLAY_GAME: (state, data) => playGame(state, data),
  SET_PARAMETERS: (state, data) => paramReducer(state, data.key, +data.value),
      SET_SKILLS: (state, data) => skillReducer(state, data.key, +data.value),
       STOP_GAME: (state, data) => stopGame(state)
};

const reducer = (state = initialState, action) => {
  const logPrefix = ':reducer] ';
  logger.info(logPrefix, '-->');

  logger.info(logPrefix, 'type:', action.type, 'data:', action.data);
  let nextState = reducerLookup.hasOwnProperty(action.type) ? reducerLookup[action.type](state, action.data) : state;

  logger.info(logPrefix, '<--');
  return nextState;
};

export default reducer;
