import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import injectSheet from 'react-jss';
import querystring from 'querystring';

import { fetchAccessToken } from '../actions/';
import { getAccessToken } from '../selectors/';
import {
  AUTH_REDIRECT_BASE_URL,
  AUTH_QUERY_PARAMS_PROD,
  AUTH_QUERY_PARAMS_DEV,
  ENV_PROD,
} from '../constants/apiConstants.js';

const root = `
  width: 980px;
`;

const sheet = {
  root,
};

class Entry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserLoggedIn: null,
    };
    const queryParams = process.env.NODE_ENV === ENV_PROD ?
                          AUTH_QUERY_PARAMS_PROD: AUTH_QUERY_PARAMS_DEV;
    this.redirectUrl = AUTH_REDIRECT_BASE_URL +
                         querystring.stringify(queryParams);
    this._isUserLoggedIn = this._isUserLoggedIn.bind(this);
  }

  _isUserLoggedIn() {
    if (this.props.accessToken) {
      return true;
    }

    return this.props.fetchAccessToken();
  }

  componentDidMount() {
    const isLoggedIn = this._isUserLoggedIn();
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
  return {accessToken: getAccessToken(state)}
}
const connected = connect(mapStateToProps, {
  fetchAccessToken
})(Entry);
export default injectSheet(sheet)(connected);
