// Your job:
// Test the case where the items provided is empty:
//   <ItemList items={[]} />
// Test the case where there are items in the list:
//   <ItemList items={['apple', 'orange', 'pear']} />
//
// Don't overthink it. This is just a practice run to warm you up
// to testing react components.

import React from 'react'
import ReactDOM from 'react-dom'
import ItemList from '../item-list'

// and here's an outline example of your first test:
//   Create a "container" to render your component into (💰 use document.createElement('div'))
//
//   Render your component (💰 use ReactDOM.render(JSX, container))
//
//   Make your assertion(s) on the textContent of the container
//   (💰 expect's toMatch function might be what you want
//   for example: `expect('some text content').toMatch('text')`)
//

test(`empty list`, () => {
  const container = document.createElement('div');
  ReactDOM.render(<ItemList items={[]}/>, container);
  expect(container.textContent).toMatch('no items');
});
// For your second test, it will be very similar to the first.
test(`list with items`, () => {
  const container = document.createElement('div');
  ReactDOM.render(<ItemList items={['foo', 'bar']}/>, container);
  expect(container.textContent).toMatch('foo');
  expect(container.textContent).toMatch('bar');
});
