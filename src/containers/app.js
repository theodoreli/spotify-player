import React, { Component } from 'react';
import { Switch , Redirect, Route, withRouter } from 'react-router';
import { connect } from 'react-redux';
import injectSheet, {JssProvider} from 'react-jss';

import { loginIfNeeded } from '../actions';
import { ROUTING_BASE_PATH_MAPPED as basePath } from '../constants/envMappedConstants.js';
import Search from '../components/search.js';
import Player from '../components/player.js';
import RedirectMessage from '../components/redirect.js';

const sheet = {
  /*
   * Warning, there seems to be a react-scripts 'build' issue where if
   * you place a style object here, this style classname takes priority
   * over downstream classnames of the same name.
   *
   * Does not happen in 'development' but in 'production' from what I have
   * seen so far.
   */
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
  },
};

class App extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.loginIfNeeded();
    }, 1000);
  }

  render() {
    return (
      <JssProvider>
        <Switch>
          <Route exact path={`${basePath}`} component={RedirectMessage}/>
          <Route exact path={`${basePath}search`} component={Search}/>
          <Route exact path={`${basePath}player`} component={Player}/>
          <Redirect to={`${basePath}`} />
        </Switch>
      </JssProvider>
    )
  }
}

function mapStateToProps(state) {
  return {state}
}

const connected = connect(mapStateToProps, {
  loginIfNeeded,
})(App);
const connectedWithRouter = withRouter(connected)
export default injectSheet(sheet)(connectedWithRouter);
