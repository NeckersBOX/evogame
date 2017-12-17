import { setParamValue } from './parameters'
import { setSkillValue } from './skills'
import { setEvent } from './events'
import { addDay } from './timers'
import { playGame, pauseGame, stopGame } from './controls'

import SkillsManager from '../managers/skills'
import ParametersManager from '../managers/parameters'
import EventsManager from '../managers/events'

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
  skills: SkillsManager.getList(),
  events: EventsManager.getList(),
  event: EventsManager.getEventByKey(EventsManager.getList()[0].key),
  eventDisable: true
};

const reducerLookup = {
         ADD_DAY: (state, data) => addDay(state),
      PAUSE_GAME: (state, data) => pauseGame(state),
       PLAY_GAME: (state, data) => playGame(state, data),
       SET_EVENT: (state, data) => setEvent(state, data),
  SET_PARAMETERS: (state, data) => setParamValue(state, data.key, +data.value),
      SET_SKILLS: (state, data) => setSkillValue(state, data.key, +data.value),
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
