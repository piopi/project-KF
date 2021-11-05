import React from 'react';
import { render } from '@testing-library/react';
import MatchMediaMock from 'jest-matchmedia-mock';
import Service from './Service';

let matchMedia: MatchMediaMock;
beforeAll(() => {
  matchMedia = new MatchMediaMock();
});

afterEach(() => {
  matchMedia.clear();
});

test('Render a Service', () => {
  const { container } = render(<Service name="test" src="/link" />);
  expect(container).toHaveTextContent('test');
  expect(container.querySelector('img')).toHaveAttribute('src', '/link');
});
