import React, { useEffect, useRef, useState } from 'react';
import { calend_icon1, calend_icon2 } from '../../imagepath';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { postData } from '../../../services/apicall';
import { Card, DatePicker } from 'antd';
import { findLabelText } from '../../commonMethod';
import UpcomingBookingDetails from './upcomingBookingDetails';
import { getUserBookingDetails } from '../../../services/apiurl';
import { ButtonNames, TabNames, ValidationMessages } from '../constant';
import { dateFormat_YYYY_MM_DD } from '../../../assets/constants/config';
import { useDispatch } from 'react-redux';
import {
  DayList,
  LabelText,
  UserProfileList,
} from '../../dashboardComponent/constants';

interface UpcomingBookingsProps {
  setLoading: CallableFunction | any;
  location: any;
  isHrModule?: boolean;
}

const UpcomingBookingsForHR: React.FC<UpcomingBookingsProps> = ({
  setLoading,
  location,
  isHrModule,
}) => {
  const [upcomingData, setUpcomingData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [fromDate, setFromDate] = useState<any>();
  const [toDate, setToDate] = useState<any>();
  const [viewOlder, setViweOlder] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const calenderRef = useRef<any>(null);
  const { RangePicker } = DatePicker;
  const dispatch = useDispatch();

  useEffect(() => {
    setFromDate(
      moment(new Date()).format('dddd') === 'Sunday'
        ? moment()
            .subtract(7, 'days')
            .startOf('isoWeek')
            .isoWeekday(1)
            .format('YYYY-MM-DD')
        : moment().startOf('isoWeek').isoWeekday(1).format('YYYY-MM-DD'),
    );
    setToDate(moment().endOf('isoWeek').isoWeekday(7).format('YYYY-MM-DD'));
  }, []);

  const handleTodayRedirect = () => {
    const now = new Date();
    const monday = new Date(now.setDate(now.getDate() - now.getDay() + 1));
    const preparDate = {
      fromDate: moment(new Date(monday)).format(dateFormat_YYYY_MM_DD),
      toDate: moment(new Date(monday.setDate(monday.getDate() + 6))).format(
        dateFormat_YYYY_MM_DD,
      ),
    };
    setFromDate(preparDate?.fromDate);
    setToDate(preparDate?.toDate);
  };
  useEffect(() => {
    const dateOne = moment(new Date()).format(dateFormat_YYYY_MM_DD);
    const dateTwo = moment(fromDate).format(dateFormat_YYYY_MM_DD);
    if (dateOne > dateTwo) {
      handleTodayRedirect();
    } else {
    }
  }, []);

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
      const firstDay = new Date(
        currentdate?._d.getFullYear(),
        currentdate?._d.getMonth(),
        1,
      );
      setStartDate(firstDay);
    } else setStartDate(startDate);
  };

  const getBookingData = (data, res) => {
    if (res?.data?.code == 200) {
      setUpcomingData(data);
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
    if (name === 'add') newDate = moment(startDate).add(1, 'months');
    else newDate = moment(startDate).subtract(1, 'months');
    setStartDate(newDate._d);
  };

  const ChangeDate = (action, updateDay) => {
    const preparDate = {
      fromDate: moment(new Date(fromDate))
        .add(updateDay, 'days')
        .format(dateFormat_YYYY_MM_DD),
      toDate: moment(new Date(toDate))
        .add(updateDay, 'days')
        .format(dateFormat_YYYY_MM_DD),
    };
    setFromDate(preparDate?.fromDate);
    setToDate(preparDate?.toDate);
  };
  const handleEvent = (date, picker) => {
    const preparDate = {
      fromDate: picker[0],
      toDate: picker[1],
    };
    setFromDate(preparDate?.fromDate);
    setToDate(preparDate?.toDate);
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
        <div className="date-filter hr-date-filter">
          <div className="filter-date date-filter-locate team-date dash-date">
            <div className="filter-date">
              <div className="current-date" style={{ cursor: 'default' }}>
                <img
                  style={{ cursor: 'pointer' }}
                  src={calend_icon1}
                  alt="img"
                  onClick={handleTodayRedirect}
                />{' '}
                <span
                  style={{ cursor: 'pointer' }}
                  onClick={handleTodayRedirect}
                >
                  {findLabelText(
                    LabelText.today,
                    LabelText.today,
                    LabelText.dashboard,
                  )}
                </span>
                <div className="date-arrows date-arrows-dash">
                  <img
                    className="me-0"
                    src={calend_icon2}
                    alt="img"
                    onClick={handleTodayRedirect}
                  />
                </div>
              </div>
            </div>
            <div className="work-date-range dash-range dashboard-rangepicker">
              <RangePicker
                open={false}
                popupClassName="d-none"
                disabledDate={d => {
                  return (
                    !d ||
                    d.isAfter(
                      moment(new Date())
                        .add(29, 'days')
                        .format(dateFormat_YYYY_MM_DD),
                    ) ||
                    d.isSameOrBefore(
                      moment(new Date()).format(dateFormat_YYYY_MM_DD),
                    )
                  );
                }}
                defaultValue={[
                  moment(
                    moment(fromDate).format('dddd') === DayList.Monday
                      ? fromDate
                      : moment(new Date()).format('dddd') === DayList.Sunday
                      ? moment()
                          .subtract(7, 'days')
                          .startOf('isoWeek')
                          .isoWeekday(1)
                          .format(dateFormat_YYYY_MM_DD)
                      : moment()
                          .startOf('isoWeek')
                          .isoWeekday(1)
                          .format(dateFormat_YYYY_MM_DD),
                    dateFormat_YYYY_MM_DD,
                  ),
                  moment(toDate, dateFormat_YYYY_MM_DD),
                ]}
                onCalendarChange={val => {}}
                onChange={handleEvent}
              />
              <div>
                <Link
                  to="#"
                  className="angle-left"
                  style={{
                    opacity: '1',
                  }}
                  onClick={() => ChangeDate(UserProfileList.subtract, -7)}
                >
                  <i className="fa fa-angle-left" />
                </Link>
                <span className="me-0">
                  {moment(fromDate).format('DD MMM YYYY')} <b>-</b>{' '}
                  {moment(toDate).format('DD MMM YYYY')}
                </span>
                <Link
                  to="#"
                  className="angle-right"
                  style={{
                    opacity: '1',
                  }}
                  onClick={() => ChangeDate(UserProfileList.add, 7)}
                >
                  <i className="fa fa-angle-right" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="hr-setting-grp">
          <div className="setting-grp-address setting-grp-address-scroll">
            {upcomingData?.length > 0 ? (
              upcomingData?.map((location, index) => {
                return (
                  <UpcomingBookingDetails location={location} key={index} />
                );
              })
            ) : (
              <div className="settings-no-booking">
                {ValidationMessages.noBookingWeek}
              </div>
            )}
          </div>
        </div>
      </Card>
    </>
  );
};

export default UpcomingBookingsForHR;
