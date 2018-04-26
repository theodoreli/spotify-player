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

const filterAuthor = (state = '', action) => {
  switch (action.type) {
    case 'ADD_AUTHOR_FILTER':
      state = action.filter;
      return state;

    default:
      return state;
  }
};

const filterLabels = (state = '', action) => {
  switch (action.type) {
    case 'ADD_LABELS_FILTER':
      state = action.filter;
      return state;

    default:
      return state;
  }
};

const displayIssues = combineReducers({
  filterAuthor,
  filterLabels,
});

export default displayIssues;
