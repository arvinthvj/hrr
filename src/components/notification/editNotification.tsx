import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  endHoursDisable,
  endMinutesDisable,
  findLabelText,
  getUserPreferedDateFormat,
  startMinutesDisable,
  startdHoursDisable,
} from '../commonMethod';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { TimePicker } from 'antd';
import { hideLoader, showLoader } from '../../reduxStore/appSlice';
import { postData } from '../../services/apicall';
import {
  NotificationCancelBooking,
  NotificationUpdateBooking,
} from '../../services/apiurl';
import Toaster from '../toast';
import { useDispatch } from 'react-redux';
import { store } from '../../reduxStore';
import { NotificationTypes } from './constant';
import {
  dateFormat_DD_MM_YYYY,
  dateFormat_YYYY_MM_DD,
} from '../../assets/constants/config';

interface EditNotificationProps {
  handleTypes: CallableFunction | any;
  selectedEditDetails: object | any;
  date: Date | any;
  setDate: CallableFunction | any;
  startTime: string;
  setStartTime: CallableFunction | any;
  endTime: string;
  setEndTime: CallableFunction | any;
  clearNotificatioAll: CallableFunction | any;
}

const EditNotification: React.FC<EditNotificationProps> = ({
  handleTypes,
  selectedEditDetails,
  date,
  setDate,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  clearNotificatioAll,
}) => {
  const [BtnDisable, setBtnDisable] = useState(true);
  const [dateChange, setdateChange] = useState(
    moment(new Date()).format(dateFormat_DD_MM_YYYY),
  );
  const dispatch = useDispatch();
  const loginToken = store?.getState()?.app?.token;
  const handleChange = currentdate => {
    setBtnDisable(false);
    setDate(moment(currentdate).format(dateFormat_DD_MM_YYYY));
  };
  const updateBookingRequest = () => {
    const data = {
      booking_id: selectedEditDetails?.id,
      date: moment(date, dateFormat_DD_MM_YYYY).format(dateFormat_YYYY_MM_DD),
      start_time: startTime ? startTime : '',
      end_time: endTime ? endTime : '',
      plan_id: selectedEditDetails?.plan_id,
      location_id: selectedEditDetails?.location_id,
      floorplan_type_id: selectedEditDetails?.floorplan_type_id,
    };
    dispatch(showLoader());
    postData(NotificationUpdateBooking, data, (success, res) => {
      dispatch(hideLoader());
      Toaster(res?.data?.code, res?.data?.message);
      clearNotificatioAll();
    });
  };
  const cancelBooking = id => {
    dispatch(showLoader());
    const data = {
      bearertoken: loginToken,
      booking_id: id,
    };
    postData(NotificationCancelBooking, data, (success, res) => {
      dispatch(hideLoader());
      Toaster(res.data.code, res.data.message);
      clearNotificatioAll();
    });
  };
  return (
    <div
      className="card notification-card edit-notification-card"
      id="scrollableDiv2"
    >
      <div className="notification-edit-header">
        <Link
          to="#"
          onClick={() => handleTypes(NotificationTypes.activityNotification)}
          className="back-requests-show"
        >
          <i className="fas fa-angle-left" />
        </Link>
        <h4>{findLabelText('Edit', 'Edit', 'Push_Notifications')}</h4>
      </div>
      <div className="edit-notification-content">
        <h4>{selectedEditDetails?.plan_details?.data[0].name}</h4>
        <h6>
          <span />{' '}
          {findLabelText('Available', 'Available', 'Push_Notifications')}
        </h6>
        <p>
          <span>
            {selectedEditDetails?.plan_details?.data[0].location_name}
          </span>
        </p>
        <p>
          <span>
            {findLabelText('Description', 'Description', 'Push_Notifications') +
              ':'}{' '}
            :{' '}
          </span>
          {selectedEditDetails?.comments}
        </p>
        <ul className="nav">
          {selectedEditDetails?.amenities?.data?.length > 0
            ? selectedEditDetails?.amenities?.data.map((list, index) => {
                return <li key={index}>{list.name}</li>;
              })
            : null}
        </ul>
        <div className="notification-date">
          <span>{findLabelText('Date', 'Date', 'Push_Notifications')}</span>
          <div className="booking-date-picker">
            <DatePicker
              onChange={handleChange}
              value={
                date
                  ? getUserPreferedDateFormat(
                      moment(date, dateFormat_DD_MM_YYYY),
                    )
                  : ''
              }
              className="form-control datetimepicker"
            />
          </div>
        </div>
        <div className="notification-date">
          <span>{findLabelText('Start', 'Start', 'Push_Notifications')}</span>
          <div className="booking-date-picker">
            {dateChange != date ? (
              <TimePicker
                onChange={e => {
                  const time = moment(e).format('HH:mm');
                  setStartTime(time);
                  setBtnDisable(false);
                }}
                value={moment(startTime, 'HH:mm')}
                placeholder={startTime}
                format={'HH:mm'}
                suffixIcon={<div></div>}
                allowClear={false}
                bordered={false}
                disabledHours={() => startdHoursDisable(endTime)}
                disabledMinutes={selectedHour =>
                  startMinutesDisable(selectedHour, endTime)
                }
                showNow={false}
                inputReadOnly={true}
              />
            ) : (
              <TimePicker
                onChange={e => {
                  const time = moment(e).format('HH:mm');
                  setStartTime(time);
                  setBtnDisable(false);
                }}
                value={moment(startTime, 'HH:mm')}
                placeholder={startTime}
                format={'HH:mm'}
                suffixIcon={<div></div>}
                allowClear={false}
                bordered={false}
                disabledHours={() => startdHoursDisable(endTime)}
                disabledMinutes={selectedHour =>
                  startMinutesDisable(selectedHour, endTime)
                }
                showNow={false}
                inputReadOnly={true}
              />
            )}
          </div>
        </div>
        <div className="notification-date">
          <span>{findLabelText('End', 'End', 'Push_Notifications')}</span>
          <div className="booking-date-picker">
            <TimePicker
              onChange={e => {
                const time = moment(e).format('HH:mm');
                setEndTime(time);
                setBtnDisable(false);
              }}
              value={moment(endTime, 'HH:mm')}
              placeholder={endTime}
              format={'HH:mm'}
              suffixIcon={<div></div>}
              allowClear={false}
              bordered={false}
              disabledHours={() => endHoursDisable(startTime)}
              disabledMinutes={selectedHour =>
                endMinutesDisable(selectedHour, startTime)
              }
              showNow={false}
              inputReadOnly={true}
            />
          </div>
        </div>
        <div className="schedule-dropdown">
          <div className="schedule-down-dropdown">
            <Link
              to="#"
              className="dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {findLabelText('Repeat', 'Repeat', 'Dropdown_components')}{' '}
              <span>
                {findLabelText('None', 'None', 'Dropdown_components')}{' '}
                <i className="fas fa-angle-down" />
              </span>
            </Link>
            <ul className="dropdown-menu">
              <li>
                <Link to="#" className="dropdown-item">
                  {findLabelText('None', 'None', 'Dropdown_components')}
                </Link>
              </li>
              <li>
                <Link to="#" className="dropdown-item">
                  {findLabelText('Daily', 'Daily', 'Dropdown_components')}
                </Link>
              </li>
              <li>
                <Link to="#" className="dropdown-item">
                  {findLabelText(
                    'Every_weekday',
                    'Every weekday',
                    'Dropdown_components',
                  ) +
                    '(' +
                    findLabelText('Mon_Fri', 'Mon-Fri', 'Dropdown_components') +
                    ')'}
                </Link>
              </li>
              <li>
                <Link to="#" className="dropdown-item">
                  {findLabelText('Weekly', 'Weekly', 'Dropdown_components')}
                </Link>
              </li>
              <li>
                <Link to="#" className="dropdown-item">
                  {findLabelText('Monthly', 'Monthly', 'Dropdown_components')}
                </Link>
              </li>
              <li>
                <Link to="#" className="dropdown-item">
                  {findLabelText('Yearly', 'Yearly', 'Dropdown_components')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="notification-btns-info">
          <div className="notification-btns">
            <button
              type="submit"
              className="btn"
              onClick={() => {
                handleTypes('ActivityNotification');
              }}
            >
              {findLabelText('Cancel', 'Cancel', 'Location')}
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={() => {
                updateBookingRequest();
              }}
              disabled={BtnDisable}
            >
              {findLabelText('Save_changes', 'Save changes', 'Location')}
            </button>
          </div>
        </div>
        {selectedEditDetails?.is_cancel == 0 ? (
          <div className="notification-cancel">
            <Link
              to="#"
              onClick={() => {
                cancelBooking(selectedEditDetails.id);
              }}
            >
              {findLabelText(
                'Cancel_booking',
                'Cancel booking',
                'Notifications',
              )}
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default EditNotification;
