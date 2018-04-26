import injectSheet from 'react-jss';
import React from 'react';
import Typography from 'material-ui/Typography';

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
    trackName,
    artists,
    meta,
  root,
};

const TrackCover = ({classes, trackName, artists, albumImg}) => (
  <div
   className={classes.root}
   style={{backgroundImage: `url(${albumImg})`}}
  >
    <div className={classes.meta}>
      <span className={classes.trackName}>{trackName}</span>
      <span className={classes.artists}>{artists}</span>
    </div>
  </div>
);

export default injectSheet(sheet)(TrackCover);
