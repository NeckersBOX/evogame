import { parameters, paramReducer } from './parameters'
import { skills, skillReducer } from './skills'
import { playGame, pauseGame, stopGame } from './controls'

const initialState = {
  generation: 0,
  solutions: [],
  day: 0,
  status: 'stop',
  parameters,
  skills
};

const reducerLookup = {
      PAUSE_GAME: (state, data) => pauseGame(state),
       PLAY_GAME: (state, data) => playGame(state),
  SET_PARAMETERS: (state, data) => paramReducer(state, data.key, +data.value),
      SET_SKILLS: (state, data) => skillReducer(state, data.key, +data.value),
       STOP_GAME: (state, data) => stopGame(state)
};

const reducer = (state = initialState, action) =>
  reducerLookup.hasOwnProperty(action.type) ? reducerLookup[action.type](state, action.data) : state;

export default reducer;
