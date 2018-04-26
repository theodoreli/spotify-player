import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import injectSheet, { JssProvider } from 'react-jss';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import displayIssues from '../reducers';
import Table from './table.js';

configure({ adapter: new Adapter() });

const store = createStore(displayIssues);

test('Table test suite', () => {
  // Render a checkbox with label in the document
  const checkbox = shallow(<Provider store={store}>
                             <JssProvider>
                               <Table/>
                             </JssProvider>
                           </Provider>);
  // TODO: Finish this test. Am stuck on on getting state to update
  // in componentDidMount.
});
