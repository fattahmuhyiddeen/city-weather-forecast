import { combineReducers } from 'redux';
import persist from './persist';
import cities from './cities';
import device from './device';

export default combineReducers({
  persist,
  cities,
  device,
});
