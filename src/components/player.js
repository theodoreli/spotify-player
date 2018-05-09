import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import injectSheet from 'react-jss';
import Card from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';

import { control } from '../shared-styles/';
import TrackCover from '../components/trackCover.js';
import ProgressBar from '../components/progressBar.js';
import { ROUTING_BASE_PATH_MAPPED as basePath } from '../constants/envMappedConstants.js';

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
`;

const search = `
  position: absolute;
  left: 0px;
`;

const sheet = {
  search,
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
      audioCurrentTime: 0,
      audioDuration: 100,
      isPaused: false,
      trackIndex: 0,
    };
  }

  componentDidMount() {
    this.audioMetaInterval = setInterval(() => {
      this.setState({
        audioCurrentTime: this.audio.current.currentTime || 0,
        audioDuration: this.audio.current.duration || 100,
      });
    }, 200)
  }

  componentWillUnmount() {
    clearInterval(this.audioMetaInterval);
  }

  handleSearch = () => {
    this.props.dispatch(push(`${basePath}search`));
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
    if (this.state.trackIndex + 1 >= this.props.state.app.tracks.length) {
      // TODO: implement a popup that says we have exhausted all previewable tracks
      this.props.dispatch(push(`${basePath}search`));
      return;
    }

    this.setState({trackIndex: this.state.trackIndex + 1});
  }

  handlePrev = () => {
    const { trackIndex } = this.state;
    if (trackIndex === 0 ) {
      this.setState({trackIndex: 0})
    } else {
      this.setState({trackIndex: trackIndex - 1});
    }
  }

  _getArtists = artists => {
    let result = artists[0].name;

    if (artists.length === 1) {
      return result
    }

    const featuredArtists = artists.slice(1).map(artist => artist.name).join(', ');
    result += ' feat. ' + featuredArtists;

    return result
  }

  render() {
    const { classes } = this.props;
    const { isPaused, trackIndex } = this.state;
    const track = this.props.state.app.tracks[trackIndex];
    const audioSrc = track.preview_url;

    const trackCoverProps = {
      albumImg: track.album.images[1].url,
      artists: this._getArtists(track.artists),
      trackName: track.name,
    };

    const progressBarProps = {
      duration: this.state.audioDuration,
      currentTime: this.state.audioCurrentTime,
    };

    return (
      <div className={classes.root}>
        <Card className={classes.card} >
          <audio src={audioSrc} autoPlay ref={this.audio} />
          <TrackCover {...trackCoverProps} />
          <ProgressBar {...progressBarProps} />
          <div className={classes.control} >
            <IconButton
              aria-label="Search"
              onClick={this.handleSearch}
              className={classes.search}
            >
              <SearchIcon />
            </IconButton>
            <IconButton aria-label="Previous" onClick={this.handlePrev} >
              <SkipPreviousIcon />
            </IconButton>
            <IconButton aria-label="Play/Pause" onClick={
             !isPaused ? this.handlePause: this.handlePlay}>
              { !isPaused
                  ? <PauseIcon />
                  : <PlayArrowIcon />
              }
            </IconButton>
            <IconButton aria-label="Next" onClick={this.handleNext}>
              <SkipNextIcon />
            </IconButton>
          </div>
        </Card>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {state}
}

const connected = connect(mapStateToProps)(Player);
export default injectSheet(sheet)(connected);
