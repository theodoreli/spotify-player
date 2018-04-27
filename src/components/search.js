import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import { Route, Redirect } from 'react-router';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import TextField from 'material-ui/TextField';

import { addAccessToken, addTracks } from '../actions';
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

    if (this.state.searchValue === '') {
      this.setState({errorMessage: 'Oops! Looks like there wasn\'t any search terms.'});
      return;
    }

    try {
      const search = this.state.searchValue;
      const headers = {Authorization: `Bearer ${this.props.appStore.accessToken}`};
      const response = await axios.get(`https://api.spotify.com/v1/search`
                       + `?q=${search}`
                       + `&type=track`
                       + `&limit=50`,
                       {headers})
      console.log(response);
      if (response.data.tracks.items.length === 0) {
        this.setState({
          errorMessage: `Looks like your search "${this.state.searchValue}" `
                        + `didn't return any tracks. Try another search term`
        });
        return;
      }
      const filtered = response.data.tracks.items.filter((item) => item.preview_url);
      this.props.dispatch(addTracks(filtered));
      this.props.history.push('/logged-in/player');
    } catch (err) {
      if (err.response.status === 401) {
        // TODO prompt user that we are going thru login.

        // clear redux properties and clear localstorage so that we don't try to read
        // accessToken. If the app reads a value in accessToken, it assumes validity.
        // perhaps putting a TTL is good
        this.props.dispatch(addTracks(null));
        this.props.dispatch(addAccessToken(null));
        this.props.history.push('/');
      }
    }

  }

  render() {
    const { classes } = this.props;

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
           helperText={this.state.errorMessage}
          />
        </CardContent>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {appStore: state}
}
const connected = connect(mapStateToProps)(Search);
export default injectSheet(sheet)(connected);

