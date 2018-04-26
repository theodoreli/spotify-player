import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import displayIssues from './reducers';
import App from './containers/app.js';
import registerServiceWorker from './registerServiceWorker';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (e) {
    console.log(e)
  }
};

const store = createStore(displayIssues, loadState());

store.subscribe(() => {
  saveState(store.getState());
});

ReactDOM.render((<Provider store={store}><App/></Provider>), document.getElementById('root'));
registerServiceWorker();
