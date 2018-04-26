import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';

const sheet = {};

class LoggedIn extends React.Component {
  componentDidMount() {

  }
  render() {
    return (
      <div>
        hi i am logged in
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {appStore: state}
}
const connected = connect(mapStateToProps)(LoggedIn);
export default injectSheet(sheet)(connected);

