import { getRandomInt } from './generics'
import log from 'loglevel'
import prefix from 'loglevel-plugin-prefix'
import prefixTemplate from '../loglevel-prefix-template'
import {
  buildRandomSolutionSkill,
  generateSolutionColor,
  evaluateSolutionsFitness
} from './solutions'

prefix.apply(log, prefixTemplate);
const logger = log.getLogger('controls');

export const playGame = state => {
  const logPrefix = ':playGame] ';
  logger.info(logPrefix, '-->');

  if ( state.status == 'play' ) {
    logger.info(logPrefix, '<--');
    return state;
  }

  let nextState = {
    ...state,
    status: 'play',
    generation: 1,
    day: 1
  };

  let [ maxSolutions, worldWidth, worldHeight, initialRange] = [
    state.parameters.find(p => p.key == 'solutions').value,
    state.parameters.find(p => p.key == 'world-width').value,
    state.parameters.find(p => p.key == 'world-height').value,
    state.parameters.find(p => p.key == 'initial-range').value / 100
  ];
  logger.debug(logPrefix, 'worldWidth:', worldWidth, 'worldHeight:', worldHeight);
  logger.debug(logPrefix, 'initialRange:', initialRange);

  maxSolutions = Math.min(worldWidth * worldHeight, maxSolutions);
  logger.info(logPrefix, 'Generating ' + maxSolutions + ' solutions');

  /* Generating solution */
  for ( let j = 0; j < maxSolutions; j++ ) {
    logger.debug(logPrefix, '> Generating solution ' + j);
    let [ row, col ] = [ getRandomInt(0, worldHeight - 1), getRandomInt(0, worldWidth - 1) ];

    while ( state.solutions.find(s => s.row == row && s.col == col) !== undefined ) {
      [ row, col ] = [ getRandomInt(0, worldHeight - 1), getRandomInt(0, worldWidth - 1) ];
    }
    logger.debug(logPrefix, '- founded free spot in row ' + row + ' and col ' + col);

    let skills = buildRandomSolutionSkill(state.skills, initialRange);
    logger.debug(logPrefix, '- solution skills:', skills);

    nextState.solutions.push({
      skills,
      row,
      col
    });
  }

  logger.info(logPrefix, 'Evaluating solutions fitness');
  nextState.solutions = evaluateSolutionsFitness(state.skills, nextState.solutions);

  logger.info(logPrefix, 'Generating solutions colors');
  nextState.solutions = nextState.solutions.map(solution => ({
    ...solution,
    color: generateSolutionColor(solution.skills)
  }));

  /* TODO timers */

  logger.info(logPrefix, '<--');
  return nextState;
}

export const pauseGame = state => {
  const logPrefix = ':pauseGame] ';
  logger.info(logPrefix, '-->');

  if ( state.status != 'play' ) {
    logger.info(logPrefix, '<--');
    return state;
  }

  logger.info(logPrefix, 'Perform pause');
  let nextState = {...state, status: 'pause'};

  /* TODO timers */

  logger.info(logPrefix, '<--');
  return nextState;
}

export const stopGame = state => {
  const logPrefix = ':stopGame] ';
  logger.info(logPrefix, '-->');

  if ( state.status == 'stop' ) {
    logger.info(logPrefix, '<--');
    return state;
  }

  logger.info(logPrefix, 'Resetting worldmap and info');
  let nextState = {
    ...state,
    solutions: [],
    status: 'stop',
    generation: 0,
    day: 0
  };

  /* TODO timers */

  logger.info(logPrefix, '<--');
  return nextState;
}
