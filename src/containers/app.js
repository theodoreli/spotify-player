import React, { Component } from 'react';
import { Switch , Redirect, Route, withRouter } from 'react-router';
import { connect } from 'react-redux';
import injectSheet, {JssProvider} from 'react-jss';

import { loginIfNeeded } from '../actions';
import { ROUTING_BASE_PATH_MAPPED as basePath } from '../constants/envMappedConstants.js';
import Search from '../components/search.js';
import Player from '../components/player.js';

const redirectMessage = `
  width: 400px;
  font-size: 24px;
  font-weight: 300;
`;

const root = `
  display: flex;
  justify-content: center;
  align-items: center;
  width: inherit;
  height: inherit
`;

const compatWarning = `
  font-size: 14px;
`;

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
  },
  compatWarning,
  redirectMessage,
  root,
};

class App extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.loginIfNeeded();
    }, 1000);
  }

  render() {
    const { classes } = this.props;
    const RedirectMessage = () => (
      <div className={classes.root}>
        <div className={classes.redirectMessage}>
          <p>Welcome!</p>
          <p>If you are not logged through Spotify, you will be redirected there.</p>
          <p>Otherwise, you will be redirected to the song search page.</p>
          <p className={classes.compatWarning}>
            This web app is compatible with Chrome. Other browsers have not yet been verified.
          </p>
        </div>
      </div>
    );

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
