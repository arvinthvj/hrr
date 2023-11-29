import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { calendar1 } from '../../imagepath';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { postData } from '../../../services/apicall';
import { Card, DatePicker } from 'antd';
import { monthNames } from '../../../assets/constants/config';
import { findLabelText } from '../../commonMethod';
import UpcomingBookingDetails from './upcomingBookingDetails';
import { getUserBookingDetails } from '../../../services/apiurl';
import { ButtonNames, TabNames, ValidationMessages } from '../constant';
import { dateFormat_YYYY_MM_DD } from '../../../assets/constants/config';

interface UpcomingBookingsProps {
  setLoading: CallableFunction | any;
  location: any;
  isHrModule?: boolean;
}

const UpcomingBookings: React.FC<UpcomingBookingsProps> = ({
  setLoading,
  location,
  isHrModule,
}) => {
  const [upcomingData, setUpcomingData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [viewOlder, setViweOlder] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const calenderRef = useRef<any>(null);

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
      if (list?.includes(event?.target?.className)) {
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

  const handleChange = currentdate => {
    setViweOlder(false);
    setShowDatePicker(!showDatePicker);
    if (currentdate) {
      const firstDay =
        currentdate?._d.getMonth() == new Date().getMonth()
          ? new Date(
              currentdate?._d.getFullYear(),
              currentdate?._d.getMonth(),
              new Date().getDate(),
            )
          : new Date(
              currentdate?._d.getFullYear(),
              currentdate?._d.getMonth(),
              1,
            );
      setStartDate(firstDay);
    } else setStartDate(startDate);
  };

  const getBookingData = (data, res) => {
    if (res?.data?.code == 200) {
      const sortedData = data?.sort(
        (a, b) => new Date(a?.booking_date) - new Date(b?.booking_date),
      );
      setUpcomingData(sortedData);
    }
    if (upcomingData) {
      setLoading(false);
    }
  };
  const bookingMonth = {
    date: moment(startDate).format(dateFormat_YYYY_MM_DD),
    view_older: viewOlder === false ? 0 : 1,
  };

  useEffect(() => {
    setLoading(true);
    postData(getUserBookingDetails, bookingMonth, getBookingData);
  }, [startDate, viewOlder]);

  const handleChangeDate = name => {
    let newDate;
    if (name === 'add') newDate = moment(startDate).add(1, 'months').date(1);
    else {
      // if (startDate?.getMonth() > new Date().getMonth())
      newDate =
        startDate?.getMonth() == new Date().getMonth() + 1
          ? moment(startDate).subtract(1, 'months').date(new Date().getDate())
          : moment(startDate).subtract(1, 'months');
    }
    setStartDate(newDate._d);
  };

  const disabledDate = current => {
    const currentDate = moment();
    return current.isBefore(currentDate, 'month');
  };

  return (
    <>
      <Card className="user-ubcome-book user-ubcome-book-info hr-ubcome-book-info w-100">
        <div className="book-header">
          <h3>
            {findLabelText(
              'Upcoming_bookings',
              TabNames.upcomingBookings,
              TabNames.settings,
            )}
          </h3>
          {isHrModule ? null : (
            <Link to="#" onClick={() => setViweOlder(!viewOlder)}>
              {findLabelText(
                'View_older',
                ButtonNames.VIEW_OLDER,
                TabNames.settings,
              )}
            </Link>
          )}
        </div>
        <div className="setting-picker date-set-picker">
          <div className="date-filter date-filter-locate">
            <div className="filter-date">
              <div className="current-date">
                <div className="date-arrows date-arrows-book-only me-0">
                  <button
                    onClick={() => {
                      handleChangeDate('sub');
                      setViweOlder(false);
                    }}
                  >
                    <i className="fa fa-angle-left" />
                  </button>
                  <button
                    onClick={() => {
                      handleChangeDate('add');
                      setViweOlder(false);
                    }}
                  >
                    <i className="fa fa-angle-right" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="date-filter date-filt-handle">
            <div className="filter-date booking-filter-date">
              <div className="current-date current-date-set current-date-inner">
                <span
                  ref={calenderRef}
                  className="work-date-range up-work-range aaa"
                >
                  <DatePicker
                    open={showDatePicker}
                    onChange={handleChange}
                    picker="month"
                    style={{ visibility: 'hidden', width: 0 }}
                    format={'MMMM YYYY'}
                    value={
                      moment(startDate) ? moment(startDate) : moment(new Date())
                    }
                    bordered={false}
                    // disabledDate={disabledDate}
                  />
                  <span
                    onClick={() => {
                      setShowDatePicker(!showDatePicker);
                    }}
                  >
                    {monthNames[startDate?.getMonth()]}{' '}
                    {startDate?.getFullYear()}
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
          </div>
        </div>
        <div className="setting-grp-address setting-grp-address-scroll">
          {upcomingData?.length > 0 ? (
            upcomingData?.map((location, index) => {
              return <UpcomingBookingDetails location={location} key={index} />;
            })
          ) : (
            <div className="settings-no-booking">
              {findLabelText(
                'No_booking',
                ValidationMessages.noBooking,
                'Common_Values',
              )}
            </div>
          )}
        </div>
      </Card>
    </>
  );
};

export default UpcomingBookings;
