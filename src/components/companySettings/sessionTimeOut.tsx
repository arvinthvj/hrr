import React from 'react';
import { findLabelText } from '../commonMethod';
import {
  GeneralSettingsLabels,
  MaximumWebSession,
  MinimumWebSession,
} from './constant';

const SessionTimeOut = ({
  sessionExpireTime,
  setSessionExpireTime,
  error,
  setError,
}) => {
  return (
    <>
      <div className="allow-book p-0">
        <div id="show-me">
          <div className="allow-bookset">
            <div className="allowworkspace">
              <h4>
                {findLabelText(
                  'Session_expiration',
                  'Session expiration',
                  'Company_Settings',
                ) +
                  ' (' +
                  findLabelText('web', 'web', 'Company_Settings') +
                  ')'}
                ​​
              </h4>
            </div>
            <h6>
              {'(' +
                findLabelText(
                  'Minutes_of_inactivity',
                  'Minutes of inactivity',
                  'Company_Settings',
                ) +
                ')'}
              ​
            </h6>
            <div className="allow-booksetinput">
              <div className="form-group number-form-group mb-0">
                <div className="number-group">
                  <input
                    type="text"
                    className="number-input"
                    value={sessionExpireTime}
                    onChange={e => {
                      parseInt(e?.target?.value) > 0 &&
                        setSessionExpireTime(parseInt(e?.target?.value));
                      if (
                        parseInt(e?.target?.value) >= MinimumWebSession &&
                        parseInt(e?.target?.value) <= MaximumWebSession
                      ) {
                        setError({ type: '', text: '' });
                      }
                    }}
                  />
                  <span
                    className="number-btn"
                    onClick={() => {
                      parseInt(sessionExpireTime) < MaximumWebSession &&
                        setSessionExpireTime(parseInt(sessionExpireTime) + 1);
                    }}
                  >
                    <b>+</b>
                    <i className="fas fa-chevron-up" />
                  </span>
                  <span
                    className="number-btn"
                    onClick={() => {
                      if (parseInt(sessionExpireTime) > MinimumWebSession)
                        setSessionExpireTime(parseInt(sessionExpireTime) - 1);
                    }}
                  >
                    <b>-</b>
                    <i className="fas fa-chevron-down" />
                  </span>
                </div>
              </div>
            </div>
            {error?.type == GeneralSettingsLabels.webSessionErrorType && (
              <p className="no-result-text">{error?.text}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SessionTimeOut;
