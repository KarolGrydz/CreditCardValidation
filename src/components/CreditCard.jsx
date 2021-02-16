import React, { useState, useRef, useMemo } from 'react';
import Cleave from 'cleave.js/react';

import {
  initialState,
  optionsForCreditNr,
  optionsForDate,
  optionsForCVC,
} from '../constants/creditCard';

function CreditCard() {
  const [inputs, setInputs] = useState(initialState);
  let creditRef = useRef();
  let dateRef = useRef();
  let cvcRef = useRef();
  const creditNrOptions = useMemo(() => [optionsForCreditNr], []);
  const dateOptions = useMemo(() => [optionsForDate], []);
  const cvcOptions = useMemo(() => [optionsForCVC], []);

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
              value={inputs.creditNr}
              size="19"
            />
            <Cleave
              options={dateOptions[0]}
              className="Inputs"
              htmlRef={(ref) => (dateRef = ref)}
              name="date"
              placeholder="MM/YY"
              value={inputs.date}
              size="5"
            />
            <Cleave
              options={cvcOptions[0]}
              className="Inputs"
              htmlRef={(ref) => (cvcRef = ref)}
              name="cvc"
              placeholder="CVC"
              maxLength="3"
              value={inputs.cvc}
              size="3"
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
