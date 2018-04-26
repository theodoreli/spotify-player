import React from 'react';
import { Switch , Route } from 'react-router';

import Entry from './containers/entry.js';

export default (
  <Switch>
    <Route component={Entry}/>
  </Switch>
);
