import React from 'react';
import { findLabelText } from '../commonMethod';
import { GeneralSettingsLabels, NonWorkingStatusTypes } from './constant';

interface NonWorkSpaceTypesProps {
  outOfOfficeStatus: boolean;
  statusVacation: boolean;
  setOutOfOfficeStatus: CallableFunction;
  setStatusVacation: CallableFunction;
}
const NonWorkSpaceTypes: React.FC<NonWorkSpaceTypesProps> = ({
  outOfOfficeStatus,
  setOutOfOfficeStatus,
  setStatusVacation,
  statusVacation,
}) => {
  return (
    <div className="form-settings p-0">
      <div className="organisation-list  organisation-radioset">
        <div className="allow-bookset mb-0">
          <div className="allowworkspace">
            <h4 className="mw-100">
              {GeneralSettingsLabels.nonWorkingStatusTypes}
            </h4>
          </div>
        </div>
        <ul className="status-radio-btns">
          <li>
            {' '}
            {findLabelText(
              'Out of office',
              'Out of office',
              'Company_Settings',
            )}
            <div className="schedule-calendar">
              <label className="custom_radio">
                <input
                  type="radio"
                  name="actions"
                  checked={outOfOfficeStatus}
                  onChange={e => {
                    setOutOfOfficeStatus(e.target.checked);
                    setStatusVacation(!e.target.checked);
                  }}
                />
                <span className="checkmark"></span>
              </label>
            </div>
          </li>
          <li className="or-line-info">
            <div className="login-or">
              <span className="or-line"></span>
              <span className="span-or">Or</span>
            </div>
          </li>
          <li className="mb-0">
            {' '}
            <div className="status-vacation">
              <p>{NonWorkingStatusTypes.sick}</p>
              <p>{NonWorkingStatusTypes.vacation}</p>
              {/* <p>{NonWorkingStatusTypes.other}</p> */}
            </div>
            <div className="schedule-calendar">
              <label className="custom_radio">
                <input
                  type="radio"
                  name="actions"
                  id="watch-me"
                  checked={statusVacation}
                  onChange={e => {
                    setStatusVacation(e.target.checked);
                    setOutOfOfficeStatus(!e.target.checked);
                  }}
                />
                <span className="checkmark"></span>
              </label>
            </div>
          </li>
        </ul>
        <span className="status-users">
          {GeneralSettingsLabels.nonWorkingStatusTypeDesc}
        </span>
      </div>
    </div>
  );
};

export default NonWorkSpaceTypes;
