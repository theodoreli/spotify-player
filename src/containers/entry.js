import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import injectSheet from 'react-jss';
import querystring from 'querystring';

import Row from '../components/row.js';
import TableHeader from '../components/tableHeader.js';

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
    // lets try and have this declarative. so create a flow: is logged in?
    // can achieve this with router props or just use logic here.

    this.redirectUrl += querystring.stringify(this.queryParams)
    const isUserLoggedIn = () => {

      let queryParams = window.location.search;
      if (queryParams) {
        if (queryParams[0] === '?') {
          queryParams = queryParams.slice(1);
        }
        const parsed = querystring.parse(queryParams);
        console.log(parsed);
        const accessToken = parsed.access_token;
        const error = parsed.error;

        if (error) {
          // notify user that need to retry
          return false;
        }

        if (accessToken) {
          // fiddle with access token.
          this.props.dispatch();
          // put acccess token in redux store. Need to see if this is safe.
          // then proceed to login page.
          return true;

        } else {return false}

        // do ajax request. if works, push login
        // attempt to login. if succesful, push to loggedin page
      }

      return false;
    }

    setTimeout(() => {
      this.setState({isUserLoggedIn: isUserLoggedIn()});
    }, 3000);

      /*
    let queryParams = window.location.search;
    if (queryParams) {
      if (queryParams[0] === '?') {
        queryParams = queryParams.slice(1);
      }
      let parsed = querystring.parse(queryParams);

      console.log(parsed);
      // do ajax request. if works, push login
      // attempt to login. if succesful, push to loggedin page
    } else {
      // prompt login
      this.props.history.push('login');

    }
    */
  }

  // TODO: use static getDerivedStateFromProps() in the future
  componentWillReceiveProps(nextProps) {
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
            ? (<Redirect to="logged-in"/>)
            : window.location.replace(this.redirectUrl) }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {appStore: state}
}
const connected = connect(mapStateToProps)(Entry);
export default injectSheet(sheet)(connected);
