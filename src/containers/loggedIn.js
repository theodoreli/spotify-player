import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import { Route, Redirect } from 'react-router';
import Card, { CardContent } from 'material-ui/Card';

import Search from '../components/search.js';

const root = `
  width: inherit;
  height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const card = `
  width: 700px;
  height: 1200px;
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
        <Card>
          hi i am logged in
          { this.state.isSplash ? (<Redirect to="/logged-in/splash"/>)
                                : (<Redirect to="/logged-in/player"/>) }
          <Route exact path="/logged-in/splash" component={Search}/>
          <Route exact path="/logged-in/player" render={()=> "player render"}/>

          <div className={tp.classes.cover}>
          </div>
          <div className={tp.classes.control}>
          </div>
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

