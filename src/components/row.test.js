import React from 'react';
import Row from './row.js';
import renderer from 'react-test-renderer';

import singleRes from '../mock-data/single-response-object.js';

test('Row renders as expected', () => {
  const component = renderer.create(
    <Row rowData={singleRes}/>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
