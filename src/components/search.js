import React from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import Card, { CardMedia } from 'material-ui/Card';
import TextField from 'material-ui/TextField';

import {
  addErrorMessageQuery,
  fetchTracks } from '../actions';
import { getErrorMessageQuery } from '../selectors';
import {
  ROUTING_BASE_PATH_MAPPED as basePath
} from '../constants/envMappedConstants.js';
import speaker from '../imgs/speaker.jpg';
import { control } from '../shared-styles/';

const root = `
  width: inherit;
  height: inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const card = `
  width: 300px;
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
  width: 80%;
`;

const sheet = {
  card,
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
    };

    // So that on page refresh, we don't have lingering error messages.
    this.props.addErrorMessageQuery('');
  }

  handleChange = (ev) => {
    this.setState({searchValue: ev.target.value});
  }

  handleKeyUp = async (ev) => {
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
    const imgSrc = `${basePath}${speaker.slice(1)}`;

    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardMedia image={imgSrc} className={classes.cover}>
          </CardMedia>
          <div className={classes.control}>
            <TextField
             id="search"
             placeholder="Search by song"
             type="search"
             className={classes.searchBar}
             margin="none"
             onChange={this.handleChange}
             onKeyUp={this.handleKeyUp}
             value={this.state.searchValue}
             FormHelperTextProps={{className: classes.errorMessage}}
             helperText={errorMessageQuery}
            />
          </div>
        </Card>
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
