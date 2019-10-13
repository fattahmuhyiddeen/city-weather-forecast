import { dispatch, getStore } from 'root-of-redux/store';
import http from 'services/http';
import { distanceInKmBetweenEarthCoordinates } from 'services/calculation';
import endpoints from 'config/endpoints';

const initialState = {
  isLoading: false,
  data: [],
};

const SEARCH_CITIES = 'SEARCH_CITIES';
const SEARCH_CITIES_SUCCESS = 'SEARCH_CITIES_SUCCESS';
const SEARCH_CITIES_FAIL = 'SEARCH_CITIES_FAIL';

const GET_FORECAST = 'GET_FORECAST';
const GET_FORECAST_SUCCESS = 'GET_FORECAST_SUCCESS';
const GET_FORECAST_FAIL = 'GET_FORECAST_FAIL';

export const searchCities = (city) => {
  dispatch({ type: SEARCH_CITIES });
  http.call({
    endpoint: endpoints.search_cities,
    urlSuffix: `?query=${city}`,
    onSuccess: response => {
      const { latitude, longitude } = getStore().getState().device;
      const data = response.map(i => {
        const latt_long = i.latt_long.split(',');
        i.distance = distanceInKmBetweenEarthCoordinates(latitude, longitude, latt_long[0], latt_long[1])
        return i;
      });
      dispatch({ type: SEARCH_CITIES_SUCCESS, data })
    },
    onFail: error => dispatch({ type: SEARCH_CITIES_FAIL, error })
  });
};

export const getForecast = (id) => {
  dispatch({ type: GET_FORECAST, id });
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1); // set to tomorrow
  const date = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  http.call({
    endpoint: endpoints.forecast,
    urlSuffix: `/${id}/${year}/${month}/${date}`,
    onSuccess: data => {
      data = data.length > 0 ? data[0] : {};
      dispatch({ type: GET_FORECAST_SUCCESS, data, id })
    },
    onFail: error => dispatch({ type: GET_FORECAST_FAIL, error, id })
  });
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_FORECAST:
      state.data.forEach(i => {
        if (i.woeid == action.id) {
          i.isLoading = true;
          i.forecast = null;
        }
      });
      return { ...state };
    case GET_FORECAST_SUCCESS:
      state.data.forEach(i => {
        if (i.woeid == action.id) {
          i.isLoading = false;
          i.forecast = action.data;
        }
      });
      return { ...state };
    case GET_FORECAST_FAIL:
      state.data.forEach(i => {
        if (i.woeid == action.id) {
          i.isLoading = false;
          i.forecast = null;
        }
      });
      return { ...state };
    case SEARCH_CITIES:
      return { ...state, isLoading: true }
    case SEARCH_CITIES_SUCCESS:
      const { data } = action;
      data.sort((a, b) => a.distance - b.distance);
      return { ...state, isLoading: false, data };
    case SEARCH_CITIES_FAIL:
      return { ...state, isLoading: false, error: action.error }
    default:
      return state;
  }
}
