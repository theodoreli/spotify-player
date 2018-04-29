import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Switch , Redirect, Route } from 'react-router';
import { connect } from 'react-redux';
import injectSheet, {JssProvider} from 'react-jss';

import Entry from '../containers/entry.js';
import Search from '../components/search.js';
import Player from '../components/player.js';

const sheet = {
  '@global': {
    'html, body, div#root': `
      height: 100%;
      width: 100%;
      margin: 0;
      padding: 0;

      font-family: 'Open Sans', sans-serif;
    `,
    'div, ul, li, span': `
      margin: 0;
      padding: 0;
    `,
    'a': `
      color: #24292e;
      text-decoration: none;
    `
  }
};

class App extends Component {
  render() {
    return (
      <JssProvider>
        <Switch>
          <Route exact path="/" component={Entry}/>
          <Route exact path="/search" component={Search}/>
          <Route exact path="/player" component={Player}/>
          <Redirect to="/" />
        </Switch>
      </JssProvider>
    )
  }
}
function mapStateToProps(state) {
  return {allState: state}
}

const connected = connect(mapStateToProps)(App);
export default injectSheet(sheet)(connected);
