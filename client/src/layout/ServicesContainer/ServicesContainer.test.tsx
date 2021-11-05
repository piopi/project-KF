import React from 'react';
import { render } from '@testing-library/react';
import MatchMediaMock from 'jest-matchmedia-mock';
import ServicesContainer from './ServicesContainer';

let matchMedia: MatchMediaMock;
beforeAll(() => {
  matchMedia = new MatchMediaMock();
});

afterEach(() => {
  matchMedia.clear();
});
test('render service Section', () => {
  const { container } = render(<ServicesContainer />);
  const services = container.querySelector('#services');
  expect(services).toHaveTextContent('Recommended services');
});
