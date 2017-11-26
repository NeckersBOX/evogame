import { parameters, paramReducer } from './parameters'
import { skills, skillReducer } from './skills'

const initialState = {
  generation: 0,
  solutions: [],
  day: 0,
  parameters,
  skills
};

const reducerLookup = {
  SET_PARAMETERS: (state, data) => paramReducer(state, data.key, +data.value),
      SET_SKILLS: (state, data) => skillReducer(state, data.key, +data.value)
};

const reducer = (state = initialState, action) =>
  reducerLookup.hasOwnProperty(action.type) ? reducerLookup[action.type](state, action.data) : state;

export default reducer;
