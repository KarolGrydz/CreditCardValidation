import React, { useState, useRef, useEffect, useMemo } from 'react';
import Cleave from 'cleave.js/react';

import {
  initialState,
  optionsForCreditNr,
  optionsForDate,
  optionsForCVC,
  DATE_LENGTH,
  CREDIT_CARD_LENGTH,
  BACKSPACE_KEYCODE,
} from '../constants/creditCard';

import {
  validationCredicCard,
  validationDate,
  iconAndWhitespace,
  checkFocus,
} from '../helpers/creditCardFunc';

function CreditCard() {
  const [inputs, setInputs] = useState(initialState);
  let creditRef = useRef();
  let dateRef = useRef();
  let cvcRef = useRef();
  const creditNrOptions = useMemo(() => [optionsForCreditNr], []);
  const dateOptions = useMemo(() => [optionsForDate], []);
  const cvcOptions = useMemo(() => [optionsForCVC], []);

  useEffect(() => {
    if (inputs.date.length === DATE_LENGTH && !inputs.creditFocus)
      return cvcRef.focus();
    if (inputs.creditNr.length === CREDIT_CARD_LENGTH) return dateRef.focus();
    if (inputs.creditFocus) return creditRef.focus();
    // eslint-disable-next-line
  }, [inputs.creditNr, inputs.date]);

  const changeInput = (fieldName) => ({ target: { value } }) => {
    const icon = iconAndWhitespace(value, inputs.icon, fieldName);

    const errorCreditCard = validationCredicCard(
      fieldName,
      value,
      inputs.errorCreditCard
    );

    const errorDate = validationDate(fieldName, value, inputs.errorDate);

    setInputs((state) => ({
      ...state,
      [fieldName]: value,
      icon,
      errorCreditCard,
      errorDate,
    }));
  };

  const focusHelper = ({ target: { name } }) => {
    const creditFocus = checkFocus(name);
    setInputs((state) => ({
      ...state,
      creditFocus,
    }));
  };

  const goBackCredit = ({ keyCode }) => {
    if (keyCode === BACKSPACE_KEYCODE) {
      if (!inputs.date.length) creditRef.focus();
    }
  };

  const goBackDate = ({ keyCode }) => {
    if (keyCode === BACKSPACE_KEYCODE) {
      if (!inputs.cvc.length) dateRef.focus();
    }
  };

  return (
    <div className="Container">
      <div className="Card">
        <div className="FormCard">
          <form className="CreditCard" autoComplete="off">
            <span className="Icon">
              <img src={inputs.icon} alt="" aria-label="creditImage" />
            </span>
            <Cleave
              options={creditNrOptions[0]}
              className="Inputs"
              htmlRef={(ref) => (creditRef = ref)}
              name="creditNr"
              placeholder="5525 7574 2209 3610"
              onChange={changeInput('creditNr')}
              value={inputs.creditNr}
              size="19"
              onFocus={focusHelper}
            />
            <Cleave
              options={dateOptions[0]}
              className="Inputs"
              htmlRef={(ref) => (dateRef = ref)}
              name="date"
              placeholder="MM/YY"
              onChange={changeInput('date')}
              value={inputs.date}
              size="5"
              onFocus={focusHelper}
              onKeyDown={goBackCredit}
            />
            <Cleave
              options={cvcOptions[0]}
              className="Inputs"
              htmlRef={(ref) => (cvcRef = ref)}
              name="cvc"
              placeholder="CVC"
              maxLength="3"
              onChange={changeInput('cvc')}
              value={inputs.cvc}
              size="3"
              onKeyDown={goBackDate}
            />
          </form>
        </div>
        <div>
          <p className="Warning" data-testid="card-warning">
            {inputs.errorCreditCard}
          </p>
          <p className="Warning" data-testid="date-warning">
            {inputs.errorDate}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CreditCard;
