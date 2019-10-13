import { dispatch } from 'root-of-redux/store';
import { GET_FORECAST, GET_FORECAST_SUCCESS, GET_FORECAST_FAIL } from '../cities';

const initialState = { data: [] };

const SAVE = 'SAVE';
const SET_DATA = 'SET_DATA';
const REMOVE_CITY = 'REMOVE_CITY';

export const save = data => dispatch({ type: SAVE, data });
export const setData = data => dispatch({ type: SET_DATA, data });
export const removeCity = data => dispatch({ type: REMOVE_CITY, data });

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_FORECAST:
      state.data.forEach(i => {
        if (i.woeid === action.id) {
          i.isLoading = true;
          i.forecast = null;
        }
      });
      return { ...state };
    case GET_FORECAST_SUCCESS:
      state.data.forEach(i => {
        if (i.woeid === action.id) {
          i.isLoading = false;
          i.forecast = action.data;
        }
      });
      return { ...state };
    case GET_FORECAST_FAIL:
      state.data.forEach(i => {
        if (i.woeid === action.id) {
          i.isLoading = false;
          i.forecast = null;
        }
      });
      return { ...state };

    case SAVE:
      const { data } = state;
      const city = data.find(i => i.woeid === action.data.woeid);
      if (!city) { //if city is not saved yet
        data.push(action.data);
      }
      return { ...state, data }
    case REMOVE_CITY:
      const newArray = state.data.filter(i => i.woeid !== action.data.woeid);
      return { ...state, data: newArray }
    case SET_DATA:
      return { ...state, data: action.data }
    default:
      return state;
  }
}
