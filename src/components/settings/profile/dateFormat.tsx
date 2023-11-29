import React, { useEffect, useState } from 'react';
import { findLabelText } from '../../commonMethod';
import SelectField from '../../selectfield/select';
import { DateFormatList } from '../../../assets/constants/config';
import { useDispatch, useSelector } from 'react-redux';
import { postData } from '../../../services/apicall';
import { UpdateUserDateTimeFormatPref } from '../../../services/apiurl';
import {
  hideLoader,
  setUserDateTimeFormat,
  showLoader,
} from '../../../reduxStore/appSlice';
import Toaster from '../../toast';

const DateFormat = () => {
  const { userDateTimeFormat } = useSelector((state: any) => state.app);
  const [dateFormat, setDateFormat] = useState({});
  const dispatch = useDispatch();

  const updateDateFormat = dateObj => {
    const payload = {
      date_pref: dateObj?.value,
      time_pref: userDateTimeFormat?.time_pref,
    };
    dispatch(showLoader);
    postData(UpdateUserDateTimeFormatPref, payload, (data, res) => {
      Toaster(res?.data?.code, res?.data?.message);
      if (res?.data?.code == 200) {
        dispatch(setUserDateTimeFormat(payload));
      }
      dispatch(hideLoader);
    });
  };

  useEffect(() => {
    const dateFormatObj = DateFormatList?.find(
      i => i?.value == userDateTimeFormat?.date_pref,
    );
    const convertDateObj = {
      id: dateFormatObj?.id,
      label: dateFormatObj?.value,
      value: dateFormatObj?.value,
    };
    setDateFormat(convertDateObj);
  }, [userDateTimeFormat?.date_pref]);

  return (
    <div className="about-view edit-about edit-about-input">
      <h3>{findLabelText('Date_Format', 'Date Format', 'Common_Values')}</h3>
      <div className="booking-date-right-info">
        <SelectField
          value={dateFormat}
          options={DateFormatList}
          height={'40px'}
          onChangeValue={value => {
            updateDateFormat(value);
          }}
        />
      </div>
    </div>
  );
};

export default DateFormat;
