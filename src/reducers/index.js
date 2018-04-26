import { combineReducers } from 'redux';

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

const data = combineReducers({
  accessToken,
  ttl,
});

export default data;
