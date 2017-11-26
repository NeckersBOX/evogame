import { parameters, paramReducer } from './parameters'
import { skills, skillReducer } from './skills'

const initialState = {
  generation: 0,
  solutions: 0,
  day: 0,
  parameters,
  skills
};

const reducerLookup = {
  SET_PARAMETERS: (state, data) => paramReducer(state, data.label, +data.value),
      SET_SKILLS: (state, data) => skillReducer(state, data.label, +data.value)
};

const reducer = (state = initialState, action) =>
  reducerLookup.hasOwnProperty(action.type) ? reducerLookup[action.type](state, action.data) : state;

export default reducer;
