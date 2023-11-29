import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { notificationUrl } from '../../assets/constants/pageurl';
import { postData } from '../../services/apicall';
import { GetNotificationCenterCount } from '../../services/apiurl';
import { Notification, notificationWithoutMark } from '../imagepath';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateBlinkIcon,
  updateNotificationTab,
} from '../../reduxStore/appSlice';

const NotificationBell = () => {
  const { newNotificationReceived, blinkIcon } = useSelector(
    (state: any) => state.app,
  );
  const dispatch = useDispatch();

  const getUnreadNotificationCount = () => {
    postData(GetNotificationCenterCount, {}, (data, res) => {
      if (res?.data?.code == 200) {
        if (
          parseInt(data?.requestcount) > 0 ||
          parseInt(data?.notificationcount) > 0
        ) {
          dispatch(updateBlinkIcon(true));
        } else {
          dispatch(updateBlinkIcon(false));
        }
      }
    });
  };

  useEffect(() => {
    getUnreadNotificationCount();
  }, []);

  return (
    <li
      className="nav-item dropdown notification-toggle"
      onClick={() => dispatch(updateNotificationTab(''))}
    >
      <Link to={notificationUrl} className="notification-show nav-link">
        <img
          className={
            blinkIcon || newNotificationReceived ? 'blinking-image' : ''
          }
          src={
            blinkIcon || newNotificationReceived
              ? Notification
              : notificationWithoutMark
          }
          alt="img"
        />
      </Link>
    </li>
  );
};

export default NotificationBell;
