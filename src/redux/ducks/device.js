import { dispatch } from 'root-of-redux/store';

const SET_KEYBOARD = 'SET_KEYBOARD';
const SET_GPS = 'SET_GPS';

export const setKeyboard = data => dispatch({ type: SET_KEYBOARD, data });
export const setGPS = data => dispatch({ type: SET_GPS, data });

const initialState = {
  isKeyboardAppear: false,
  keyboardHeight: 0,
  latitude: 0,
  longitude: 0,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_KEYBOARD:
    case SET_GPS:
      return { ...state, ...action.data }
    default:
      return state;
  }
}
