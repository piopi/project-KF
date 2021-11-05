import React from 'react';
import { render } from '@testing-library/react';
import MatchMediaMock from 'jest-matchmedia-mock';
import SearchElement from './SearchElement';
import SearchTags from './SearchTags';

let matchMedia: MatchMediaMock;
beforeAll(() => {
  matchMedia = new MatchMediaMock();
});

afterEach(() => {
  matchMedia.clear();
});

test('Render a searchMenu Element', () => {
  const { container } = render(<SearchElement name="test" type="test.type" />);
  expect(container).toHaveTextContent('test');
  expect(container).toHaveTextContent('test.type');
});

test('Render the tags', () => {
  const { container } = render(<SearchTags />);
  expect(container).toHaveTextContent('Service');
  expect(container).toHaveTextContent('Data Source');
  expect(container).toHaveTextContent('Visualization');
});
