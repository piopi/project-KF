import React from 'react';
import { render } from '@testing-library/react';
import MatchMediaMock from 'jest-matchmedia-mock';
import { Provider } from 'react-redux';
import ServicesContainer from './ServicesContainer';
import store from '../../store/store';

let matchMedia: MatchMediaMock;
beforeAll(() => {
  matchMedia = new MatchMediaMock();
});

afterEach(() => {
  matchMedia.clear();
});
test('render service Section', () => {
  const { container } = render(
    <Provider store={store}>
      <ServicesContainer />
    </Provider>,
  );
  // Should show the spinner without an empty store
  expect(container).not.toHaveTextContent('Recommended services');
});
