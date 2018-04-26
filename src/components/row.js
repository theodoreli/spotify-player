import React from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';

const userAvatar = `
  width: 20px;
  height: 20px;
  border-radius: 2px;
`;

const listElement = `
  display: flex;
  justify-content: space-between;
  list-style: none;
  padding: 8px;
  border-top: 1px solid #e1e4e8;
  line-height: 1.25;
`;

const issueDetails = `
  margin-top: 4px;
  font-size: 12px;
  color: #586069;
`;

const issueStatus = `
  margin-right: 12px;
  fill: #28a745;
`;

const issueName = `
  font-weight: 600;
  font-size: 16px;
  color: #24292e;
`;

const label = `
  height: 20px;
  color: white;
  padding: 0.15em 4px;
  font-size: 12px;
  font-weight: 600;
  line-height: 15px;
  border-radius: 2px;
  box-shadow: inset 0 -1px 0 rgba(27,31,35,0.12);
`;

const rowMainInfo = `
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

const sheet = {
  issueDetails,
  issueName,
  issueStatus,
  label,
  listElement,
  rowMainInfo,
  userAvatar,
};

const Row = ({classes, rowData}) => {
  const dateCreated = new Date(rowData.created_at).toDateString();
  const issueName = rowData.title;
  const issueUrl = rowData.html_url;
  const number = rowData.id;
  const reporter = rowData.user.login;
  // const status = rowData.state;
  const assigneeCollection = rowData.assignees;
  const labelsCollection = rowData.labels;

  const labelMapper = (el, index) => (
    <span
      style={{backgroundColor: '#' + el.color}}
      className={classes.label}
      key={index}
    >
      { el.name }
    </span>
  );

  const assigneeMapper = (el, index) => (
    <React.Fragment key={index}>
      <img
        src={ el.avatar_url }
        className={classes.userAvatar}
        alt="User avatar"
      />
    </React.Fragment>
  );

  const getStatusSvg = () => (
    <svg viewBox="0 0 14 16" width="14" height="16" aria-hidden="true"
      className={classes.issueStatus}>
      <path d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"></path></svg>
  );

  return (
    <li className={classes.listElement}>
      <div className={classes.rowMainInfo}>
        { getStatusSvg() }
        <div className="rowMainText">
          <div className={classes.issueName}>
            <a href={issueUrl}>{ issueName }</a> { labelsCollection.map(labelMapper) }
          </div>
          <div className={classes.issueDetails}>
            #{ number } opened on { dateCreated } by { reporter }
          </div>
        </div>
      </div>

      <div className="rowSideInfo">
        { assigneeCollection.map(assigneeMapper) }
      </div>
    </li>
  )
};

export default injectSheet(sheet)(Row);
