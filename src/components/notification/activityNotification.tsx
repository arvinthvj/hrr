import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Notification, notificationWithoutMark } from '../imagepath';
import { findLabelText } from '../commonMethod';
import Loader from '../loader';
import {
  ApprovedNotificationComponent,
  BookingModifiedNotificationComponent,
  BookingRejectOrExpiredComponent,
  BookingSuccessComponent,
  CheckInRequiredComponent,
  GeneralNotificationComponent,
  IncomingRequestsComponent,
  OutgoingRequestsComponent,
  RejectedNotificationComponent,
} from './notificationComponents';
import { Notificationtypes } from '../../assets/constants/config';
import moment from 'moment';
import { NotificationTypes } from './constant';

interface ActivityNotificationProps {
  handleTypes: CallableFunction | any;
  notificationList: Object | any;
  loading: boolean;
  outgoingRequestList: Object | any;
  incomingRequestList: Object | any;
  showViewRequestNotification: boolean;
  showViewAllNotification: boolean;
  getEditRequestDetails: CallableFunction | any;
  pageNumber: number;
  setPageNumber: CallableFunction | any;
}

const ActivityNotification: React.FC<ActivityNotificationProps> = ({
  handleTypes,
  notificationList,
  loading,
  outgoingRequestList,
  incomingRequestList,
  showViewRequestNotification,
  showViewAllNotification,
  getEditRequestDetails,
  pageNumber,
  setPageNumber,
}) => {
  const { newNotificationReceived } = useSelector((state: any) => state.app);
  const infiniteRef = useRef<any>();
  const bottomBoundaryRef = useRef<any>(null);
  const [currentOutReqArray, setCurrentOutReqArray] = useState([]);
  const notifyCondition = showViewAllNotification
    ? notificationList
    : notificationList?.notificationdetails?.Other_Notifications;
  const changeReadStatus = id => {
    const data = {
      id: id,
    };
  };
  const compareDates = d2 => {
    const currentDate = moment().format('YYYY-MM-DD HH:mm:ss');
    if (moment(currentDate).isSameOrAfter(d2)) {
      return true;
    } else {
      return false;
    }
  };

  const subractionTime = (date, time) => {
    if (date) {
      time = time ? parseInt(time) : 0;
      const d2 = new Date(date);
      d2.setMinutes(d2.getMinutes() - time);
      return moment(d2).format('YYYY-MM-DD HH:mm:ss');
    } else {
      return '';
    }
  };

  // Infinite Scroll
  const onScroll = () => {
    const scrollable = infiniteRef.current;
    const { scrollHeight, offsetHeight, scrollTop } = scrollable;

    scrollable?.addEventListener('scroll', e => {
      const diff = scrollHeight - offsetHeight - 200;
      if (diff <= Math.round(scrollTop)) {
        setPageNumber(pageNumber + 1);
      }
    });
  };

  return (
    <div className="card notification-card activity-notification-card">
      <div className="notification-header">
        <div className="notification-activity-header">
          <Link
            to="#"
            onClick={() => handleTypes('')}
            className="notification-hide"
          >
            <i className="fas fa-angle-up" />
          </Link>
          <h4>
            <img
              src={
                (notificationList?.count?.unreadcount &&
                  notificationList?.count?.unreadcount > 0) ||
                newNotificationReceived
                  ? Notification
                  : notificationWithoutMark
              }
              alt="img"
            />
            {findLabelText('Notifications', 'Notifications', 'Notifications')}
          </h4>
        </div>
      </div>
      {loading && <Loader />}
      <div className="notification-info" ref={infiniteRef} onScroll={onScroll}>
        {outgoingRequestList?.length > 0 &&
          outgoingRequestList.map((out, index) => {
            return (
              <div key={index}>
                {index === 0 ? (
                  <OutgoingRequestsComponent
                    length={outgoingRequestList.length}
                    details={out}
                    key={index}
                    handleTypes={() => {
                      handleTypes(NotificationTypes.requestNotification);
                    }}
                  />
                ) : null}
              </div>
            );
          })}
        {incomingRequestList?.length > 0
          ? incomingRequestList.map((req, index) => {
              return (
                <div key={index}>
                  {index === 0 ? (
                    <IncomingRequestsComponent
                      length={incomingRequestList.length}
                      details={req}
                      key={index}
                      handleTypes={() => {
                        handleTypes(NotificationTypes.requestNotification);
                      }}
                    />
                  ) : null}
                </div>
              );
            })
          : null}

        {!showViewRequestNotification && notifyCondition?.length > 0 ? (
          notifyCondition.map((other, index) => {
            return (
              <div key={index}>
                {index === 0 && (
                  <span
                    style={{
                      fontSize: '15px',
                      fontWeight: 'bold',
                      color: '#000000',
                      paddingLeft: '10px',
                    }}
                  >
                    Old
                  </span>
                )}
                {other.type === Notificationtypes.approved ? (
                  <ApprovedNotificationComponent
                    details={other}
                    changeReadStatus={() => {
                      changeReadStatus(other.id);
                    }}
                  />
                ) : other.type === Notificationtypes.bookingRejected ? (
                  <RejectedNotificationComponent
                    details={other}
                    changeReadStatus={() => {
                      changeReadStatus(other.id);
                    }}
                  />
                ) : other.type === Notificationtypes.checkinRequired &&
                  other.checkin_reminder != 0 &&
                  compareDates(
                    subractionTime(other.bookstarttime, other.checkin_reminder),
                  ) ? (
                  <CheckInRequiredComponent
                    handleTypes={(action = '') => {
                      if (action == 'close') {
                        handleTypes('');
                      } else {
                        handleTypes(NotificationTypes.editNotification);
                        getEditRequestDetails(other);
                      }
                    }}
                    details={other}
                  />
                ) : other.type === Notificationtypes.genericNotification ||
                  other.type === Notificationtypes.welcome ||
                  other.type === Notificationtypes.passwordReset ? (
                  <GeneralNotificationComponent
                    details={other}
                    type={other.read_type == '0' ? 'unread' : 'read'}
                    changeReadStatus={id => {
                      changeReadStatus(id);
                    }}
                  />
                ) : other.type === Notificationtypes.bookingExpired ? (
                  <BookingRejectOrExpiredComponent
                    changeReadStatus={() => {
                      changeReadStatus(other.id);
                    }}
                    details={other}
                    label={findLabelText('Expired', 'Expired', 'Notifications')}
                  />
                ) : other.type === Notificationtypes.bookingCancel ? (
                  <BookingRejectOrExpiredComponent
                    changeReadStatus={() => {
                      changeReadStatus(other.id);
                    }}
                    details={other}
                    label={findLabelText(
                      'Cancelled',
                      'Cancelled',
                      'Notifications',
                    )}
                  />
                ) : other.type === Notificationtypes.checkinConfirmation ||
                  other.type === Notificationtypes.bookingSuccess ? (
                  <BookingSuccessComponent
                    changeReadStatus={() => {
                      changeReadStatus(other.id);
                    }}
                    type={
                      other.type === Notificationtypes.bookingSuccess
                        ? 'booking'
                        : 'checkin'
                    }
                    handleTypes={() => {
                      handleTypes(NotificationTypes.editNotification);
                      getEditRequestDetails(other);
                    }}
                    details={other}
                  />
                ) : other.type === Notificationtypes.bookingModified ? (
                  <BookingModifiedNotificationComponent
                    details={other}
                    handleTypes={(action = '') => {
                      if (action == NotificationTypes.editNotification) {
                        handleTypes(action);
                        getEditRequestDetails(other);
                      }
                    }}
                  />
                ) : null}
              </div>
            );
          })
        ) : loading ? null : incomingRequestList?.length > 0 ||
          outgoingRequestList?.length > 0 ||
          currentOutReqArray?.length > 0 ? null : (
          <label className="booking-no-desk-text text-center w-100">
            {findLabelText(
              'Currently_there_is_no_notifications',
              'Currently there is no notifications',
              'Push_Notifications',
            )}
            .
          </label>
        )}
      </div>
      <div id="page-bottom-boundary" ref={bottomBoundaryRef}></div>
    </div>
  );
};

export default ActivityNotification;
