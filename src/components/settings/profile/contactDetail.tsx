import React, { useContext, useEffect, useRef, useState } from 'react';
import { ProfileContext } from '../../context/settingsContext';
import { findLabelText } from '../../commonMethod';
import { Link } from 'react-router-dom';
import {
  ButtonNames,
  ProfileFieldLabels,
  ProfileFields,
  TabNames,
} from '../constant';
import EmailDetails from './emailDetails';

const ContactDetail = () => {
  const contactRef = useRef<any>(null);
  const {
    profileData,
    phoneNumber,
    setPhoneNumber,
    setStr,
    setCompanyPhoneNumber,
    companyPhoneNumber,
    email,
    setEmail,
  } = useContext(ProfileContext);
  const [isSavePhoneNum, setIsSavePhoneNum] = useState(true);
  const [isSaveComPhoneNum, setIsSaveComPhoneNum] = useState(true);
  const [emailError, setEmailError] = useState(false);
  useEffect(() => {
    const handleClickOutside = event => {
      if (contactRef.current && !contactRef.current?.contains(event?.target)) {
        if (phoneNumber.status) {
          setPhoneNumber({
            data: profileData?.phone,
            status: false,
            count: 0,
          });
        }
        if (companyPhoneNumber.status) {
          setCompanyPhoneNumber({
            data: profileData?.company_phone,
            status: false,
            count: 0,
          });
        }
        if (email.status) {
          setEmail({
            data: profileData?.company_email,
            status: false,
            count: 0,
          });
        }
      }
    };
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileData?.phone, phoneNumber.status]);

  const findAddNumber = countNumber => {
    if (countNumber == 0) return true;
    if (countNumber % 2 == 0) {
      return true;
    }
    return false;
  };
  return (
    <div className="office-teams" ref={contactRef}>
      <h3>
        {findLabelText(
          'Contact',
          ProfileFieldLabels.contact,
          TabNames.settings,
        )}
      </h3>
      <Link
        to="#"
        onClick={e => {
          if (!emailError) {
            setStr(ProfileFields.contact);
            setPhoneNumber({
              ...phoneNumber,
              status: true,
              count: phoneNumber.count + 1,
            });
            setCompanyPhoneNumber({
              ...companyPhoneNumber,
              status: true,
              count: companyPhoneNumber.count + 1,
            });
            setEmail({
              ...email,
              status: true,
              count: email.count + 1,
            });
          }
        }}
        className="leave-edit-btn"
      >
        {findAddNumber(phoneNumber.count)
          ? findLabelText('Edit', ButtonNames.EDIT, TabNames.settings)
          : findLabelText('Save', ButtonNames.SAVE, TabNames.settings)}
      </Link>
      <EmailDetails
        email={email}
        setEmail={setEmail}
        label={'Company email'}
        status={findAddNumber(email.count)}
        error={setEmailError}
      />
      <div
        className={`${'office-views-team office-views-email mb-1 '}${
          companyPhoneNumber?.status == true ? 'text-phone-box' : null
        }`}
      >
        <h4>{findLabelText('Company_phone', 'Company phone', 'Settings')}</h4>
        <div className="office-input">
          {findAddNumber(companyPhoneNumber.count) ? (
            <a>
              <input
                className="text-phone office-right-input"
                style={{ color: '#1B1B1B' }}
                type="text"
                defaultValue={companyPhoneNumber.data || ''}
                disabled={!companyPhoneNumber?.status}
                onChange={e =>
                  setCompanyPhoneNumber({
                    ...companyPhoneNumber,
                    data: e.target.value,
                  })
                }
              />
            </a>
          ) : (
            <input
              className="text-phone office-left-input"
              type="text"
              name="companyPhoneNumber"
              pattern="[0-9]"
              style={{ color: '#1B1B1B' }}
              value={companyPhoneNumber.data || ''}
              disabled={!companyPhoneNumber?.status}
              onChange={e => {
                const rgx = /^[0-9+\s\b]+$/;
                const emailValue = e?.target?.value?.trim();
                if (
                  (emailValue == '' || rgx.test(emailValue)) &&
                  emailValue?.length <= 15
                ) {
                  setCompanyPhoneNumber({
                    ...companyPhoneNumber,
                    data: emailValue,
                  });
                  emailValue?.length > 15
                    ? setIsSaveComPhoneNum(false)
                    : setIsSaveComPhoneNum(true);
                }
              }}
            />
          )}
        </div>
      </div>
      {companyPhoneNumber.status && !isSaveComPhoneNum && (
        <p style={{ color: 'red' }}>{'Phone number must be 14 numbers'}</p>
      )}
      <div
        className={`${'office-views-team office-views-email mb-1 '}${
          phoneNumber?.status == true ? 'text-phone-box' : null
        }`}
      >
        <h4>{findLabelText('Phone', 'Phone', 'Settings')}</h4>
        <div className="office-input">
          {findAddNumber(phoneNumber.count) ? (
            <a>
              <input
                className="text-phone office-right-input"
                style={{ color: '#1B1B1B' }}
                type="text"
                defaultValue={phoneNumber.data || ''}
                disabled={!phoneNumber?.status}
                onChange={e =>
                  setPhoneNumber({
                    ...phoneNumber,
                    data: e.target.value,
                  })
                }
              />
            </a>
          ) : (
            <input
              className="text-phone office-left-input"
              type="text"
              name="phonenumber"
              pattern="[0-9]"
              style={{ color: '#1B1B1B' }}
              value={phoneNumber.data || ''}
              disabled={!phoneNumber?.status}
              onChange={e => {
                const rgx = /^[0-9+\s\b]+$/;
                const emailValue = e?.target?.value?.trim();
                if (
                  (emailValue == '' || rgx.test(emailValue)) &&
                  emailValue?.length <= 15
                ) {
                  setPhoneNumber({
                    ...phoneNumber,
                    data: emailValue,
                  });
                  emailValue?.length > 15
                    ? setIsSavePhoneNum(false)
                    : setIsSavePhoneNum(true);
                }
              }}
            />
          )}
        </div>
      </div>
      {phoneNumber.status && !isSavePhoneNum && (
        <p style={{ color: 'red' }}>{'Phone number must be 14 numbers'}</p>
      )}
    </div>
  );
};

export default ContactDetail;
