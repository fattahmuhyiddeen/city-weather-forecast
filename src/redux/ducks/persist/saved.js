import { dispatch } from 'root-of-redux/store';

const initialState = { data: [] };

const SAVE = 'SAVE';

export const save = data => dispatch({ type: SAVE, data });

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SAVE:
      const { data } = state;
      const city = data.find(i => i.woeid === action.data.woeid);
      if (!city) { //if city is not saved yet
        data.push(action.data);
      }
      return { ...state, data }
    default:
      return state;
  }
}
