import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getBookingAndNotificationCount,
  setNotificationOpen,
  settodayNotificationOpen,
  updateNotificationTab,
} from '../../reduxStore/appSlice';
import { Link, useNavigate } from 'react-router-dom/dist';
import {
  day_icon1,
  day_icon2,
  day_icon3,
  day_icon4,
  day_icon5,
} from '../../components/imagepath';
import moment from 'moment';
import { RootReduxProps } from '../../reduxStore/reduxInterface';
import { findLabelText, getUserPreferedDateFormat } from '../commonMethod';
import { LabelText } from './constants';
import { notificationUrl } from '../../assets/constants/pageurl';
import { NotificationTabs } from '../newNotification/constants';
const YourDayHeader = ({}) => {
  const { bookingAndNotificationCounts } = useSelector(
    (state: RootReduxProps) => state.app,
  );
  const dispatch = useDispatch();
  const countDetails = bookingAndNotificationCounts;
  const navigate = useNavigate();
  return (
    <div className="card dash-day-card">
      <div className="card-header">
        <h4>
          {findLabelText(
            LabelText.your_day,
            LabelText.your_day,
            LabelText.dashboard,
          )}
        </h4>
        <p>{getUserPreferedDateFormat(new Date())}</p>
      </div>
      <div className="card-body">
        <div className="dash-day-grid">
          <div className="dash-day-icon">
            <img src={day_icon1} alt="icon" />
          </div>
          <div className="dash-day-content">
            <h4>
              <span>
                {countDetails ? countDetails?.request_count || '0' : '...'}
              </span>
            </h4>
            <p
              onClick={() => {
                // dispatch(setNotificationOpen(true));
                dispatch(updateNotificationTab(NotificationTabs.requests));
                navigate(notificationUrl);
              }}
            >
              <Link to="#">
                {findLabelText(
                  LabelText.view_all_requests,
                  LabelText.view_all_requests,
                  LabelText.dashboard,
                )}
              </Link>
            </p>
          </div>
        </div>
        <div className="dash-day-grid">
          <div className="dash-day-icon">
            <img src={day_icon2} alt="icon" />
          </div>
          <div className="dash-day-content">
            <h4>
              <span>
                {countDetails ? countDetails?.overall_count || '0' : '...'}
              </span>
            </h4>
            <p
              onClick={() => {
                // dispatch(settodayNotificationOpen(true));
                dispatch(updateNotificationTab(NotificationTabs.notifications));
                dispatch(getBookingAndNotificationCount());
                navigate(notificationUrl);
              }}
            >
              <Link to="#">
                {findLabelText(
                  LabelText.view_all_notifications,
                  LabelText.view_all_notifications,
                  LabelText.dashboard,
                )}
              </Link>
            </p>
          </div>
        </div>
        <div className="dash-day-grid">
          <div className="dash-day-icon">
            <img src={day_icon3} alt="icon" />
          </div>
          <div className="dash-day-content">
            <h4>
              {countDetails ? countDetails?.workspace_count || '0' : '...'}
            </h4>
            <p>
              {findLabelText(
                LabelText.booking_today,
                LabelText.booking_today,
                LabelText.dashboard,
              )}
            </p>
          </div>
        </div>
        <div className="dash-day-grid">
          <div className="dash-day-icon">
            <img src={day_icon4} alt="icon" />
          </div>
          <div className="dash-day-content">
            <h4>{countDetails ? countDetails?.room_count || '0' : '...'}</h4>
            <p>
              {findLabelText(
                LabelText.booking_today,
                LabelText.booking_today,
                LabelText.dashboard,
              )}
            </p>
          </div>
        </div>
        <div className="dash-day-grid">
          <div className="dash-day-icon bycycle-icon">
            <img src={day_icon5} alt="icon" />
          </div>
          <div className="dash-day-content">
            <h4>{countDetails ? countDetails?.parking_count || '0' : '...'}</h4>
            <p>
              {findLabelText(
                LabelText.booking_today,
                LabelText.booking_today,
                LabelText.dashboard,
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default YourDayHeader;
