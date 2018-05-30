import React from 'react';
import injectSheet from 'react-jss';

const redirectMessage = `
  width: 400px;
  font-size: 24px;
  font-weight: 300;
`;

const root = `
  display: flex;
  justify-content: center;
  align-items: center;
  width: inherit;
  height: inherit
`;

const compatWarning = `
  font-size: 14px;
`;

const sheet = {
  compatWarning,
  redirectMessage,
  root,
};

const RedirectMessage = ({ classes }) => (
  <div className={classes.root}>
    <div className={classes.redirectMessage}>
      <p>Welcome!</p>
      <p>If you are not logged through Spotify, you will be redirected there.</p>
      <p>Otherwise, you will be redirected to the song search page.</p>
      <p className={classes.compatWarning}>
        This web app is compatible using Chrome. Other browsers have not yet been verified.
      </p>
    </div>
  </div>
);

export default injectSheet(sheet)(RedirectMessage);
