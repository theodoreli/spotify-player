import { combineReducers } from 'redux';
import { routerReducer} from 'react-router-redux';
import * as types from '../constants/actionTypes.js';

/*
 * TODO: remove this note and place it  neatly in a readme
 * Do NOT have state as an object as it presents future problems
 * - componentDidUpdate will not be able to detect changes
 * - there is an additional object in the hiearchy after doing combineReducers
 *
 * eg this is bad:
 * const filterAuthor = (state = {filterReporter: ''}, action) => {
 */
const initialState = {
  accessToken: '',
  tracks: [],
  errorMessageQuery: '',
};

const app = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.value
      };

    case types.FETCH_TRACKS:
      return {
        ...state,
        tracks: action.value
      };

    case types.SET_ERROR_MESSAGE_QUERY:
      return {
        ...state,
        errorMessageQuery: action.value
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
