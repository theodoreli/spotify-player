import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import { Route, Redirect } from 'react-router';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import TextField from 'material-ui/TextField';

import { addAccessToken, addTracks } from '../actions';
import speaker from '../img/speaker.jpg';

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

const control = `
  display: flex;
  height: 100px;
  width: 90%;
  justify-content: center;
`;

const errorMessage = `
  color: red;
  overflow: hidden;
`;

const searchBar = `
  width: inherit%;
`;

const sheet = {
  cover,
  control,
  errorMessage,
  root,
  searchBar,
};

class Search extends React.Component {
  state = {
    searchValue: '',
    errorMessage: '',
  }
  componentDidMount() {
    console.log(this.props)
    // if any of the searches fail, clear the storage, send them back to entry.

  }

  handleChange = (ev) => {
    this.setState({searchValue: ev.target.value});
  }

  handleKeyUp = ev => {
    if (ev.key !== 'Enter') {
      return;
    }

    if (this.state.searchValue === '') {
      this.setState({errorMessage: 'Oops! Looks like there wasn\'t any search terms.'});
      return;
    }

    (async () => {
      try {
        const search = this.state.searchValue;
        const headers = {Authorization: `Bearer ${this.props.appStore.accessToken}`};
        const response = await axios.get(`https://api.spotify.com/v1/search`
                         + `?q=${search}`
                         + `&type=track`
                         + `&limit=20`,
                         {headers})
        console.log(response);
        // TODO: add response handler for unauthorized. means we need to login again
        if (response.data.tracks.items.length === 0) {
          this.setState({
            errorMessage: `Looks like your search "${this.state.searchValue}" `
                          + `didn't return any tracks. Try another search term`
          });
          return;
        }

        this.props.dispatch(addTracks(response.data.tracks.items));
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
    })();

  }

  render() {
    const tp = this.props;
    const helper = () => (
      <React.Fragment>
        helper
      </React.Fragment>
    );

    return (
      <div className={tp.classes.root}>
        <CardMedia image={speaker} className={tp.classes.cover}>
        </CardMedia>
        <CardContent className={tp.classes.control}>
          <TextField
           id="search"
           label="Search by song"
           type="search"
           className={tp.classes.searchBar}
           margin="normal"
           onChange={this.handleChange}
           onKeyUp={this.handleKeyUp}
           value={this.state.searchValue}
           FormHelperTextProps={{className: tp.classes.errorMessage}}
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

