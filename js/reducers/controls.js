import { getRandomInt } from './generics'

export const playGame = state => {
  if ( state.status == 'play' ) {
    return state;
  }

  let nextState = {
    ...state,
    status: 'play',
    generation: 1,
    day: 1
  };

  let [ maxSolutions, worldWidth, worldHeight] = [
    state.parameters.find(p => p.key == 'solutions').value,
    state.parameters.find(p => p.key == 'world-width').value,
    state.parameters.find(p => p.key == 'world-height').value
  ];

  maxSolutions = Math.min(worldWidth * worldHeight, maxSolutions);

  for ( let j = 0; j < maxSolutions; j++ ) {
    let [ row, col ] = [ getRandomInt(0, worldHeight - 1), getRandomInt(0, worldWidth - 1) ];

    while ( state.solutions.find(s => s.row == row && s.col == col) !== undefined ) {
      [ row, col ] = [ getRandomInt(0, worldHeight - 1), getRandomInt(0, worldWidth - 1) ];
    }

    nextState.solutions.push({
      skills: state.skills.map(skill => ({ key: skill.key, value: skill.value })),
      row,
      col
    });
  }

  /* TODO timers */
  return nextState;
}

export const pauseGame = state => {
  if ( state.status != 'play' ) {
    return state;
  }

  let nextState = state;

  /* TODO timers */
  return nextState;
}

export const stopGame = state => {
  if ( state.status == 'stop' ) {
    return state;
  }

  let nextState = {
    ...state,
    solutions: [],
    status: 'stop',
    generation: 0,
    day: 0
  };

  /* TODO timers */

  return nextState;
}
