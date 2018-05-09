import injectSheet from 'react-jss';
import React from 'react';
import PT from 'prop-types';

const root = `
  display: flex;
  width: inherit;
  height: 5px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const elapsed = `
  background-color: #da0000;
`;

const remaining = `
  background-color: #c1bbbb;
`;

const sheet = {
  root,
  elapsed,
  remaining,
};

const ProgressBar = ({classes, duration, currentTime}) => {
  const elapsedPercentage = Math.ceil((currentTime/duration) * 100);
  const compliment = 100 - elapsedPercentage;

  return (
    <div
     className={classes.root}
    >
      <div style={{width: `${elapsedPercentage}%`}} className={classes.elapsed}>
      </div>
      <div style={{width: `${compliment}%`}} className={classes.remaining}>
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  duration: PT.number.isRequired,
  classes: PT.object.isRequired,
  currentTime: PT.number.isRequired,
};

export default injectSheet(sheet)(ProgressBar);
