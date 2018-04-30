import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'

import rootReducer from './reducers';
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

const history = createHistory()
const middleware = routerMiddleware(history)

const store = createStore(
  rootReducer,
  loadState(),
  applyMiddleware(thunk, middleware)
);

store.subscribe(() => {
  saveState(store.getState());
});

ReactDOM.render(
  (<Provider store={store}>
     <ConnectedRouter history={history}>
       <App />
     </ConnectedRouter>
   </Provider>),
  document.getElementById('root'));
registerServiceWorker();
