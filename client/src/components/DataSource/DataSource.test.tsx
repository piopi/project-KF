import React from 'react';
import { render } from '@testing-library/react';
import MatchMediaMock from 'jest-matchmedia-mock';
import DataSource from './DataSource';

let matchMedia: MatchMediaMock;
beforeAll(() => {
  matchMedia = new MatchMediaMock();
});

afterEach(() => {
  matchMedia.clear();
});

test('Render a DataSource ', () => {
  const { container } = render(<DataSource name="test" />);
  expect(container).toHaveTextContent('test');
});
