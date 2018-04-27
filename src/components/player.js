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
import ProgressBar from '../components/progressBar.js';

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
  constructor(props) {
    super(props);
    this.audio = React.createRef();
    this.state = {
      trackIndex: 0,
      isPaused: false,
      audioCurrentTime: 0,
      audioDuration: 100,
    };
  }

  componentDidMount() {
    this.audioMetaInterval = setInterval(() => {
        console.log(this.audio.current)
        console.log(this.audio)
      this.setState({
        audioCurrentTime: this.audio.current.currentTime || 0,
        audioDuration: this.audio.current.duration || 100,
      });
    }, 200)
  }

  componentWillUnmount() {
    clearInterval(this.audioMetaInterval);
  }

  handleBack = () => {
    this.props.history.push('/logged-in/search')
  }

  handlePause = () => {
    this.audio.current.pause();
    this.setState({isPaused: true});
  }

  handlePlay = () => {
    this.audio.current.play();
    this.setState({isPaused: false});
  }

  handleNext = () => {
    this.setState({trackIndex: this.state.trackIndex + 1});
  }

  handlePrev = () => {
    const trackIndex = this.state.trackIndex;
    if (trackIndex === 0 ) {
      this.setState({trackIndex: 0})
    } else {
      this.setState({trackIndex: trackIndex - 1});
    }
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

    const getArtists = artists => {
      let result = artists[0].name;

      if (artists.length === 1) {
        return result
      }

      let featuredArtists = artists.slice(1).map(artist => artist.name).join(', ');
      result += ' feat. ' + featuredArtists;

      return result
    }

    const artists = getArtists(track.artists);
    const albumImg = track.album.images[1].url;

    const trackProps = {albumImg, trackName, artists};

    const progressBarProps = {
      duration: this.state.audioDuration,
      currentTime: this.state.audioCurrentTime,
    };

    return (
      <div className={tp.classes.root}>
        <audio src={audioSrc} autoPlay onEnd ref={this.audio} />
        <TrackCover {...trackProps} />
        <ProgressBar {...progressBarProps} />
        <CardContent className={tp.classes.control}>
          <IconButton aria-label="Back">
            <ArrowBack onClick={this.handleBack} />
          </IconButton>
          <IconButton aria-label="Previous">
            <SkipPreviousIcon onClick={this.handlePrev} />
          </IconButton>
          <IconButton aria-label="Play/Pause">
            { !this.state.isPaused ? <PauseIcon onClick={this.handlePause} />
                                   : <PlayArrowIcon onClick={this.handlePlay} className={tp.classes.playIcon} /> }
          </IconButton>
          <IconButton aria-label="Next">
            <SkipNextIcon onClick={this.handleNext}/>
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

