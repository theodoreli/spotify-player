import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import { Route, Redirect } from 'react-router';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import TextField from 'material-ui/TextField';

import { addTracks } from '../actions';

const root = `
  width: inherit;
  height: inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const card = `
  width: 700px;
  height: 1200px;
`;

const cover = `
  width: 300px;
  height: 300px;
`;

const sheet = {
  card,
  root,
  cover,
};

class Search extends React.Component {
  state = {
    searchValue: '',

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
        if (response.status === 200) {
          this.props.dispatch(addTracks(response.data.tracks.items));
          this.props.history.push('/logged-in/player');
        }
      } catch (e) {
        console.log(e);
      }
    })();

  }

  render() {
    const tp = this.props;

    return (
      <div className={tp.classes.root}>
        <CardMedia image="https://i.scdn.co/image/985cc10acdbbedb6a16d7c74f9e23553e2b28dbc" className={tp.classes.cover}>
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

