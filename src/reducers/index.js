import { combineReducers } from 'redux';
import { routerReducer} from 'react-router-redux'

/*
 * TODO: remove this note and place it  neatly in a readme
 * Do NOT have state as an object as it presents future problems
 * - componentDidUpdate will not be able to detect changes
 * - there is an additional object in the hiearchy after doing combineReducers
 *
 * eg this is bad:
 * const filterAuthor = (state = {filterReporter: ''}, action) => {
 */

const accessToken = (state = '', action) => {
  switch (action.type) {
    case 'ADD_ACCESS_TOKEN':
      state = action.token;
      return state;

    default:
      return state;
  }
};

const ttl = (state = '', action) => {
  switch (action.type) {
    case 'ADD_TTL':
      state = action.value;
      return state;

    default:
      return state;
  }
};

const tracks = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TRACKS':
      state = action.value;
      return state;

    default:
      return state;
  }
};

const errorMessageQuery = (state = [], action) => {
  switch (action.type) {
    case 'ADD_ERROR_MESSAGE_QUERY':
      state = action.value;
      return state;

    default:
      return state;
  }
};

// todo: rename to root reducer
const rootReducer = combineReducers({
  accessToken,
  errorMessageQuery,
  ttl,
  tracks,
  router: routerReducer,
});

export default rootReducer;
