import React from 'react';
import { findLabelText } from '../commonMethod';

interface MinNoOfPasswordProps {
  password: number;
  setPassword: CallableFunction;
}





const MinNoOfPassword: React.FC<MinNoOfPasswordProps> = ({
  password,
  setPassword,
}) => {
  const min = 7;

  return (
    <div className="maxnumberset p-0">
      <div className="maxnumbersetlabel">
        <h4>
          {findLabelText(
            'Minimum_number_of_characters_required_for_a_password',
            'Minimum number of characters required for a password',
            'Company_Settings',
          )}
        </h4>
      </div>
      <div className="maxnumbersetinput">
        <div className="form-group number-form-group mb-0">
          <div className="number-group">
            <input
              readOnly
              type="number"
              className="number-input"
              value={password >= 7 ? password : 7}
              onChange={e => {
                let value = parseInt(e.target.value);
                if (value >= min) setPassword(value);
              }}
            />

            <span
              className="number-btn"
              onClick={() => {
                let value = password + 1;
                setPassword(value);
              }}
            >
              <b>+</b>
              <i className="fas fa-chevron-up" />
            </span>
            <span
              className="number-btn"
              onClick={() => {
                if (password > 7) {
                  let value = password - 1;
                  setPassword(value);
                }
              }}
            >
              <b>-</b>
              <i className="fas fa-chevron-down" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinNoOfPassword;
