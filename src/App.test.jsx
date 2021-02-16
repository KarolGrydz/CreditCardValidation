import React from 'react';
import App from './App';
import { render, screen, cleanup } from '@testing-library/react';

beforeEach(() => {
  render(<App />);
});

afterEach(cleanup);

describe('On window load', () => {
  test('should be text on header', () => {
    const headerText = screen.getByText(/credit card validation/i);
    const bodyText = screen.getByText(/working card numbers:/i);
    const number1 = screen.getByText(/5525 7574 2209 3610/i);
    const number2 = screen.getByText(/4525 7574 2209 3610/i);
    const number3 = screen.getByText(/5111 1111 1111 1111/i);
    const number4 = screen.getByText(/4111 1111 1111 1111/i);
    const textArr = [headerText, bodyText, number1, number2, number3, number4];
    textArr.map((elem) => expect(elem).toBeInTheDocument());
  });
});
