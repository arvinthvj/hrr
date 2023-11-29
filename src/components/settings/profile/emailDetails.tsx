import React, { useEffect, useState } from 'react';
import { findLabelText } from '../../commonMethod';
const EmailDetails = ({ email, setEmail, label, status, error }) => {
  const [isSaveComEmail, setIsSaveComEmail] = useState(false);
  useEffect(() => {
    error(isSaveComEmail);
  }, [isSaveComEmail]);
  return (
    <>
      <div
        className={`${'office-views-team office-views-email mb-1 '}${
          email?.status == true ? 'text-phone-box' : null
        }`}
      >
        <h4>{findLabelText(label, label, 'Settings')}</h4>
        <div className="office-input">
          {status ? (
            <a href={`${'mailto:'}${email.data}`}>
              <input
                className="office-right-input"
                type="text"
                style={{ color: '#1B1B1B' }}
                value={email.data || ''}
                disabled
              />
            </a>
          ) : (
            <input
              type="text"
              className="office-left-input"
              style={{ color: '#1B1B1B' }}
              value={email.data || ''}
              disabled={!email?.status}
              onChange={e => {
                const Regex =
                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                const emailValue = e?.target?.value.trim();
                setEmail({
                  ...email,
                  data: emailValue,
                });
                if (emailValue === '' || Regex.test(emailValue)) {
                  setIsSaveComEmail(false); // If the email format is valid, enable saving
                } else {
                  setIsSaveComEmail(true); // If the email format is invalid, disable saving
                }
              }}
            />
          )}
        </div>
      </div>
      {email.status && isSaveComEmail && (
        <p style={{ color: 'red' }}>{'Please Enter Valid Email.'}</p>
      )}
    </>
  );
};
export default EmailDetails;
