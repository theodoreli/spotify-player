import React, { Component } from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';

import AuthorFilter from './authorFilter.js';
import LabelsFilter from './labelsFilter.js';

const root = `
  display: flex;
  justify-content: flex-end;
  background-color: #f6f8fa;
  border: 1px solid #e1e4e8;
  border-radius: 3px 3px 0 0;
`;

const sheet = {
  root,
};

class TableHeader extends Component {
  render() {
    const tp = this.props;

    return (
      <div className={tp.classes.root}>
        <AuthorFilter {...tp} />
        <LabelsFilter {...tp} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {allState: state}
}
const connected = connect(mapStateToProps)(TableHeader);
export default injectSheet(sheet)(connected);
