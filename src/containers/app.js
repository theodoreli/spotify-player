import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Switch , Redirect, Route, withRouter } from 'react-router';
import { connect } from 'react-redux';
import injectSheet, {JssProvider} from 'react-jss';

import Entry from '../containers/entry.js';
import Search from '../components/search.js';
import Player from '../components/player.js';
import { ENV_PROD } from '../constants/apiConstants.js';

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
  componentDidMount() {
  }

  render() {
    const basePath = process.env.NODE_ENV === ENV_PROD ?
                       '/spotify-player/': '/';
    return (
      <JssProvider>
        <Switch>
          <Route exact path={`${basePath}`} component={Entry}/>
          <Route exact path={`${basePath}search`} component={Search}/>
          <Route exact path={`${basePath}player`} component={Player}/>
          <Redirect to={`${basePath}`} />
        </Switch>
      </JssProvider>
    )
  }
}
function mapStateToProps(state) {
  return {allState: state}
}

const connected = connect(mapStateToProps)(App);
const connectedWithRouter = withRouter(connected)
export default injectSheet(sheet)(connectedWithRouter);
