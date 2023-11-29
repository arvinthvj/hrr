import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Notificationtypes } from '../../assets/constants/config';
import { postData } from '../../services/apicall';
import {
  BookingCheckin,
  BookingRequestStatus,
  GetAllNotifications,
  GetAllRequestNotifications,
  GetEditBooking,
  UpdateNotyReadStatus,
} from '../../services/apiurl';
import { Notification, notificationWithoutMark } from '../imagepath';
import { useDispatch, useSelector } from 'react-redux';
import {
  getBookingAndNotificationCount,
  hideLoader,
  setNotificationOpen,
  settodayNotificationOpen,
  showLoader,
  updateNewNotificationFlag,
  updateNotificationDetails,
  updateRequestNotificationDetails,
} from '../../reduxStore/appSlice';
import Toaster from '../toast';
import moment from 'moment';
import { store } from '../../reduxStore';
import { setDashboardChildFunc } from '../../reduxStore/dashboardSlice';
import ActivityNotification from './activityNotification';
import RequestNotification from './requestNotification';
import EditNotification from './editNotification';
import { ApiStatusCode, NotificationTypes } from './constant';
import { dateFormat_DD_MM_YYYY } from '../../assets/constants/config';
import { notificationUrl } from '../../assets/constants/pageurl';

export const Notifications = ({ childFunc }) => {
  const loginToken = store?.getState()?.app?.token;
  const notificationRef = useRef<any>(null);
  const {
    newNotificationReceived,
    newNotificationAllRecord,
    notificationOpen,
    todayNotificationOpen,
    reqNotificationAllRecord,
  } = useSelector((state: any) => state.app);
  const { dashboardChildFunc } = useSelector((state: any) => state?.dashboard);
  const today = new Date();
  const dispatch = useDispatch();
  const [currentNotificationType, setNotificationType] = useState('');
  const [notificationList, setNotificationList] = useState<any>({});
  const [incomingRequestList, setIncomingRequestList] = useState([]);
  const [outgoingRequestList, setOutgoingRequestList] = useState([]);
  const [showManageFlag, setShowManageFlag] = useState(false);
  const [selectedIncommingRequest, setSelectedIncommingRequest] = useState<any>(
    [],
  );
  const [selectedEditDetails, setSelectedEditDetails] = useState<any>({});
  const [infiniteNotification, setInfiniteNotification] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [isCallAllNotification, setCallAllNotification] =
    useState<boolean>(true);
  const [reqPageNumber, setReqPageNumber] = useState(1);
  const [isCallReqNotification, setCallReqNotification] =
    useState<boolean>(true);
  // ViewRequest
  const [showViewRequestNotification, setShowViewRequestNotification] =
    useState(false);
  const [showViewAllNotification, setShowViewAllNotification] = useState(false);
  const [date, setDate] = useState(moment(today).format(dateFormat_DD_MM_YYYY));
  const [startTime, setStartTime] = useState(
    moment(new Date()).format('hh:mm'),
  );
  const [endTime, setEndTime] = useState(moment(new Date()).format('hh:mm'));
  const [loading, setLoading] = useState(false);

  const handleTypes = type => {
    setShowViewRequestNotification(false);
    setShowViewAllNotification(false);
    setNotificationType(type);
    if (type == '') {
      clearNotificatioAll(true);
    }
  };
  useEffect(() => {
    const handleClickOutside = event => {
      const list = [
        'ant-picker-ranges',
        'ant-picker-time-panel-cell-inner',
        'ant-picker-now-btn',
        '',
        'ant-picker-ok',
        'ant-btn ant-btn-primary ant-btn-sm',
        'ant-picker-time-panel',
      ];
      if (list.includes(event.target.className)) {
      } else if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        handleTypes('');
        dispatch(setDashboardChildFunc(false));
        setPageNumber(1);
        setReqPageNumber(1);
        setCallAllNotification(true);
        setCallReqNotification(true);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  useEffect(() => {
    const showNotification = () => {
      handleTypes('ActivityNotification');
    };
    if (dashboardChildFunc) {
      showNotification();
    }
  }, [dashboardChildFunc]);

  const updateAllNotificationToRead = () => {
    const notiData = {};
    postData(UpdateNotyReadStatus, notiData, (success, res) => {
      if (res.data.code == '200') {
      } else {
        Toaster(res.data.code, res.data.message);
      }
    });
  };
  // Open Notification for View All Requests
  useEffect(() => {
    if (notificationOpen) {
      setShowViewRequestNotification(true);
      setNotificationType(notificationOpen ? 'ActivityNotification' : '');
      dispatch(setNotificationOpen(false));
    }
  }, [notificationOpen]);
  // Open Notification for View All Notifications
  useEffect(() => {
    if (todayNotificationOpen) {
      setShowViewAllNotification(true);
      setNotificationType(todayNotificationOpen ? 'ActivityNotification' : '');
      dispatch(settodayNotificationOpen(false));
    }
  }, [todayNotificationOpen]);

  useEffect(() => {
    if (currentNotificationType == 'ActivityNotification') {
      !showViewRequestNotification && getNotifications();
      getBookingRequestNotifications();
      if (!notificationOpen && !showViewRequestNotification) {
        updateAllNotificationToRead();
      }
    }
  }, [currentNotificationType]);
  useEffect(() => {
    if (newNotificationReceived) {
      getNotifications();
      getBookingRequestNotifications();
    }
  }, [newNotificationReceived]);

  const getNotifications = () => {
    setLoading(true);
    const parm = {
      page: pageNumber,
    };
    postData(GetAllNotifications, parm, (success, res) => {
      if (res?.data?.code == ApiStatusCode.SUCCESS) {
        if (res?.data?.data == '') {
          setCallAllNotification(false);
        }
      }
      setLoading(false);
      dispatch(updateNotificationDetails(success));
      validateDatas(success);
    });
  };

  const getBookingRequestNotifications = () => {
    const parm = {
      page: reqPageNumber,
    };
    postData(GetAllRequestNotifications, parm, (data, res) => {
      if (res?.data?.code == ApiStatusCode.SUCCESS) {
        if (res?.data?.data == '') {
          setCallReqNotification(false);
        }
      }
      dispatch(updateRequestNotificationDetails(data));
      validateRequestDatas(data);
    });
  };

  useEffect(() => {
    if (showViewRequestNotification || showViewAllNotification) {
      validateDatas(newNotificationAllRecord);
      validateRequestDatas(reqNotificationAllRecord);
    }
  }, []);

  const validateDatas = data => {
    if (data) {
      const notifyArray = data?.notificationdetails?.Other_Notifications;
      let todayAllReq = [];
      if (showViewAllNotification) {
        const todayDate = moment().format('ddd Do, MMMM YYYY');
        todayAllReq = notifyArray.filter(item => item.date == todayDate);
        setNotificationList(todayAllReq);
      } else if (data?.notificationdetails) {
        setNotificationList({ ...notificationList, ...data });
      }
    } else if (!data && !notificationList) {
      setNotificationList([]);
    }
  };

  const validateRequestDatas = data => {
    if (data) {
      const list =
        data?.notificationdetails?.Booking_Request?.length > 0
          ? data?.notificationdetails?.Booking_Request
          : [];
      findTheInncominAndOutgoingReq(list);
    }
  };

  const getEditRequestDetails = details => {
    if (details?.checkin_start_time) {
      setDate(moment(details.checkin_start_time).format(dateFormat_DD_MM_YYYY));
    }
    if (details?.starttime) {
      setStartTime(details.starttime);
    }
    if (details?.endtime) {
      setEndTime(details.endtime);
    }
    dispatch(showLoader());
    const data = {
      booking_id: details.booking_id,
    };
    postData(GetEditBooking, data, (success, res) => {
      dispatch(hideLoader());
      if (res.data.code == ApiStatusCode.SUCCESS) {
        handleTypes(NotificationTypes.editNotification);
        setSelectedEditDetails(success);
      } else {
        Toaster(res.data.code, res.data.message);
      }
    });
  };

  const inactiveApproveOrRejectCall = (status, id) => {
    dispatch(showLoader());
    const data = {
      booking_id: id,
      booking_status: status, // approve=1,reject=6
      bearertoken: loginToken,
    };
    postData(BookingRequestStatus, data, (success, res) => {
      dispatch(hideLoader());
      dispatch(getBookingAndNotificationCount());
      Toaster(res.data.code, res.data.message);
      clearNotificatioAll();
    });
  };

  const clearNotificatioAll = (dontClearDetails = false) => {
    setNotificationType('');
    if (dontClearDetails) {
    } else {
      setNotificationList({});
      setIncomingRequestList([]);
      setOutgoingRequestList([]);
    }
    setSelectedIncommingRequest([]);
    setShowManageFlag(false);
    setSelectedEditDetails({});
  };

  const searchOutgoingReq = searchKey => {
    const list =
      notificationList?.notificationdetails?.Booking_Request?.length > 0
        ? notificationList?.notificationdetails?.Booking_Request
        : [];
    if (searchKey) {
      if (list.length > 0) {
        const filteredValue = list.filter(
          req =>
            req.deskname.toUpperCase().includes(searchKey.toUpperCase()) ||
            req.user.toUpperCase().includes(searchKey.toUpperCase()) ||
            req.team.toUpperCase().includes(searchKey.toUpperCase()) ||
            req.email.toUpperCase().includes(searchKey.toUpperCase()) ||
            req.location.toUpperCase().includes(searchKey.toUpperCase()),
        );
        findTheInncominAndOutgoingReq(filteredValue);
      }
    } else {
      findTheInncominAndOutgoingReq(list);
    }
  };

  const findTheInncominAndOutgoingReq = list => {
    if (list.length > 0) {
      const inReq: any = [];
      const outReq: any = [];
      for (const obj of list) {
        if (obj.type == Notificationtypes.incomingRequest) {
          inReq.push(obj);
        } else if (obj.type == Notificationtypes.outgoingRequest) {
          outReq.push(obj);
        }
      }
      let todayOutReq = [];
      let todayInReq = [];
      if (showViewRequestNotification || showViewAllNotification) {
        const currentDate = moment().format('ddd Do, MMMM YYYY');
        todayOutReq = outReq.filter(item => item?.date == currentDate);
        todayInReq = inReq.filter(item => item?.date == currentDate);
      } else {
        todayOutReq = outReq;
        todayInReq = inReq;
      }
      const todayIncomingRequestList = JSON.parse(
        JSON.stringify(incomingRequestList),
      );
      const todayOutgoingRequestList = JSON.parse(
        JSON.stringify(outgoingRequestList),
      );
      todayIncomingRequestList.push(...todayInReq);
      todayOutgoingRequestList.push(...todayOutReq);
      setIncomingRequestList(todayInReq);
      setOutgoingRequestList(todayOutReq);
    } else if (
      incomingRequestList?.length == 0 &&
      outgoingRequestList?.length == 0 &&
      list?.length == 0
    ) {
      setIncomingRequestList([]);
      setOutgoingRequestList([]);
    }
  };

  useEffect(() => {
    isCallAllNotification && getNotifications();
  }, [pageNumber]);

  useEffect(() => {
    isCallReqNotification && getBookingRequestNotifications();
  }, [reqPageNumber]);

  return (
    <>
      <li
        ref={notificationRef}
        className="nav-item dropdown notification-toggle"
      >
        <Link
          to={notificationUrl}
          // onClick={() => {
          //   handleTypes(
          //     currentNotificationType
          //       ? ""
          //       : NotificationTypes.activityNotification
          //   );
          //   dispatch(updateNewNotificationFlag(false));
          // }}
          className="notification-show nav-link"
        >
          <img
            className={newNotificationReceived ? 'blink_me' : ''}
            src={
              // (notificationList?.count?.unreadcount &&
              //   notificationList?.count?.unreadcount > 0) ||
              newNotificationReceived ? Notification : notificationWithoutMark
            }
            alt="img"
          />
        </Link>
        <div
          className={
            currentNotificationType ? 'user-dropdown active' : 'user-dropdown'
          }
        >
          {currentNotificationType ===
          NotificationTypes.activityNotification ? (
            <ActivityNotification
              handleTypes={handleTypes}
              notificationList={notificationList}
              loading={loading}
              outgoingRequestList={outgoingRequestList}
              incomingRequestList={incomingRequestList}
              showViewRequestNotification={showViewRequestNotification}
              showViewAllNotification={showViewAllNotification}
              getEditRequestDetails={getEditRequestDetails}
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
            />
          ) : currentNotificationType ===
            NotificationTypes.requestNotification ? (
            <RequestNotification
              showManageFlag={showManageFlag}
              setSelectedIncommingRequest={setSelectedIncommingRequest}
              setShowManageFlag={setShowManageFlag}
              handleTypes={handleTypes}
              incomingRequestList={incomingRequestList}
              searchOutgoingReq={searchOutgoingReq}
              outgoingRequestList={outgoingRequestList}
              getEditRequestDetails={getEditRequestDetails}
              selectedIncommingRequest={selectedIncommingRequest}
              inactiveApproveOrRejectCall={inactiveApproveOrRejectCall}
              reqPageNumber={reqPageNumber}
              setReqPageNumber={setReqPageNumber}
            />
          ) : currentNotificationType === NotificationTypes.editNotification ? (
            <EditNotification
              handleTypes={handleTypes}
              selectedEditDetails={selectedEditDetails}
              date={date}
              setDate={setDate}
              startTime={startTime}
              setStartTime={setStartTime}
              endTime={endTime}
              setEndTime={setEndTime}
              clearNotificatioAll={clearNotificatioAll}
            />
          ) : null}
        </div>
      </li>
    </>
  );
};
