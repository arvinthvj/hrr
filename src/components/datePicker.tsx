import React, { useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { findLabelText, getUserPreferedDateFormat } from './commonMethod';
import { QuickBookAssetCardContext, QuickBookContext } from './context/context';
import { useSelector } from 'react-redux';
import { dateFormat_YYYY_MM_DD } from '../assets/constants/config';

const CDatePicker = ({ startDate, setStartDate, disabled = false }) => {
  const { setBookInitial } = useContext(QuickBookContext);
  const { userDetails } = useSelector((state: any) => state.app);
  const disabledDate = current => {
    return current && current <= moment().subtract(1, 'days');
  };

  const handleChange = currentdate => {
    setStartDate(currentdate);
    setBookInitial(0);
  };
  return (
    <div className="booking-date">
      <span>{findLabelText('Date', 'Date', 'Dashboard')}</span>
      <div className="booking-date-picker filter-input filter-time filter-start-time">
        <DatePicker
          selected={startDate}
          onChange={handleChange}
          value={
            moment(startDate).format(dateFormat_YYYY_MM_DD) !==
            moment(new Date()).format(dateFormat_YYYY_MM_DD)
              ? getUserPreferedDateFormat(startDate)
              : findLabelText('Today', 'Today', 'Locate') +
                ', ' +
                getUserPreferedDateFormat(startDate)
          }
          type="text"
          className="form-control form-control-date datetimepicker"
          suffixIcon={null}
          minDate={moment().toDate()}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default CDatePicker;
