import React from 'react';
import { render, screen } from '@testing-library/react';
import MatchMediaMock from 'jest-matchmedia-mock';
import userEvent from '@testing-library/user-event';
import NavBar from './NavBar';

let matchMedia: MatchMediaMock;
beforeAll(() => {
  matchMedia = new MatchMediaMock();
});

afterEach(() => {
  matchMedia.clear();
});

test('Render nav bar', () => {
  render(<NavBar />);
  const placeholder = screen.getByPlaceholderText('Keyword');
  expect(placeholder).toBeInTheDocument();
  const logo = screen.getByAltText('Logo');
  expect(logo).toBeInTheDocument();
});

test('can Search Menu  open and close', () => {
  render(<NavBar />);
  // Open Menu
  userEvent.click(screen.getByPlaceholderText('Keyword'));
  const searchMenu = screen.getByTestId('searchMenu');
  expect(searchMenu).toBeInTheDocument();
  // Close Menu
  userEvent.click(screen.getByTestId('closeButton'));
  expect(searchMenu).not.toBeInTheDocument();
});
