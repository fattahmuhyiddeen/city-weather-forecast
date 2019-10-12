import { combineReducers } from 'redux';
import persist from './persist';
import cities from './cities';

export default combineReducers({
  persist,
  cities,
});
