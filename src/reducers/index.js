import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import * as types from '../constants/actionTypes';

const initialState = {
  accessToken: '',
  tracks: [],
  errorMessageQuery: '',
};

const app = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.value,
      };

    case types.FETCH_TRACKS:
      return {
        ...state,
        tracks: action.value,
      };

    case types.SET_ERROR_MESSAGE_QUERY:
      return {
        ...state,
        errorMessageQuery: action.value,
      };

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  app,
  router: routerReducer,
});

export default rootReducer;
