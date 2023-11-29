import React, { useContext, useEffect, useRef, useState } from 'react';
import { DatePicker, Tooltip } from 'antd';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';
import { dateFormat_DD_MM_YYYY } from '../../assets/constants/config';
import { store } from '../../reduxStore';

interface DatePickerComponent {
  suffixIcon?: any;
  name?: string;
  handleChange?: CallableFunction;
  disabledFutureDate?: any;
  onChange?: CallableFunction;
  trigger?: any;
  value?: any;
  placeholder?: string;
  disableStyle?: any;
  isDisable?: any;
  format?: any;
  errClass?: any;
}

const DatePickerComponent: React.FC<DatePickerComponent> = ({
  suffixIcon,
  name,
  handleChange,
  disabledFutureDate,
  onChange,
  trigger,
  value,
  placeholder,
  disableStyle,
  isDisable,
  format,
  errClass,
}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const { userDateTimeFormat } = store.getState().app;
  const DATE_FORMAT = userDateTimeFormat?.date_pref
    ? userDateTimeFormat?.date_pref
    : dateFormat_DD_MM_YYYY;

  const handleIconClick = () => {
    setShowCalendar(!showCalendar);
  };
  const datePickerRef = useRef(null);

  const handleScroll = () => {
    if (datePickerRef.current) {
      datePickerRef.current.blur();
    }
  };

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    window?.addEventListener('scroll', handleScroll);
    document
      ?.querySelector('.tab-scroll')
      ?.addEventListener('scroll', handleScroll);
    document
      ?.querySelector('.personal-card-body')
      ?.addEventListener('scroll', handleScroll);
    document
      ?.querySelector('.personal-time-card-body')
      ?.addEventListener('scroll', handleScroll);
  }, [window]);

  const handleInputKeyDown = e => {
    if (e.target.value.length < 2) {
      setInputValue('');
      onChange('');
      handleChange('');
      trigger(name);
      datePickerRef.current.blur();
    }
  };

  return (
    <>
      <Tooltip title={DATE_FORMAT}>
        <DatePicker
          ref={datePickerRef}
          disabled={isDisable ? true : false}
          onOpenChange={status => {
            setShowCalendar(status);
          }}
          style={{
            background: isDisable ? '#FAFAFA' : '#FFF',
            color: isDisable ? '#777777' : '#1B1B1B',
          }}
          className={
            disableStyle
              ? 'form-control datetimepicker hr-date-picker' + disableStyle
              : errClass
              ? 'form-control datetimepicker hr-date-picker is-invalid-field'
              : 'form-control datetimepicker hr-date-picker'
          }
          suffixIcon={
            <Link to="#" onClick={handleIconClick}>
              {suffixIcon}
            </Link>
          }
          format={DATE_FORMAT}
          value={inputValue}
          placeholder={placeholder}
          disabledDate={disabledFutureDate}
          onKeyDown={handleInputKeyDown}
          onChange={val => {
            onChange(val);
            trigger(name);
            handleChange(val);
          }}
        />
      </Tooltip>
    </>
  );
};

export default DatePickerComponent;
