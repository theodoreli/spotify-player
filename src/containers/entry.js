import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import injectSheet from 'react-jss';
import querystring from 'querystring';

import { fetchAccessToken } from '../actions/';
import { getAccessToken } from '../selectors/';
import { AUTH_REDIRECT_BASE_URL } from '../constants/apiConstants.js';
import {
  ROUTING_BASE_PATH_MAPPED as basePath,
  AUTH_QUERY_PARAMS_MAPPED as queryParams,
} from '../constants/envMappedConstants.js';

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
        Welcome! If you are not logged through Spotify, you will be redirected there.
        Otherwise, you will be redirected to the song search page.
      </div>
    )

    return (
      <div>
        { this.state.isUserLoggedIn === null ? renderWelcome()
          : this.state.isUserLoggedIn
            ? (<Redirect push to={`${basePath}search`} />)
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
