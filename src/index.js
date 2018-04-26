import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import displayIssues from './reducers';
import App from './containers/app.js';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(displayIssues);

ReactDOM.render((<Provider store={store}><App/></Provider>), document.getElementById('root'));
registerServiceWorker();
