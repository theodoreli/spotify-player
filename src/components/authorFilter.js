import React, { Component } from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import Button from 'material-ui/Button';
import Popover from 'material-ui/Popover';
import TextField from 'material-ui/TextField';

import { addAuthorFilter } from '../actions';
import { buttonArrow, checkmarkContainer, closeImg,
         header, li, popover, searchWrapper, ul } from '../shared-styles/filter';

const root = `
  display: flex;
  justify-content: flex-end;
  background-color: #f6f8fa;
  border: 1px solid #e1e4e8;
  border-radius: 3px 3px 0 0;
`;

const avatar = `
  width: 20px;
  height: 20px;
  margin-right: 8px;
  border-radius: 3px;
`;

const sheet = {
  avatar,
  buttonArrow,
  checkmarkContainer,
  closeImg,
  header,
  li,
  popover,
  root,
  searchWrapper,
  ul,
};

class AuthorFilter extends Component {
  /*
   * Popover design pattern:
   * https://material-ui-next.com/utils/popovers/
   * inspiration: https://codesandbox.io/s/q35rv35649
   */

  state = {
    open: false,
    dataCollection: [],
    searchValue: '',
    selectedAuthors: new Set([]),
  };

  handleClick = event => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = (ev) => {
    this.setState({searchValue: ev.target.value.toLocaleLowerCase()});
  };

  handleAuthorClick = author => ev => {
    /*
     * Toggle author membership in Set
     * Then dispatch this updated membership
     */
    const sa = new Set(this.state.selectedAuthors);
    sa.has(author) ? sa.delete(author): sa.add(author);

    this.setState({
      selectedAuthors: sa,
    }, () => {
      this.props.dispatch(addAuthorFilter(Array.from(sa)));
    });
  };

  anchorEl = null;

  static getDerivedStateFromProps(nextProps, prevState) {
    const getAuthorDataCollection = () => {
      /*
       * This helper function accomplishes 3 things
       * - Sorting items alphabetically by author
       * - Add a checkmark field defaulting to false
       * - Remove duplicates
       */
      let dataCollection = nextProps.data.map( el => (
        {...el.user, _isCheckmarked: false}
      ));
      dataCollection = dataCollection.sort((a,b) => {
        let alc = String.prototype.toLocaleLowerCase.call(a.login);
        let blc = String.prototype.toLocaleLowerCase.call(b.login);
        return String.prototype.localeCompare.call(alc, blc);
      });

      // Remove duplicates with the filter condition that:
      //   the index is the same as the first index of the element found.
      dataCollection = dataCollection.filter((el, index, arr) => {
        return arr.findIndex(elSearch => elSearch.login === el.login ) === index;
      });

      return dataCollection;
    };

    return Object.assign(prevState, {dataCollection: getAuthorDataCollection()});
  }

  render() {
    const tp = this.props;

    const userMapper = (el, index) => (
      <li className={tp.classes.li} key={index} onClick={this.handleAuthorClick(el.login)}>
        <span className={tp.classes.checkmarkContainer}>{ el._isCheckmarked ? getCheckmark(): null }</span>
        <img src={el.avatar_url} className={tp.classes.avatar} alt="User avatar"/>
        {el.login}
      </li>
    );

    const getX = () => (
      <svg role="img" aria-label="Close" viewBox="0 0 12 16" version="1.1"
        width="20" height="20"
        className={tp.classes.closeImg}
        onClick={this.handleClose}
      >
        <path d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48z">
        </path>
      </svg>
    );

    const getCheckmark = () => (
      <svg viewBox="0 0 12 16" version="1.1" width="12" height="16">
        <path d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5z"></path>
      </svg>
    );

    const transformDataCollection = collection => {
      /*
       * Two transforms applied to our data
       * 1. If the author is in the list of selectedAuthors, mutate the dataCollection.
       * 2. If we have a search value, show only authors that match the search query.
       */
      const selectedAuthorsTransform = col => {
        // If the author is in the list of selectedAuthors, mutate the dataCollection.
        return col.map(el => {
          // Look to see if this login is contained within the set of selected authors
          el._isCheckmarked = Array.from(this.state.selectedAuthors).indexOf(el.login) > -1 ? true: false;
          return el
        });
      }

      const searchValueTransform = col => {
        const sv = this.state.searchValue;
        if (!sv) {
          return col
        };

        return col.filter(author => author.login.toLocaleLowerCase().indexOf(sv) > -1);
      }

      const transforms = [selectedAuthorsTransform, searchValueTransform];

      // Transform pipeline
      return transforms.reduce((acc, currentTransform) => {
        return currentTransform(acc)
      }, collection)
    }

    const transformedDataCollection = transformDataCollection(this.state.dataCollection);

    return (
      <React.Fragment>
        <Button
          onClick={this.handleClick}
          buttonRef={node => {
            this.anchorEl = node
          }}
        >
          Author <span className={tp.classes.buttonArrow}></span>
        </Button>
        { /* Warning: do not give classes to popover.
             It will ruin the position gleaned from the anchorEl */}
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
              Filter by author
              { getX() }
            </div>
            <div className={tp.classes.searchWrapper}>
              <TextField
                id="search"
                label="Filter users"
                type="search"
                className={tp.classes.search}
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                value={this.state.searchValue}
                onChange={this.handleChange}
              />
            </div>
            <ul onClick={this.handleUserClick} className={tp.classes.ul}>
              { transformedDataCollection.map(userMapper) }
            </ul>
          </div>
        </Popover>
      </React.Fragment>
    )
  }
}

const connected = connect()(AuthorFilter);
export default injectSheet(sheet)(connected);
