import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import { Route, Redirect } from 'react-router';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import TextField from 'material-ui/TextField';

import {
  addAccessToken,
  addTracks,
  addErrorMessageQuery,
  fetchTracks } from '../actions';
import { getErrorMessageQuery } from '../selectors';
import speaker from '../img/speaker.jpg';
import { control } from '../shared-styles/';

const root = `
  width: inherit;
  height: inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const cover = `
  width: 300px;
  height: 300px;
  background-position: right;
`;

const errorMessage = `
  color: red;
  overflow: hidden;
`;

const searchBar = `
  width: inherit;
`;

const sheet = {
  cover,
  control,
  errorMessage,
  root,
  searchBar,
};

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      errorMessage: '',
    };

    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  handleChange = (ev) => {
    this.setState({searchValue: ev.target.value});
  }

  async handleKeyUp(ev) {
    if (ev.key !== 'Enter') {
      return;
    }

    const { searchValue } = this.state;
    this.props.fetchTracks(searchValue);
  }

  componentWillUnmount() {
    this.props.addErrorMessageQuery('');
  }

  render() {
    const { classes, errorMessageQuery } = this.props;

    return (
      <div className={classes.root}>
        <CardMedia image={speaker} className={classes.cover}>
        </CardMedia>
        <CardContent className={classes.control}>
          <TextField
           id="search"
           label="Search by song"
           type="search"
           className={classes.searchBar}
           margin="normal"
           onChange={this.handleChange}
           onKeyUp={this.handleKeyUp}
           value={this.state.searchValue}
           FormHelperTextProps={{className: classes.errorMessage}}
           helperText={errorMessageQuery}
          />
        </CardContent>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    errorMessageQuery: getErrorMessageQuery(state)
  }
};

const connected = connect(mapStateToProps, {
  fetchTracks,
  addErrorMessageQuery,
})(Search);

export default injectSheet(sheet)(connected);
