import React, { Component } from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import Button from 'material-ui/Button';
import Popover from 'material-ui/Popover';

import { addLabelsFilter } from '../actions';
import { buttonArrow, closeImg,
         header, li, popover, ul } from '../shared-styles/filter';

const root = `
  display: flex;
  justify-content: flex-end;
  background-color: #f6f8fa;
  border: 1px solid #e1e4e8;
  border-radius: 3px 3px 0 0;
`;

const labelColor = `
  display: inline-block;
  width: 14px;
  height: 14px;
  margin-top: -1px;
  margin-right: 2px;
  vertical-align: middle;
  border-radius: 3px;
`;

const sheet = {
  buttonArrow,
  closeImg,
  header,
  labelColor,
  li,
  popover,
  root,
  ul,
};

class LabelsFilter extends Component {

  /*
   * Popover design pattern:
   * https://material-ui-next.com/utils/popovers/
   * inspiration: https://codesandbox.io/s/q35rv35649
   */

  state = {
    open: false,
    dataCollection: [],
  };

  handleClick = event => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleUserClick = (ev) => {
    if (ev.delegateTarget === ev.target) return;

    const index = [].indexOf.call(ev.currentTarget.children, ev.target);
    const id = this.dataCollection[index].id;

    this.props.dispatch(addLabelsFilter(id));
  };

  anchorEl = null;

  render() {
    const tp = this.props;

    const getLabelsDataCollection = () => {
      // unique collection of ids
      let dataCollection = tp.data.map( el => el.labels )
      let dict = {};
      dataCollection.forEach(el => {
        if (el.length === 0) return;

        el.forEach(innerEl => {
          if (innerEl.id in dict) return;
          dict[innerEl.id] = innerEl
        })
      });

      dataCollection = Object.values(dict);
      return dataCollection;
    };

    this.dataCollection = getLabelsDataCollection();

    const userMapper = (el, index) => (
      <li className={tp.classes.li} key={index}>
        <span style={{ backgroundColor: '#' + el.color }} className={tp.classes.labelColor}>
          &nbsp;
        </span>
        { el.name }
      </li>
    );

    const getX = () => (
      <svg role="img" aria-label="Close" viewBox="0 0 12 16" version="1.1"
        width="12" height="16"
        className={tp.classes.closeImg}
        onClick={this.handleClose}
      >
        <path d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48z">
        </path>
      </svg>
    )

    return (
      <React.Fragment>
        <Button className={tp.classes.button}
          onClick={this.handleClick}
          buttonRef={node => {
            this.anchorEl = node
          }}
        >
          Labels <span className={tp.classes.buttonArrow}></span>
        </Button>
        { /*  do not give classes to popover. it will run the position gleaned from the anchorel*/}
        <Popover
          open={this.state.open}
          onClose={this.handleClose}
          anchorEl={this.anchorEl}
          anchorOrigin={{
            horizontal: 'right',
            vertical: 'bottom',
          }}
          transformOrigin={{
            horizontal: 'right',
            vertical: 'top',
          }}
        >
          <div className={tp.classes.popover}>
            <div className={tp.classes.header}>
              Filter by label
              { getX() }
            </div>
            <ul onClick={this.handleUserClick} className={tp.classes.ul}>
              { this.dataCollection.map(userMapper) }
            </ul>
          </div>
        </Popover>
      </React.Fragment>
    )
  }
}

const connected = connect()(LabelsFilter);
export default injectSheet(sheet)(connected);
