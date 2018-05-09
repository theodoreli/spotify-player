import injectSheet from 'react-jss';
import React from 'react';
import PT from 'prop-types';

const root = `
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: inherit;
  height: 300px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const rootBg = {
  backgroundImage: data => `url(${data.albumImgSrc})`
};

const meta = `
  display: flex;
  flex-direction: column;
  padding: 8px;
  color: white;
  background-color: rgba(4, 4, 3, 0.61);
`;

const trackName = `
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1.35417em;
`;

const artists = `
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5em;
`;

const sheet = {
  artists,
  meta,
  root,
  rootBg,
  trackName,
};

const TrackCover = ({classes, trackName, artist, albumImgSrc}) => (
  <div
   className={[classes.root, classes.rootBg].join(' ')}
  >
    <div className={classes.meta}>
      <span className={classes.trackName}>{trackName}</span>
      <span className={classes.artists}>{artist}</span>
    </div>
  </div>
);

TrackCover.propTypes = {
  albumImgSrc: PT.string.isRequired,
  artist: PT.string.isRequired,
  classes: PT.object.isRequired,
  trackName: PT.string.isRequired,
};

export default injectSheet(sheet)(TrackCover);
