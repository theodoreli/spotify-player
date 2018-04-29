import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import injectSheet, {JssProvider} from 'react-jss';

import routes from '../routes.js';

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
          { routes }
      </JssProvider>
    )
  }
}
function mapStateToProps(state) {
  return {allState: state}
}

const connected = connect(mapStateToProps)(App);
export default injectSheet(sheet)(connected);
