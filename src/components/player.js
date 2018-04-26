import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import { Route, Redirect } from 'react-router';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import Typography from 'material-ui/Typography';

import { addTracks } from '../actions';
import { control } from '../shared-styles/';
import TrackCover from '../components/trackCover.js';

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
  control,
  cover,
  root,
};

class Player extends React.Component {
  state = {
    trackIndex: 0,
    isPaused: false,
  }
  componentDidMount() {
    // play song
  }

  handleChange = (ev) => {
    this.setState({searchValue: ev.target.value});
  }

  handleKeyUp = ev => {
    if (ev.key !== 'Enter') {
      return;
    }
  }

  handlePause = () => {
    const audio = document.getElementById('audio');
    audio.pause();
    this.setState({isPaused: true});
  }

  handlePlay = () => {
    const audio = document.getElementById('audio');
    audio.play();
    this.setState({isPaused: false});
  }

  render() {
    const tp = this.props;
    const trackIndex = this.state.trackIndex;
    if (trackIndex >= tp.appStore.tracks.length) {
      // TODO: implement a popup that says we have exhausted all previewable tracks
      this.props.history.push('/logged-in/search')
      return null; // so that we dont execute the rest of this render()
    }

    const track = tp.appStore.tracks[trackIndex];

    const audioSrc = track.preview_url;
    if (audioSrc === null) this.setState({trackIndex: this.state.trackIndex + 1});
    const trackName = track.name;
    // TODO: Cleanup this ternary.
    const artists = track.artists.length > 1 ? track.artists.reduce((acc, curr) => {
                                                 return `${acc} ${curr.name}`
                                               }, `${track.artists[0].name} feat. `)
                                             : track.artists[0].name;
    const albumImg = track.album.images[1].url;

    const trackProps = {albumImg, trackName, artists};

    // TODO: object members .duration and .currentTime can tell us where we are

    return (
      <div className={tp.classes.root}>
        <audio id="audio" src={audioSrc} autoPlay onEnd/>
        <TrackCover {...trackProps} />
        <CardContent className={tp.classes.control}>
          <IconButton aria-label="Search">
            <ArrowBack onClick={() => this.props.history.push('/logged-in/search')} />
          </IconButton>
          <IconButton aria-label="Previous">
            <SkipPreviousIcon />
          </IconButton>
          <IconButton aria-label="Play/pause">
            { !this.state.isPaused ? <PauseIcon onClick={this.handlePause}/>
                                   : <PlayArrowIcon onClick={this.handlePlay} className={tp.classes.playIcon} /> }
          </IconButton>
          <IconButton aria-label="Next">
            <SkipNextIcon onClick={()=>this.setState({trackIndex: this.state.trackIndex + 1})}/>
          </IconButton>
        </CardContent>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {appStore: state}
}
const connected = connect(mapStateToProps)(Player);
export default injectSheet(sheet)(connected);

