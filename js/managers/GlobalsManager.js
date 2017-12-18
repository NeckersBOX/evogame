import GlobalsCore from './core/GlobalsCore'
import { getRandomInt } from '../generics'

import log from 'loglevel'
import prefix from 'loglevel-plugin-prefix'
import prefixTemplate from '../loglevel-prefix-template'

prefix.apply(log, prefixTemplate);
const logger = log.getLogger('globals');

class GlobalsManager extends GlobalsCore {
  constructor() {
    super();

    this.state = {
      day: 0,
      generation: 0,
      timers: {
        day: null
      },
      status: 'stop'
    }
  }

  playGame(state, callback) {
    const logPrefix = ':playGame] ';
    logger.info(logPrefix, '-->');

    const [ parameters, solutions ] = [ state.managers.parameters, state.managers.solutions ];

    if ( this.state.status == 'play' ) {
      logger.debug(logPrefix, 'Already running.');
      logger.info(logPrefix, '<--');
      return this;
    }

    if ( this.state.status == 'pause' ) {
      logger.info(logPrefix, 'Recover status from pause.');

      this.setState({
        status: 'play',
        timers: {
          day: setInterval(callback, parameters.getSkillByKey('day_time').value)
        }
      });

      logger.info(logPrefix, '<--');
      return this;
    }

    logger.debug('Initializing environment');
    this.setState({
      status: 'play',
      generation: 1,
      day: 1,
      timers: {
        day: setInterval(callback, parameters.getSkillByKey('day_time').value)
      }
    });

    let [ maxSolutions, worldWidth, worldHeight, initialRange] = [
      parameters.getValueByKey('solutions'),
      parameters.getValueByKey('world-width'),
      parameters.getValueByKey('world-height'),
      parameters.getValueByKey('initial-range') / 100
    ];
    logger.debug(logPrefix, 'worldWidth:', worldWidth, 'worldHeight:', worldHeight);
    logger.debug(logPrefix, 'initialRange:', initialRange);

    maxSolutions = Math.min(worldWidth * worldHeight, maxSolutions);
    logger.info(logPrefix, 'Generating ' + maxSolutions + ' solutions');

    /* Generating solution */
    for ( let j = 0; j < maxSolutions; j++ ) {
      logger.info(logPrefix, '> Generating solution ' + j);

      let position = {
        y: getRandomInt(0, worldHeight - 1),
        x: getRandomInt(0, worldWidth - 1)
      };

      while ( solutions.getSolutionAt(position) !== null ) {
        position = {
          y: getRandomInt(0, worldHeight - 1),
          x: getRandomInt(0, worldWidth - 1)
        };
      }
      logger.debug(logPrefix, '- founded free spot in row ' + position.y + ' and col ' + position.x);

      solutions.addRandomSolution(state.skills.list, initialRange, position)
    }

    solutions.addFitnessEvaluation(state.managers.skills);
    solutions.generateSolutionsColor();

    logger.info(logPrefix, '<--');
    return this;
  }

  stop() {
    const logPrefix = ':stop] ';
    logger.info(logPrefix, '-->');

    if ( this.state.status == 'stop' ) {
      logger.debug(logPrefix, 'Already stopped');
      logger.info(logPrefix, '<--');
      return this;
    }

    logger.info(logPrefix, 'Reset world');
    this.setState({
      status: 'stop',
      day: 0,
      generation: 0,
      initialized: false,
      solutions: null // TODO
    });

    logger.info(logPrefix, 'Clear intervals');
    clearInterval(this.state.timers.day);

    logger.info(logPrefix, '<--');
    return this;
  }

  pause() {
    const logPrefix = ':pause] ';
    logger.info(logPrefix, '-->');

    if ( this.state.status != 'play' ) {
      logger.debug(logPrefix, 'Nothing to pause');
      logger.info(logPrefix, '<--');
      return this;
    }

    this.setState({ status: 'pause' });

    logger.info(logPrefix, 'Clearing intervals');
    clearInterval(this.state.timers.day);

    logger.info(logPrefix, '<--');
    return this;
  }
}

export default GlobalsManager;
