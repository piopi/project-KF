import React from 'react';
import { render, screen } from '@testing-library/react';
import MatchMediaMock from 'jest-matchmedia-mock';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import NavBar from './NavBar';
import store from '../../store/store';

let matchMedia: MatchMediaMock;
beforeAll(() => {
  matchMedia = new MatchMediaMock();
});

afterEach(() => {
  matchMedia.clear();
});

test('Render nav bar', () => {
  render(
    <Provider store={store}>
      <NavBar />
    </Provider>,
  );
  const placeholder = screen.getByPlaceholderText('Keyword');
  expect(placeholder).toBeInTheDocument();
  const logo = screen.getByAltText('Logo');
  expect(logo).toBeInTheDocument();
});

test('can Search Menu  open and close', () => {
  render(
    <Provider store={store}>
      <NavBar />
    </Provider>,
  );
  // Open Menu
  userEvent.click(screen.getByPlaceholderText('Keyword'));
  const searchMenu = screen.getByTestId('searchMenu');
  expect(searchMenu).toBeInTheDocument();
  // Close Menu
  userEvent.click(screen.getByTestId('closeButton'));
  expect(searchMenu).not.toBeInTheDocument();
});
