import React from 'react';
import { Switch , Redirect, Route } from 'react-router';

import Entry from './containers/entry.js';
import LoggedIn from './containers/loggedIn.js';

export default (
  <React.Fragment>
    <Route path="/" component={Entry}/>
    <Route path="/logged-in" component={LoggedIn}/>
    <Redirect to="/" />
  </React.Fragment>
);
