export const initialState = {
  creditNr: '',
  date: '',
  cvc: '',
  errorCreditCard: '',
  errorDate: '',
  icon: null,
  creditFocus: true,
};

export const validCards = [
  '5525 7574 2209 3610',
  '4525 7574 2209 3610',
  '5111 1111 1111 1111',
  '4111 1111 1111 1111',
];

export const optionsForCreditNr = {
  blocks: [4, 4, 4, 4],
  delimiter: ' ',
  numericOnly: true,
};

export const optionsForDate = { date: true, datePattern: ['m', 'y'] };

export const optionsForCVC = { blocks: [3], numericOnly: true };

export const CREDIT_CARD_NAME = 'creditNr';
export const CREDIT_CARD_LENGTH = 19;
export const DATE_NAME = 'date';
export const DATE_LENGTH = 5;
export const FIRST_NUMBER_MASTERCARD = '5';
export const FIRST_NUMBER_VISA = '4';
export const BACKSPACE_KEYCODE = 8;
