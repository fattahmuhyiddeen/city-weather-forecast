import { dispatch } from 'root-of-redux/store';

const initialState = { data: [] };

const SAVE = 'SAVE';
const SET_DATA = 'SET_DATA';

export const save = data => dispatch({ type: SAVE, data });
export const setData = data => dispatch({ type: SET_DATA, data });

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SAVE:
      const { data } = state;
      const city = data.find(i => i.woeid === action.data.woeid);
      if (!city) { //if city is not saved yet
        data.push(action.data);
      }
      return { ...state, data }
    case SET_DATA:
      return { ...state, data: action.data }
    default:
      return state;
  }
}
