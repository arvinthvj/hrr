import React from 'react';
import { findLabelText } from '../commonMethod';
import { GeneralSettingsLabels } from './constant';

interface AllowPasswordAndSpecialCharProps {
  allowPassword: boolean;
  setAllowPassword: CallableFunction;
  specialCharecter: boolean;
  setSpecialCharecter: CallableFunction;
}

const AllowPasswordAndSpecialChar: React.FC<
  AllowPasswordAndSpecialCharProps
> = ({
  allowPassword,
  setAllowPassword,
  specialCharecter,
  setSpecialCharecter,
}) => {
  return (
    <div className="form-settings p-0">
      <div className="organisation-list  organisation-radioset">
        <div className="allow-bookset mb-0">
          <div className="allowworkspace">
            <h4 className="mw-100">
              {findLabelText(
                'Allow_password_repeats',
                'Allow password repeats',
                'Company_Settings',
              )}
              :​​​
            </h4>
          </div>
        </div>
        <ul>
          <li>
            {' '}
            {findLabelText('Yes', 'Yes', 'Company_Settings')}
            <div className="schedule-calendar">
              <label className="custom_radio">
                <input
                  type="radio"
                  name="actions"
                  checked={allowPassword}
                  onChange={() => {
                    setAllowPassword(true);
                  }}
                />
                <span className="checkmark"></span>
              </label>
            </div>
          </li>
          <li>
            {' '}
            {findLabelText('No', 'No', 'Company_Settings')}
            <div className="schedule-calendar">
              <label className="custom_radio">
                <input
                  type="radio"
                  name="actions"
                  id="watch-me"
                  checked={!allowPassword}
                  onChange={() => {
                    setAllowPassword(false);
                  }}
                />
                <span className="checkmark"></span>
              </label>
            </div>
          </li>
        </ul>
      </div>
      <div className="organisation-list  organisation-radioset">
        <div className="allow-bookset mb-0">
          <div className="allowworkspace">
            <h4 className="mw-100">
              {findLabelText(
                'Require_special_characters',
                'Require special characters',
                'Company_Settings',
              )}{' '}
              ({GeneralSettingsLabels.specialCharExample})​​​
            </h4>
          </div>
        </div>
        <ul>
          <li>
            {findLabelText('Yes', 'Yes', 'Company_Settings')}
            <div className="schedule-calendar">
              <label className="custom_radio">
                <input
                  type="radio"
                  name="actions1"
                  checked={specialCharecter}
                  onChange={() => {
                    setSpecialCharecter(true);
                  }}
                />
                <span className="checkmark"></span>
              </label>
            </div>
          </li>
          <li>
            {findLabelText('No', 'No', 'Company_Settings')}
            <div className="schedule-calendar">
              <label className="custom_radio">
                <input
                  type="radio"
                  name="actions1"
                  id="watch-me"
                  checked={!specialCharecter}
                  onChange={() => {
                    setSpecialCharecter(false);
                  }}
                />
                <span className="checkmark"></span>
              </label>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AllowPasswordAndSpecialChar;
