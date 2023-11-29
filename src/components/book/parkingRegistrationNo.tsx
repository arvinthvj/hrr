import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { findLabelText } from '../commonMethod';

const ParkingRegistrationNo = ({ registration, setRegistration }) => {
  return (
    <li>
      <div className="booking-registration">
        <span>
          {findLabelText('Registration', 'Registration', 'Dashboard')}
        </span>
        <div className="booking-registration-id">
          <input
            className="form-control"
            value={registration}
            type="text"
            maxLength={10}
            placeholder={findLabelText(
              'Registration',
              'Registration',
              'Dashboard',
            )}
            onChange={e => {
              setRegistration(e.target.value);
            }}
            // readOnly={true}
          />
        </div>
      </div>
    </li>
  );
};

export default ParkingRegistrationNo;
