import SkillsManager from '../managers/SkillsManager'
import ParametersManager from '../managers/ParametersManager'
import EventsManager from '../managers/EventsManager'
import GlobalsManager from '../managers/GlobalsManager'
import SolutionsManager from '../managers/SolutionsManager'

import log from '../loglevel-custom'
const logger = log.getLogger('init');

const initialState = {
  events: {},
  skills: {},
  solutions: {},
  parameters: {},
  globals: {},
  config: {
    label: {
      time: 'Duration'
    },
    unit: {
      time: 'days'
    }
  },
  history: [],
  managers: {
    events: null,
    globals: null,
    skills: null,
    solutions: null,
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
      parameters: new ParametersManager(),
      solutions: new SolutionsManager()
    }
  };
  logger.info(logPrefix, 'Managers initialized');

  logger.info(logPrefix, 'Init managers states');
  nextState = {
    ...nextState,
    events: nextState.managers.events.getCurrentState(),
    globals: nextState.managers.globals.getCurrentState(),
    skills: nextState.managers.skills.getCurrentState(),
    parameters: nextState.managers.parameters.getCurrentState(),
    solutions: nextState.managers.solutions.getCurrentState()
  };
  logger.info(logPrefix, 'Manager states initialized');

  logger.info(logPrefix, '<--');
  return nextState;
};

export { initState };
