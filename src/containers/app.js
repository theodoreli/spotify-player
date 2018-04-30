import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Switch , Redirect, Route, withRouter } from 'react-router';
import { connect } from 'react-redux';
import injectSheet, {JssProvider} from 'react-jss';

import { loginIfNeeded, redirectToSpotifyLoginIfNeeded } from '../actions';
import { ROUTING_BASE_PATH_MAPPED as basePath } from '../constants/envMappedConstants.js';
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
  componentDidMount() {
    this.props.loginIfNeeded();
  }

  render() {
    const renderWelcome = () => (
      <div>
        Welcome! If you are not logged through Spotify, you will be redirected there.
        Otherwise, you will be redirected to the song search page.
      </div>
    );

    return (
      <JssProvider>
        <Switch>
          <Route exact path={`${basePath}`} render={renderWelcome}/>
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

const connected = connect(mapStateToProps, {
  loginIfNeeded,
})(App);
const connectedWithRouter = withRouter(connected)
export default injectSheet(sheet)(connectedWithRouter);
