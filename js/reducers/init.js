import SkillsManager from '../managers/skills'
import ParametersManager from '../managers/parameters'
import EventsManager from '../managers/events'
import GlobalsManager from '../managers/globals'

import log from 'loglevel'
import prefix from 'loglevel-plugin-prefix'
import prefixTemplate from '../loglevel-prefix-template'

prefix.apply(log, prefixTemplate);
const logger = log.getLogger('init');

const initialState = {
  events: {},
  skills: {},
  parameters: {},
  globals: {},
  managers: {
    events: null,
    globals: null,
    skills: null,
    parameters: null
  }
};

const initState = () => {
  const logPrefix = ':initState] ';
  logger.info(logPrefix, '-->');

  logger.info(logPrefix, 'Init managers');
  let nextState = {
    ...initialState,
    managers: {
      events: new EventsManager(),
      globals: new GlobalsManager(),
      skills: new SkillsManager(),
      parameters: new ParametersManager()
    }
  };
  logger.info(logPrefix, 'Managers initialized');

  logger.info(logPrefix, 'Init managers states');
  nextState = {
    ...nextState,
    events: nextState.managers.events.getCurrentState(),
    globals: nextState.managers.globals.getCurrentState(),
    skills: nextState.managers.skills.getCurrentState(),
    parameters: nextState.managers.parameters.getCurrentState()
  };
  logger.info(logPrefix, 'Manager states initialized');

  logger.info(logPrefix, '<--');
  return nextState;
};

export { initState };
