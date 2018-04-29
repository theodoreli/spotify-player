import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import injectSheet from 'react-jss';
import querystring from 'querystring';

import { fetchAccessToken } from '../actions/';

const root = `
  width: 980px;
`;

const sheet = {
  root,
};

class Entry extends Component {
  state = {
    isUserLoggedIn: null,
  }

  redirectUrl = `https://accounts.spotify.com/authorize?`;
  queryParams = {
    client_id: 'b0a17325663147199c8e921ffb85d000',
    response_type: 'token',
    redirect_uri: 'https://localhost:3000',
  }

  componentDidMount() {
    this.redirectUrl += querystring.stringify(this.queryParams)

    const isUserLoggedIn = () => {
      if (this.props.appStore.app.accessToken) {
        return true;
      }

      return this.props.fetchAccessToken();
    }

    const isLoggedIn = isUserLoggedIn();
    const timeout = isLoggedIn ? 0: 2000;
    setTimeout(() => {
      this.setState({isUserLoggedIn: isLoggedIn});
    }, timeout);
  }

  render() {
    const tp = this.props;
    const renderWelcome = () => (
      <div className={tp.classes.root}>
        Welcome! Will redirect you in a moment if you need to login
      </div>
    )

    return (
      <div>
        { this.state.isUserLoggedIn === null ? renderWelcome()
          : this.state.isUserLoggedIn
            ? (<Redirect push to="/search"/>)
            : window.location.replace(this.redirectUrl) }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {appStore: state}
}
const connected = connect(mapStateToProps, {
  fetchAccessToken
})(Entry);
export default injectSheet(sheet)(connected);
