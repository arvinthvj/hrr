import React, { useEffect, useRef, useState } from 'react';
import { Notification_Calender, Notification_Topic } from '../imagepath';
import { NotificationLabel, NotificationTabs } from './constants';
import { postData } from '../../services/apicall';
import { GetNotificationList } from '../../services/apiurl';
import {
  getPrefereredTimeToDisplay,
  getUserPreferedDateFormat,
} from '../commonMethod';
import { Tooltip } from 'antd';
import { hideLoader, showLoader } from '../../reduxStore/appSlice';
import { useDispatch, useSelector } from 'react-redux';

const NotificationCenter = ({
  searchId,
  requestType,
  workspaceFilter,
  roomFilter,
  parkingFilter,
  timeoffFilter,
  tabChange,
  unreadNotificationCount,
  scrollHeight,
}) => {
  const [pageCount, setPageCount] = useState(1);
  const [filterList, setFilterList] = useState('');
  const [notificationList, setNotificationList] = useState([]);
  const containerRef = useRef(null);
  const [isAddPageCount, setAddPageCount] = useState(true);
  const dispatch = useDispatch();
  const { userDetails } = useSelector((state: any) => state?.app);

  const getNotificationList = count => {
    const payload = {
      filter_type: filterList,
      search_by: searchId ? searchId : null,
      page: count,
    };
    dispatch(showLoader());
    postData(GetNotificationList, payload, (data, res) => {
      dispatch(hideLoader());
      if (res?.data?.code == 200) {
        const totalPages = Math.ceil(data?.count?.overallcount / 20);
        const notifications = data?.notificationdetails?.notifications
          ? data?.notificationdetails?.notifications
          : [];
        const allData =
          count == 1
            ? [...notifications]
            : [...notificationList, ...notifications];
        setNotificationList(allData);
        if (allData?.length < 15 && count < totalPages) {
          setPageCount(prev => prev + 1);
        } else if (notifications?.length < 15 && count > totalPages) {
          setAddPageCount(false);
        }
      } else {
        setAddPageCount(false);
        count == 1 && setNotificationList([]);
      }
    });
  };

  const handleScroll = () => {
    const container = containerRef.current;
    if (
      container.scrollHeight - container.scrollTop ===
      container.clientHeight
    ) {
      isAddPageCount && setPageCount(prev => prev + 1);
    }
  };

  const addScrollListener = () => {
    const container = containerRef.current;
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  };

  useEffect(() => {
    addScrollListener();
  }, []);

  useEffect(() => {
    pageCount > 1 && isAddPageCount && getNotificationList(pageCount);
  }, [pageCount]);

  useEffect(() => {
    setAddPageCount(true);
    setPageCount(1);
    if (filterList != '') {
      tabChange == NotificationTabs.notifications && getNotificationList(1);
    } else {
      setNotificationList([]);
    }
  }, [tabChange, filterList, searchId, requestType]);

  useEffect(() => {
    const filter_list = [];
    workspaceFilter && filter_list.push(NotificationLabel.workspaces);
    roomFilter && filter_list.push(NotificationLabel.rooms);
    parkingFilter && filter_list.push(NotificationLabel.parking);
    timeoffFilter && filter_list.push(NotificationLabel.timeOff);
    setFilterList(filter_list?.toString());
  }, [workspaceFilter, roomFilter, parkingFilter, timeoffFilter]);

  const renderComment = comment => {
    if (comment && comment.length > 100) {
      return (
        <Tooltip placement="right" title={comment}>
          {comment.substring(0, 100)}...
        </Tooltip>
      );
    }
    return <span>{comment}</span>;
  };

  return (
    <div
      className="tab-pane fade show active"
      id="hr_notification"
      role="tabpanel"
      aria-labelledby="hr-notification"
    >
      <div
        className="tab-scroll notification-scroll"
        style={{ height: scrollHeight }}
        ref={containerRef}
      >
        {notificationList?.length > 0 &&
          notificationList?.map((item, index) => {
            const isAssetNotification =
              item?.icon_type == NotificationLabel.workspaces ||
              item?.icon_type == NotificationLabel.rooms ||
              item?.icon_type == NotificationLabel.parking
                ? true
                : false;
            const comment =
              userDetails?.id == item?.user_id
                ? item?.comment
                : item?.comment.replace(/Your|You/g, item?.user_name);

            return (
              <div
                key={`notification-section=${index}`}
                className={`hr-notification-card ${
                  index < unreadNotificationCount && item?.read_type == 0
                    ? 'unread-notification'
                    : 'read-notification'
                }`}
              >
                <div className="hr-notification-info">
                  <div className="hr-topic">
                    <img src={Notification_Topic} alt="" />
                    <p>{item?.status}</p>
                  </div>
                  {item?.location && (
                    <div className="hr-location">
                      <p>{NotificationLabel.location}</p>
                      <p>{item?.location}</p>
                    </div>
                  )}
                  <div className="hr-notification-calendar">
                    <div className="hr-noti-calc">
                      <img src={Notification_Calender} alt="" />
                    </div>
                    {isAssetNotification ? (
                      <div className="hr-noti-content">
                        <h6>{getUserPreferedDateFormat(item?.date)}</h6>
                        <p>
                          {getPrefereredTimeToDisplay(item?.start)} -{' '}
                          {getPrefereredTimeToDisplay(item?.end)}
                        </p>
                      </div>
                    ) : (
                      <div className="hr-noti-content">
                        <h6>
                          {getUserPreferedDateFormat(item?.start)} -{' '}
                          {getUserPreferedDateFormat(item?.end)}
                        </h6>
                        {/* <p>08:00 - 08:00</p> */}
                      </div>
                    )}
                  </div>
                  <div className="hr-notification-text">
                    <p>{renderComment(comment)}</p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default NotificationCenter;
