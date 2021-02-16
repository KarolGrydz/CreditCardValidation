import React from 'react';
import CreditCard from './CreditCard';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

beforeEach(() => {
  render(<CreditCard />);
});

afterEach(cleanup);

describe('On component mount', () => {
  test('should be 3 inputs', () => {
    const inputCreditCardNr = screen.getByPlaceholderText(
      '5525 7574 2209 3610'
    );
    const inputData = screen.getByPlaceholderText('MM/YY');
    const inputCVC = screen.getByPlaceholderText('CVC');
    const inputArr = [inputCreditCardNr, inputData, inputCVC];
    inputArr.map((elem) => {
      return expect(elem).toBeInTheDocument();
    });
  });

  test('should be focus on input credit card', () => {
    const inputCreditCardNr = screen.getByPlaceholderText(
      '5525 7574 2209 3610'
    );
    expect(inputCreditCardNr).toHaveFocus();
  });
});

describe('Test credit card input', () => {
  test('should be only number', () => {
    const input = screen.getByPlaceholderText('5525 7574 2209 3610');
    userEvent.type(input, 'abc');
    expect(input.value).toBe('');
    userEvent.type(input, '123');
    expect(input.value).toBe('123');
  });

  test('should have space between every 4th number', () => {
    const input = screen.getByPlaceholderText('5525 7574 2209 3610');
    userEvent.type(input, '12341234123');
    expect(input.value).toBe('1234 1234 123');
  });

  test('should be only 19 characters with spaces', () => {
    const input = screen.getByPlaceholderText('5525 7574 2209 3610');
    userEvent.type(input, '123412341234123456789');
    expect(input.value).toBe('1234 1234 1234 1234');
  });

  test('should be flag for first char 5 or 4', () => {
    const input = screen.getByPlaceholderText('5525 7574 2209 3610');
    const img = screen.getByRole('img');
    userEvent.type(input, '3');
    expect(img).not.toHaveAttribute('src');
    userEvent.clear(input);
    userEvent.type(input, '5');
    expect(img).toHaveAttribute('src');
  });

  test('should be error on incorect code', () => {
    const input = screen.getByPlaceholderText('5525 7574 2209 3610');
    userEvent.type(input, '1111222233334444');
    const warning = screen.getByTestId('card-warning');
    expect(warning.innerHTML).toMatch('Credit card number is invalid');
    userEvent.clear(input);
    userEvent.type(input, '5525757422093610');
    expect(warning.innerHTML).toMatch('');
  });
});

describe('Test date input', () => {
  test('should be focued after credit card input has 19 char', () => {
    const credit = screen.getByPlaceholderText('5525 7574 2209 3610');
    const date = screen.getByPlaceholderText('MM/YY');
    userEvent.type(credit, '1111222233334444');
    expect(date).toHaveFocus();
  });

  test('should be onlt number and / after second number and value between 12 months and only 4 values', () => {
    const date = screen.getByPlaceholderText('MM/YY');
    userEvent.type(date, 'hasdfjiwer');
    expect(date.value).toBe('');
    userEvent.clear(date);
    userEvent.type(date, '0612');
    expect(date.value).toBe('06/12');
    userEvent.clear(date);
    userEvent.type(date, '219');
    expect(date.value).toBe('02/19');
    userEvent.clear(date);
    userEvent.type(date, '9119312345');
    expect(date.value).toBe('09/11');
  });

  test('should be error on expired date', () => {
    const date = screen.getByPlaceholderText('MM/YY');
    const warning = screen.getByTestId('date-warning');
    userEvent.type(date, '1110');
    expect(warning.innerHTML).toMatch('Credit card is expired');
    userEvent.clear(date);
    userEvent.type(date, '330');
    expect(warning.innerHTML).toMatch('');
  });
});

describe('Test CVC input', () => {
  test('should be focus after date', () => {
    const date = screen.getByPlaceholderText('MM/YY');
    const cvc = screen.getByPlaceholderText('CVC');
    userEvent.type(date, '0512');
    expect(cvc).toHaveFocus();
  });

  test('should be only number and only 3', () => {
    const cvc = screen.getByPlaceholderText('CVC');
    userEvent.type(cvc, 'ajfalksdjfksajf');
    expect(cvc.value).toBe('');
    userEvent.clear(cvc);
    userEvent.type(cvc, '423');
    expect(cvc.value).toBe('423');
    userEvent.clear(cvc);
    userEvent.type(cvc, '8534578345');
    expect(cvc.value).toBe('853');
  });
});
