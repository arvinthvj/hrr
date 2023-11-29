import React from 'react';
import { findLabelText } from '../commonMethod';

interface PasswordResetProps {
  counter: number;
  setCounter: CallableFunction;
}

const PasswordReset = ({ counter, setCounter }: PasswordResetProps) => {
  return (
    <div className="allow-book p-0">
      <div id="show-me">
        <div className="allow-bookset">
          <div className="allowworkspace">
            <h4>
              {findLabelText(
                'Passwords_reset_every',
                'Passwords require reset every',
                'Company_Settings',
              )}
              ​​
            </h4>
            <div className="allow-booksetinput">
              <div className="form-group number-form-group mb-0">
                <div className="number-group">
                  <input
                    type="text"
                    className="number-input"
                    value={counter}
                    min="0"
                    onChange={e => {
                      if (parseInt(e?.target?.value) >= 0) {
                        setCounter(parseInt(e?.target?.value));
                      }
                    }}
                  />
                  <span
                    className="number-btn"
                    onClick={() => {
                      setCounter(counter + 1);
                    }}
                  >
                    <b>+</b>
                    <i className="fas fa-chevron-up" />
                  </span>
                  <span
                    className="number-btn"
                    onClick={() => {
                      if (counter > 0) setCounter(counter - 1);
                    }}
                  >
                    <b>-</b>
                    <i className="fas fa-chevron-down" />
                  </span>
                </div>
              </div>
              <h5>{findLabelText('Months', 'Months', 'Company_Settings')}​​</h5>
            </div>
          </div>
          <h6>
            0 = {findLabelText('unlimited', 'unlimited', 'Company_Settings')}​
          </h6>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
