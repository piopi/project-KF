import React from 'react';
import { render } from '@testing-library/react';
import MatchMediaMock from 'jest-matchmedia-mock';
import { Provider } from 'react-redux';
import SearchElement from './SearchElement';
import SearchTags from './SearchTags';
import store from '../../store/store';

let matchMedia: MatchMediaMock;
beforeAll(() => {
  matchMedia = new MatchMediaMock();
});

afterEach(() => {
  matchMedia.clear();
});

test('Render a searchMenu Element', () => {
  const { container } = render(
    <Provider store={store}>
      <SearchElement name="test" type="test.type" />
    </Provider>,
  );
  expect(container).toHaveTextContent('test');
  expect(container).toHaveTextContent('test.type');
});

test('Render the tags', () => {
  const { container } = render(<SearchTags toggleTags={(tag) => tag === 'test'} selectedTags={['test']} />);
  expect(container).toHaveTextContent('Service');
  expect(container).toHaveTextContent('Data Source');
  expect(container).toHaveTextContent('Visualization');
});
