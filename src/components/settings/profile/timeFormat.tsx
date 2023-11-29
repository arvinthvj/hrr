import React, { useEffect, useState } from 'react';
import { findLabelText } from '../../commonMethod';
import SelectField from '../../selectfield/select';
import { TimeFormatList } from '../../../assets/constants/config';
import { useDispatch, useSelector } from 'react-redux';
import {
  hideLoader,
  setUserDateTimeFormat,
  showLoader,
} from '../../../reduxStore/appSlice';
import { postData } from '../../../services/apicall';
import { UpdateUserDateTimeFormatPref } from '../../../services/apiurl';
import Toaster from '../../toast';

const TimeFormat = () => {
  const [timeFormat, setTimeFormat] = useState({});
  const { userDateTimeFormat } = useSelector((state: any) => state.app);
  const dispatch = useDispatch();

  const updateTimeFormat = dateObj => {
    const payload = {
      date_pref: userDateTimeFormat?.date_pref,
      time_pref: dateObj?.value,
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
    const timeFormatObj = TimeFormatList?.find(
      i => i?.value == userDateTimeFormat?.time_pref,
    );
    const convertTimeObj = {
      id: timeFormatObj?.id,
      label: timeFormatObj?.showLabel,
      value: timeFormatObj?.value,
    };
    setTimeFormat(convertTimeObj);
  }, [userDateTimeFormat?.time_pref]);

  return (
    <div className="about-view">
      <h3>{findLabelText('Time_Format', 'Time Format', 'Common_Values')}</h3>
      <div className="booking-date-right-info">
        <SelectField
          value={timeFormat}
          options={TimeFormatList}
          height={'40px'}
          onChangeValue={value => {
            updateTimeFormat(value);
          }}
        />
      </div>
    </div>
  );
};

export default TimeFormat;
