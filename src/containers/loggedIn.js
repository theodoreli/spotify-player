import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import { Route, Redirect } from 'react-router';
import Card, { CardContent } from 'material-ui/Card';

import Search from '../components/search.js';
import Player from '../components/player.js';

const root = `
  width: inherit;
  height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const card = `
  width: 300px;
`;

const sheet = {
  card,
  root,
};

class LoggedIn extends React.Component {
  state = {
    isSplash: true,
  }
  componentDidMount() {
    console.log(this.props)
    // if any of the searches fail, clear the storage, send them back to entry.

  }
  render() {
    const tp = this.props;

    return (
      <div className={tp.classes.root}>
        <Card className={tp.classes.card}>
          { this.state.isSplash ? (<Redirect to="/logged-in/search"/>)
                                : (<Redirect to="/logged-in/player"/>) }
          <Route exact path="/logged-in/search" component={Search}/>
          <Route exact path="/logged-in/player" component={Player}/>
        </Card>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {appStore: state}
}
const connected = connect(mapStateToProps)(LoggedIn);
export default injectSheet(sheet)(connected);

