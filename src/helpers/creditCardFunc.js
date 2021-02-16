import visa from '../assets/img/visa.png';
import mastercard from '../assets/img/mastercard.png';
import {
  validCards,
  CREDIT_CARD_NAME,
  CREDIT_CARD_LENGTH,
  FIRST_NUMBER_MASTERCARD,
  FIRST_NUMBER_VISA,
  DATE_LENGTH,
  DATE_NAME,
} from '../constants/creditCard';

export const checkFocus = (name) => (name === CREDIT_CARD_NAME ? true : false);

export const iconAndWhitespace = (val, i, fieldName) =>
  fieldName === CREDIT_CARD_NAME ? checkIcon(val) : i;

const checkIcon = (e) => {
  if (e.charAt(0) === FIRST_NUMBER_MASTERCARD) return mastercard;
  if (e.charAt(0) === FIRST_NUMBER_VISA) return visa;
  return null;
};

const getDate = () => {
  const date = new Date();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const updateYear = year.toString(10).split('').slice(2, 4).join('');
  return [month, parseInt(updateYear, 10)];
};

export const validationCredicCard = (fieldName, event, err) => {
  if (fieldName === CREDIT_CARD_NAME) {
    if (event.length === CREDIT_CARD_LENGTH) {
      const result = validCards.find((elem) => elem.localeCompare(event) === 0);
      return result === undefined ? 'Credit card number is invalid' : '';
    }
    return '';
  }
  return err;
};

export const validationDate = (fieldName, event, err) => {
  if (fieldName === DATE_NAME) {
    if (event.length === DATE_LENGTH) {
      const [month, year] = getDate();
      if (event.slice(0, 2) < 13) {
        if (year < parseInt(event.slice(3, 5), 10)) return '';
        if (year > parseInt(event.slice(3, 5), 10))
          return 'Credit card is expired';
        if (year === parseInt(event.slice(3, 5), 10))
          return validationDateMonth(event, month);
      }
      return 'Specified month does not exist';
    }
    return '';
  }
  return err;
};

const validationDateMonth = (event, month) => {
  let userDate = event.split('');
  if (month.toString().length === 1) {
    if (userDate[0] > '0') return '';
    if (userDate[1] >= month.toString()) return '';
  }
  if (userDate[0] === '0') return 'Credit card is expired';
  if (userDate[1] >= month.toString()) return '';
  return 'Credit card is expired';
};
