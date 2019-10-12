import { dispatch } from 'root-of-redux/store';
import http from 'services/http';
import endpoints from 'config/endpoints';

const initialState = {
  isLoading: false,
  data: [],
};

const SEARCH_CITIES = 'SEARCH_CITIES';
const SEARCH_CITIES_SUCCESS = 'SEARCH_CITIES_SUCCESS';
const SEARCH_CITIES_FAIL = 'SEARCH_CITIES_FAIL';

export const searchCities = (city) => {
  dispatch({ type: SEARCH_CITIES });
  http.call({
    endpoint: endpoints.search_cities,
    urlSuffix: `?query=${city}`,
    onSuccess: data => dispatch({ type: SEARCH_CITIES_SUCCESS, data }),
    onFail: error => dispatch({ type: SEARCH_CITIES_FAIL, error })
  });
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SEARCH_CITIES:
      return { ...state, isLoading: true }
    case SEARCH_CITIES_SUCCESS:
      const data = action.data.map(data => {
        return data;
      });
      return { ...state, isLoading: false, data }
    case SEARCH_CITIES_FAIL:
      return { ...state, isLoading: false, error: action.error }
    default:
      return state;
  }
}
