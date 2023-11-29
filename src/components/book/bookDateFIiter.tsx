import React, { useContext, useEffect, useRef, useState } from 'react';
import { bookCalendarIcon, calendar1 } from '../imagepath';
import { findLabelText } from '../commonMethod';
import { Link } from 'react-router-dom';
import { DatePicker } from 'antd';
import moment from 'moment';
import { monthNames } from '../../assets/constants/config';
import { BookingContext } from '../context/context';
import { PlanTextLabel } from '../planModuleComponent/constants';

const BookDateFilter = () => {
  const { bookDate, setBookDate } = useContext(BookingContext);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const calenderRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const handleClickOutside = event => {
      const list = [
        'ant-picker-content',
        'ant-picker-header-super-prev-btn',
        'ant-picker-cell-inner',
        'ant-picker-prev-icon',
        'ant-picker-next-icon',
        'ant-picker-super-prev-icon',
        'ant-picker-super-next-icon',
        'ant-picker-header-next-btn',
        'ant-picker-header-prev-btn',
        'ant-picker-header-super-prev-btn',
        'ant-picker-header-super-next-btn',
        'ant-picker-cell ant-picker-cell-in-view ant-picker-cell-range-hover-end',
        'ant-picker-cell ant-picker-cell-in-view ant-picker-cell-range-hover-start',
      ];
      if (list.includes(event.target.className)) {
      } else if (
        calenderRef.current &&
        !calenderRef.current.contains(event.target)
      ) {
        setShowDatePicker(false);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);
  const handleDate = type => {
    const month = bookDate.getMonth();
    // setIsDateChanged(true);
    if (type === 'add') {
      const date = new Date(bookDate.setMonth(month + 1));
      setBookDate(date);
    } else if (type === 'sub') {
      const date = new Date(bookDate.setMonth(month - 1));
      setBookDate(date);
    }
  };
  const handleDatePicker = (date, dateString) => {
    setShowDatePicker(!showDatePicker);
    if (date) {
      const firstDay = new Date(date?._d.getFullYear(), date?._d.getMonth(), 1);
      setBookDate(firstDay);
      // setIsDateChanged(true);
    }
  };

  return (
    <div className="date-filter">
      <div className="filter-date">
        <div className="current-date book-current-date me-2">
          <img
            src={bookCalendarIcon}
            onClick={() => setBookDate(new Date())}
            alt="img"
          />
          <span
            className="form-control datetimepicker-info datetimepicker"
            onClick={() => setBookDate(new Date())}
          >
            {findLabelText(
              PlanTextLabel.Today,
              PlanTextLabel.Today,
              PlanTextLabel.Book,
            )}
          </span>
          <div className="date-arrows me-0">
            <Link to="#" onClick={() => handleDate('sub')}>
              <i className="fa fa-angle-left" />
            </Link>
            <Link to="#" onClick={() => handleDate('add')}>
              <i className="fa fa-angle-right" />
            </Link>
          </div>
        </div>
        <span
          ref={calenderRef}
          className="work-date-range book-only-date work-date-range-show aaa"
        >
          <DatePicker
            open={showDatePicker}
            onChange={handleDatePicker}
            picker="month"
            style={{ visibility: 'hidden', width: 0 }}
            format={'MMMM YYYY'}
            bordered={false}
            value={bookDate ? moment(bookDate) : null}
          />

          <span
            onClick={() => {
              setShowDatePicker(!showDatePicker);
            }}
          >
            {monthNames[bookDate.getMonth()]} {bookDate.getFullYear()}
          </span>
          <img
            onClick={() => {
              setShowDatePicker(!showDatePicker);
            }}
            src={calendar1}
            alt="img"
          />
        </span>
      </div>
    </div>
  );
};

export default BookDateFilter;
