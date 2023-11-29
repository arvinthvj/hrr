import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import HeaderTabsAndFilters from './headerTabsAndFilters';
import { NotificationTabs, RequestType } from './constants';
import NotificationCenter from './notificationCenter';
import RequestCenter from './requestCenter';
import {
  updateBlinkIcon,
  updateNewNotificationFlag,
} from '../../reduxStore/appSlice';
import { useDispatch, useSelector } from 'react-redux';
import { postData } from '../../services/apicall';
import { GetNotificationCenterCount } from '../../services/apiurl';

const NotificationAndRequests = () => {
  const [tabChange, setTabChange] = useState('');
  const [showPastRequest, setShowPastRequest] = useState(true);
  const [requestType, setRequestType] = useState('');
  const [searchId, setSearchId] = useState('');
  const [noticeFilter, setNoticeFilter] = useState(true);
  const [workspaceFilter, setWorkspaceFilter] = useState(true);
  const [roomFilter, setRoomFilter] = useState(true);
  const [parkingFilter, setParkingFilter] = useState(true);
  const [timeoffFilter, setTimeoffFilter] = useState(true);
  const [unreadRequestCount, setUnreadRequestCount] = useState(0);
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);
  const dispatch = useDispatch();
  const [height, setHeight] = useState<any>(window.innerHeight);
  const [scrollHeight, setScrollHeight] = useState<any>();
  const { notificationTab } = useSelector((state: any) => state.app);

  const handleResize = () => {
    setHeight(window.innerHeight);
  };

  const headerHeight = document?.querySelector('.header')?.clientHeight;
  const cardHeight = document?.querySelector('.notification-details-card')
    ?.clientHeight;

  const calHeight = headerHeight + cardHeight;

  useEffect(() => {
    setScrollHeight(height - calHeight - 40);
  }, [height, calHeight]);
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getUnreadNotificationCount = isSetTab => {
    postData(GetNotificationCenterCount, {}, (data, res) => {
      if (res?.data?.code == 200) {
        setUnreadRequestCount(parseInt(data?.requestcount));
        setUnreadNotificationCount(parseInt(data?.notificationcount));
        if (
          parseInt(data?.requestcount) > 0 ||
          parseInt(data?.notificationcount) > 0
        ) {
          dispatch(updateBlinkIcon(true));
        } else {
          dispatch(updateBlinkIcon(false));
        }
        if (isSetTab) {
          if (
            parseInt(data?.requestcount) > 0 &&
            parseInt(data?.notificationcount) == 0
          ) {
            setTabChange(NotificationTabs.requests);
          } else {
            setTabChange(NotificationTabs.notifications);
          }
        }
      } else {
        setTabChange(NotificationTabs.notifications);
      }
    });
  };

  useEffect(() => {
    if (notificationTab != '') {
      setTabChange(notificationTab);
      getUnreadNotificationCount(false);
    } else {
      getUnreadNotificationCount(true);
    }
    dispatch(updateNewNotificationFlag(false));
  }, [notificationTab]);

  return (
    <div className="page-wrapper">
      <div className="content container-fluid pb-0">
        <Row>
          <Col lg={24} span={24} className="main-space-remove">
            <HeaderTabsAndFilters
              tabChange={tabChange}
              setTabChange={setTabChange}
              showPastRequest={showPastRequest}
              setShowPastRequest={setShowPastRequest}
              searchId={searchId}
              setSearchId={setSearchId}
              noticeFilter={noticeFilter}
              setNoticeFilter={setNoticeFilter}
              workspaceFilter={workspaceFilter}
              setWorkspaceFilter={setWorkspaceFilter}
              roomFilter={roomFilter}
              setRoomFilter={setRoomFilter}
              parkingFilter={parkingFilter}
              setParkingFilter={setParkingFilter}
              timeoffFilter={timeoffFilter}
              setTimeoffFilter={setTimeoffFilter}
              setRequestType={setRequestType}
              setUnreadNotificationCount={setUnreadNotificationCount}
            />
            <div className="tab-content" id="myTabContent">
              {tabChange == NotificationTabs.notifications && (
                <NotificationCenter
                  searchId={searchId}
                  requestType={requestType}
                  workspaceFilter={workspaceFilter}
                  roomFilter={roomFilter}
                  parkingFilter={parkingFilter}
                  timeoffFilter={timeoffFilter}
                  tabChange={tabChange}
                  unreadNotificationCount={unreadNotificationCount}
                  scrollHeight={scrollHeight}
                />
              )}
              {tabChange == NotificationTabs.requests && (
                <RequestCenter
                  showPastRequest={showPastRequest}
                  searchId={searchId}
                  requestType={requestType}
                  workspaceFilter={workspaceFilter}
                  roomFilter={roomFilter}
                  parkingFilter={parkingFilter}
                  timeoffFilter={timeoffFilter}
                  tabChange={tabChange}
                  scrollHeight={scrollHeight}
                />
              )}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default NotificationAndRequests;
