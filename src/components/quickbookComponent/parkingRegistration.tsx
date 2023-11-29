import React, { useEffect, useState } from 'react';
import { findLabelText } from '../commonMethod';
import { useSelector } from 'react-redux';

const ParkingRegistration = ({ registration, setRegistration }) => {
  return (
    <div className="booking-date">
      <span>{findLabelText('Registration', 'Registration', 'Dashboard')}</span>
      <div className="booking-date-picker Registration">
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
  );
};

export default ParkingRegistration;
