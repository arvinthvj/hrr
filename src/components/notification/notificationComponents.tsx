import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  TimeRightIcon,
  TimeleftIcon,
  book_2,
  book_3,
  notification_chair,
} from '../imagepath';
import { findFirstName } from '../../assets/globals';
import { useDispatch, useSelector } from 'react-redux';
import {
  hideLoader,
  showLoader,
  updateBlinkIcon,
} from '../../reduxStore/appSlice';
import {
  CheckCancel,
  DashboardCheckinBooking,
  DashboardCheckoutBooking,
} from '../../services/apiurl';
import { postData } from '../../services/apicall';
import Toaster from '../toast';
import { findLabelText, getUserPreferedDateFormat } from '../commonMethod';
import { dateFormat_ddd_Do_MMMM_YYYY } from '../../assets/constants/config';

const findAssetsImage = floorplantype => {
  if (floorplantype) {
    if (floorplantype == 'Room') return book_2;
    else if (floorplantype === 'Workspace') return notification_chair;
    else if (floorplantype === 'Parking') return book_3;
    else return '';
  } else {
    return '';
  }
};

export const GeneralNotificationComponent = ({
  type,
  details,
  changeReadStatus,
}) => {
  return (
    <Link
      to={'#'}
      onClick={() => {
        changeReadStatus(details.id);
      }}
    >
      <div
        className={
          type == 'unread'
            ? 'notification-grid notification-border-primary'
            : 'notification-grid notification-border-gray'
        }
      >
        <div className="notification-sub-head border-0 m-0 p-0">
          <div>
            <h6>
              {findLabelText(
                'Generic_notification',
                'Generic notification',
                'Notifications',
              )}
            </h6>
            <p>
              <span className="generic-text">{details.description}</span>
            </p>
            <p>
              <span>{details.createdat}</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const CheckInRequiredComponent = ({ handleTypes, details }) => {
  const dispatch = useDispatch();
  const [getDetails, setDetails] = useState({ ...details });
  const [dates, setDate] = useState(moment().format('YYYY-MM-DD HH:mm:ss'));
  const { userDetails } = useSelector((state: any) => state.app);
  useEffect(() => {
    const timer = setInterval(
      () => setDate(moment().format('YYYY-MM-DD HH:mm:ss')),
      1000,
    );
    return () => clearInterval(timer);
  }, []);
  const currentDateAndTime = moment().format('YYYY-MM-DD HH:mm:ss');
  // CHECKIN
  const checkInOutBooking = (id, status, action, index) => {
    try {
      let payload;
      let url;
      if (action == 'Checkin') {
        url = DashboardCheckinBooking;
        payload = { booking_id: id, checkin: status };
      } else {
        url = DashboardCheckoutBooking;
        payload = { booking_id: id, checkout: status };
      }
      dispatch(showLoader());
      postData(url, payload, (successRes, res) => {
        if (res?.data?.code == 200) {
          dispatch(updateBlinkIcon(true));
        }
        Toaster(res.data.code, res.data.message);
        handleTypes('close');
        dispatch(hideLoader());
      });
    } catch (error) {}
  };

  const stateUpdate = (id, status, action, index) => {
    let payload;
    if (action == 'Checkin') {
      payload = { id: id, checkin: status };
    } else {
      payload = { id: id, checkout: status };
    }
    postData(CheckCancel, payload, (successRes, res) => {
      Toaster(res.data.code, res.data.message);
    });
  };
  const compareDates = (d2, d3, ids) => {
    const currentDate = moment().format('YYYY-MM-DD HH:mm:ss');
    if (
      moment(currentDate).isSameOrAfter(d2) &&
      moment(currentDate).isSameOrBefore(d3)
    ) {
      return true;
    } else {
      return false;
    }
  };
  if (
    moment(getDetails.cancel_time).isSameOrBefore(currentDateAndTime) &&
    getDetails?.is_cancel == 0 &&
    getDetails.checkin_status == 0
  ) {
    getDetails['is_cancel'] = 1;
    stateUpdate(getDetails?.id, 0, 'Checkin', 'index');
  }
  if (
    moment(getDetails.checkout_end_time).isSameOrBefore(currentDateAndTime) &&
    !compareDates(
      currentDateAndTime,
      getDetails.checkout_end_time,
      getDetails?.id,
    ) &&
    getDetails?.is_cancel === 0 &&
    getDetails.checkin_status == 1
  ) {
    getDetails['is_cancel'] = 1;
    stateUpdate(getDetails?.id, 0, 'Checkout', 'index');
  }
  const isCheckIn = getDetails.checkin_status == 0 ? true : false;
  const givenDateTime = moment(details.bookstarttime);
  const isBeforeCurrentTime = givenDateTime.isBefore(moment());
  return (
    <div className="notification-grid notification-border-primary">
      <div className="notification-sub-head align-items-end">
        <div>
          <h6>
            {isCheckIn
              ? findLabelText(
                  'Check_in_required_for',
                  'Check in required for',
                  'Notifications',
                ) + ':'
              : findLabelText(
                  'Check_out_required_for',
                  'Check out required for',
                  'Push_Notifications',
                ) + ':'}
          </h6>
          <p>
            {getUserPreferedDateFormat(
              moment(getDetails?.date, dateFormat_ddd_Do_MMMM_YYYY),
            )}
          </p>
        </div>
        <div className="notification-time">
          <ul className="nav">
            <li>
              <img src={TimeleftIcon} alt="img" /> {getDetails?.starttime}
            </li>
            <li>
              <img src={TimeRightIcon} alt="img" /> {getDetails?.endtime}
            </li>
          </ul>
        </div>
      </div>
      <div className="notification-inner-details">
        <div className="notification-floor">
          <div className="notification-floor-img">
            {getDetails.floorplantype ? (
              <img src={findAssetsImage(getDetails.floorplantype)} alt="img" />
            ) : null}
          </div>
          <div className="notification-floor-text">
            <h4>{getDetails.deskname ? getDetails.deskname : '---'}</h4>
            <p>{getDetails.location ? getDetails.location : '---'}</p>
          </div>
        </div>
        <div className="notification-floor-btn">
          {!isBeforeCurrentTime && (
            <Link
              to="#"
              onClick={() => handleTypes('EditNotification')}
              className="edit-notification"
            >
              {findLabelText('Edit', 'Edit', 'Notifications')}
            </Link>
          )}
          {getDetails?.booking_status == 1 &&
            (getDetails.checkin_status == 0 &&
            compareDates(
              getDetails.checkin_start_time,
              getDetails.cancel_time,
              getDetails?.id,
            ) ? (
              userDetails?.qr_checkin == 0 && (
                <Link
                  to="#"
                  className="check-btn"
                  onClick={() => {
                    checkInOutBooking(getDetails?.id, 1, 'Checkin', 'index');
                  }}
                >
                  {findLabelText('Check_in', 'Check in', 'Locate')}
                </Link>
              )
            ) : getDetails.checkin_status == 1 &&
              compareDates(
                currentDateAndTime,
                getDetails.checkout_end_time,
                getDetails?.id,
              ) ? (
              <Link
                to="#"
                className="check-btn"
                onClick={() => {
                  checkInOutBooking(getDetails?.id, 1, 'Checkout', 'index');
                }}
              >
                {findLabelText('Check_out', 'Check out', 'Locate')}
              </Link>
            ) : getDetails.checkin_status == 2 ? (
              <div>
                {findLabelText('checked_out', 'Checked out', 'Common_Values')}
              </div>
            ) : null)}
        </div>
      </div>
    </div>
  );
};

export const RejectedNotificationComponent = ({
  details,
  changeReadStatus,
}) => {
  const startTime = details.starttime ? details.starttime : '-';
  const endTime = details.endtime ? details.endtime : '-';
  return (
    <div className="notification-grid notification-border-danger">
      <div className="notification-sub-head">
        <h4 className="rejected-text">
          {findLabelText('Rejected', 'Rejected', 'Push_Notifications')}
        </h4>
      </div>
      <div className="notification-sub-head">
        <div>
          <p>
            {getUserPreferedDateFormat(
              moment(details.date, dateFormat_ddd_Do_MMMM_YYYY),
            )}
          </p>
        </div>
        <div className="notification-time">
          <ul className="nav">
            <li>
              <img src={TimeleftIcon} alt="img" /> {startTime}
            </li>
            <li>
              <img src={TimeRightIcon} alt="img" /> {endTime}
            </li>
          </ul>
        </div>
      </div>
      <div className="notification-inner-details">
        <div className="notification-floor">
          <div className="notification-floor-img">
            {details.floorplantype ? (
              <img src={findAssetsImage(details.floorplantype)} alt="img" />
            ) : null}
          </div>
          <div className="notification-floor-text">
            <h4>{details.deskname ? details.deskname : '---'}</h4>
            <p>{details.location ? details.location : '---'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ApprovedNotificationComponent = ({
  details,
  changeReadStatus,
}) => {
  const startTime = details.starttime
    ? moment(details.starttime, 'HH:mm:ss').format('HH:mm')
    : '-';
  const endTime = details.endtime
    ? moment(details.endtime, 'HH:mm:ss').format('HH:mm')
    : '-';
  const givenDateTime = moment(details.bookstarttime);
  const isBeforeCurrentTime = givenDateTime.isBefore(moment());
  return (
    <div className="notification-grid notification-border-success">
      <div className="notification-sub-head">
        <h4 className="approved-text">
          {findLabelText('Approved', 'Approved', 'Notifications')}
        </h4>
      </div>
      <div className="notification-sub-head">
        <div>
          <p>
            {getUserPreferedDateFormat(
              moment(details.date, dateFormat_ddd_Do_MMMM_YYYY),
            )}
          </p>
        </div>
        <div className="notification-time">
          <ul className="nav">
            <li>
              <img src={TimeleftIcon} alt="img" /> {startTime}
            </li>
            <li>
              <img src={TimeRightIcon} alt="img" />
              {endTime}
            </li>
          </ul>
        </div>
      </div>
      <div className="notification-inner-details">
        <div className="notification-floor">
          <div className="notification-floor-img">
            {details.floorplantype ? (
              <img src={findAssetsImage(details.floorplantype)} alt="img" />
            ) : null}
          </div>
          <div className="notification-floor-text">
            <h4>{details.deskname ? details.deskname : '---'}</h4>
            <p>{details.location ? details.location : '---'}</p>
          </div>
        </div>
        <div className="notification-floor-btn">
          {!isBeforeCurrentTime && (
            <Link to="#" className="edit-notification">
              {findLabelText('Edit', 'Edit', 'Notifications')}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export const DayMonthYearText = ({ label }) => {
  return (
    <div className="notification-weeek">
      <p>{label}</p>
    </div>
  );
};

export const IncomingRequestsComponent = ({ handleTypes, details, length }) => {
  const profileImage = details.profile_image ? details.profile_image : '';
  return (
    <div className="notification-details  mb-0">
      <div className="notification-grid notification-border-warning">
        <div className="notification-sub-head">
          <h4>
            {findLabelText(
              'Incoming_requests',
              'Incoming requests',
              'Push_Notifications',
            )}
          </h4>
          {length > 1 ? (
            <Link
              to="#"
              onClick={() => handleTypes('RequestsNotification')}
              className="requests-show"
            >
              +{length - 1}
              {findLabelText('more', 'more', 'Notifications')}
              <i className="fas fa-angle-right" />
            </Link>
          ) : length == 1 ? (
            <Link
              to="#"
              onClick={() => handleTypes('RequestsNotification')}
              className="requests-show"
            >
              {findLabelText('View', 'View', 'Location')}{' '}
              <i className="fas fa-angle-right" />
            </Link>
          ) : null}
        </div>
        <div className="notification-inner-details">
          <div className="notification-floor">
            <div className="notification-floor-img">
              {details.floorplantype ? (
                <img src={findAssetsImage(details.floorplantype)} alt="img" />
              ) : null}
            </div>
            <div className="notification-floor-text">
              <h4>{details.deskname ? details.deskname : '---'}</h4>
              <p>{details?.location ? details.location : '---'}</p>
            </div>
          </div>
          <div className="notification-names">
            <div className="name-groups">
              <div className="work-name-img">
                <Link to="#">
                  {profileImage ? (
                    <img src={profileImage} alt="icon" />
                  ) : (
                    <p
                      className="user-firstletter"
                      style={{ height: 30, width: 30, marginRight: 10 }}
                    >
                      {findFirstName(details.user)}
                    </p>
                  )}
                </Link>
              </div>
              <h5>
                <Link to="#">{details.user}</Link>
                <span>{details.team}</span>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const OutgoingRequestsComponent = ({ handleTypes, details, length }) => {
  return (
    <div className="notification-grid notification-border-warning">
      <div className="notification-sub-head">
        <h4>
          {findLabelText(
            'Outgoing_requests',
            'Outgoing requests',
            'Notifications',
          )}
        </h4>
        {length > 1 ? (
          <Link
            to="#"
            onClick={() => handleTypes('RequestsNotification')}
            className="requests-show"
          >
            +{length - 1}
            {findLabelText('more', 'more', 'Notifications')}
            <i className="fas fa-angle-right" />
          </Link>
        ) : length == 1 ? (
          <Link
            to="#"
            onClick={() => handleTypes('RequestsNotification')}
            className="requests-show"
          >
            {findLabelText('View', 'View', 'Location')}{' '}
            <i className="fas fa-angle-right" />
          </Link>
        ) : null}
      </div>
      <div className="notification-inner-details">
        <div className="notification-floor">
          <div className="notification-floor-img">
            {details.floorplantype ? (
              <img src={findAssetsImage(details.floorplantype)} alt="img" />
            ) : null}
          </div>
          <div className="notification-floor-text">
            <h4>{details.deskname ? details.deskname : '---'}</h4>
            <p>{details.location ? details.location : '---'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const OutgoingRequestDetailsComponent = ({ details, handleTypes }) => {
  const startTime = details.starttime ? details.starttime : '-';
  const endTime = details.endtime ? details.endtime : '-';
  return (
    <div className="notification-grid notification-border-warning">
      <div className="notification-sub-head">
        <h4 className="requested-text">
          {findLabelText('Requested', 'Requested', 'Notifications')}
        </h4>
      </div>
      <div className="notification-sub-head">
        <div>
          <p>
            {getUserPreferedDateFormat(
              moment(details.date, dateFormat_ddd_Do_MMMM_YYYY),
            )}
          </p>
        </div>
        <div className="notification-time">
          <ul className="nav">
            <li>
              <img src={TimeleftIcon} alt="img" /> {startTime}
            </li>
            <li>
              <img src={TimeRightIcon} alt="img" />
              {endTime}
            </li>
          </ul>
        </div>
      </div>
      <div className="notification-inner-details">
        <div className="notification-floor">
          <div className="notification-floor-img">
            {details.floorplantype ? (
              <img src={findAssetsImage(details.floorplantype)} alt="img" />
            ) : null}
          </div>
          <div className="notification-floor-text">
            <h4>{details.deskname ? details.deskname : '---'}</h4>
            <p>{details.location ? details.location : '---'}</p>
          </div>
        </div>
        <div className="notification-floor-btn">
          <Link
            to="#"
            className="edit-notification"
            onClick={() => {
              handleTypes();
            }}
          >
            {findLabelText('Edit', 'Edit', 'Notifications')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export const IncomingRequestDetailsComponent = ({
  details,
  showManageFlag,
  onselectCheckBox,
  index,
  isSelected,
  inactiveApproveOrRejectCall,
}) => {
  const startTime = details.starttime ? details.starttime : '-';
  const endTime = details.endtime ? details.endtime : '-';
  const profileImage = details.profile_image ? details.profile_image : '';
  return (
    <div className="notification-grid notification-border-warning">
      <div className="notification-names notification-editnames">
        {details?.book_by === '' ? (
          <h6>
            {findLabelText('Requested_by', 'Requested by', 'Notifications')}
          </h6>
        ) : (
          <h6>
            {findLabelText('On_behalf_of', 'On behalf of', 'Notifications')}
          </h6>
        )}
        <div className="name-groups">
          <div className="work-name-img">
            <Link to="#">
              {profileImage ? (
                <img src={profileImage} alt="icon" />
              ) : (
                <p
                  className="user-firstletter"
                  style={{ height: 30, width: 30, marginRight: 10 }}
                >
                  {findFirstName(details.user)}
                </p>
              )}
            </Link>
          </div>
          <h5>
            <Link to="#">{details.user}</Link>
            <span>{details?.team ? details?.team : ''}</span>
          </h5>
        </div>
      </div>
      <div className="notification-sub-head">
        <div>
          <p>
            {getUserPreferedDateFormat(
              moment(details.date, dateFormat_ddd_Do_MMMM_YYYY),
            )}
          </p>
        </div>
        <div className="notification-time">
          <ul className="nav">
            <li>
              <img src={TimeleftIcon} alt="img" /> {startTime}
            </li>
            <li>
              <img src={TimeRightIcon} alt="img" />
              {endTime}
            </li>
          </ul>
        </div>
      </div>
      <div className="notification-inner-details">
        <div className="notification-floor">
          <div className="notification-floor-img">
            {details.floorplantype ? (
              <img src={findAssetsImage(details.floorplantype)} alt="img" />
            ) : null}
          </div>
          <div className="notification-floor-text">
            <h4>{details.deskname ? details.deskname : '---'}</h4>
            <p>{details.location ? details.location : '---'}</p>
          </div>
        </div>
        <div className="notification-floor-btn">
          {showManageFlag ? (
            <div className="notification-check">
              <div className="checkbox-set">
                <label className="check">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onselectCheckBox(details, index)}
                  />
                  <span className="checkmark" />
                </label>
              </div>
            </div>
          ) : null}

          {showManageFlag ? null : (
            <Link
              to="#"
              className="btn btn-reject-noti"
              onClick={() => {
                if (showManageFlag) {
                  // do nothing
                } else {
                  inactiveApproveOrRejectCall(6, details.booking_id);
                }
              }}
            >
              {findLabelText('Reject', 'Reject', 'Notifications')}
            </Link>
          )}
          {showManageFlag ? null : (
            <Link
              to="#"
              className="btn btn-approve-noti"
              onClick={() => {
                if (showManageFlag) {
                  // do nothing
                } else {
                  inactiveApproveOrRejectCall(1, details.booking_id);
                }
              }}
            >
              {findLabelText('Approve', 'Approve', 'Push_Notifications')}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export const BookingRejectOrExpiredComponent = ({
  details,
  label,
  changeReadStatus,
}) => {
  const startTime = details.starttime ? details.starttime : '-';
  const endTime = details.endtime ? details.endtime : '-';
  return (
    <div className="notification-grid notification-border-danger">
      <div className="notification-sub-head">
        <h4 className="rejected-text">{label}</h4>
      </div>
      <div className="notification-sub-head">
        <div>
          <p>
            {getUserPreferedDateFormat(
              moment(details.date, dateFormat_ddd_Do_MMMM_YYYY),
            )}
          </p>
        </div>
        <div className="notification-time">
          <ul className="nav">
            <li>
              <img src={TimeleftIcon} alt="img" /> {startTime}
            </li>
            <li>
              <img src={TimeRightIcon} alt="img" /> {endTime}
            </li>
          </ul>
        </div>
      </div>
      <div className="notification-inner-details">
        <div className="notification-floor">
          <div className="notification-floor-img">
            {details.floorplantype ? (
              <img src={findAssetsImage(details.floorplantype)} alt="img" />
            ) : null}
          </div>
          <div className="notification-floor-text">
            <h4>{details.deskname ? details.deskname : '---'}</h4>
            <p>{details.location ? details.location : '---'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const BookingSuccessComponent = ({
  handleTypes,
  details,
  type,
  changeReadStatus,
}) => {
  return (
    <div className="notification-grid notification-border-primary">
      <div className="notification-sub-head align-items-end">
        <div>
          {type == 'booking' ? (
            <h6>{details.title}</h6>
          ) : type == 'checkin' ? (
            <h6>
              {findLabelText(
                'You_have_successfully_checked_in_to',
                'You have successfully checked in to',
                'Notifications',
              )}
              :
            </h6>
          ) : null}
          <p>
            {getUserPreferedDateFormat(
              moment(details.date, dateFormat_ddd_Do_MMMM_YYYY),
            )}
          </p>
        </div>
        <div className="notification-time">
          <ul className="nav">
            <li>
              <img src={TimeleftIcon} alt="img" /> {details?.starttime}
            </li>
            <li>
              <img src={TimeRightIcon} alt="img" /> {details?.endtime}
            </li>
          </ul>
        </div>
      </div>
      <div className="notification-inner-details">
        <div className="notification-floor">
          <div className="notification-floor-img">
            {details.floorplantype ? (
              <img src={findAssetsImage(details.floorplantype)} alt="img" />
            ) : null}
          </div>
          <div className="notification-floor-text">
            <h4>{details.deskname ? details.deskname : '---'}</h4>
            <p>{details.location ? details.location : '---'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const BookingModifiedNotificationComponent = ({
  details,
  handleTypes,
}) => {
  const startTime = details.starttime
    ? moment(details.starttime, 'HH:mm:ss').format('HH:mm')
    : '-';
  const endTime = details.endtime
    ? moment(details.endtime, 'HH:mm:ss').format('HH:mm')
    : '-';
  const givenDateTime = moment(details.bookstarttime);
  const isBeforeCurrentTime = givenDateTime.isBefore(moment());
  return (
    <div className="notification-grid notification-border-success">
      <div className="notification-sub-head">
        <h4 className="approved-text">
          {findLabelText(
            'Booking_modified',
            'Booking modified',
            'Notifications',
          )}
        </h4>
      </div>
      <div className="notification-sub-head">
        <div>
          <p>
            {getUserPreferedDateFormat(
              moment(details.date, dateFormat_ddd_Do_MMMM_YYYY),
            )}
          </p>
        </div>
        <div className="notification-time">
          <ul className="nav">
            <li>
              <img src={TimeleftIcon} alt="img" /> {startTime}
            </li>
            <li>
              <img src={TimeRightIcon} alt="img" />
              {endTime}
            </li>
          </ul>
        </div>
      </div>
      <div className="notification-inner-details">
        <div className="notification-floor">
          <div className="notification-floor-img">
            {details.floorplantype ? (
              <img src={findAssetsImage(details.floorplantype)} alt="img" />
            ) : null}
          </div>
          <div className="notification-floor-text">
            <h4>{details.deskname ? details.deskname : '---'}</h4>
            <p>{details.location ? details.location : '---'}</p>
          </div>
        </div>
        <div className="notification-floor-btn">
          {!isBeforeCurrentTime && (
            <Link
              to="#"
              onClick={() => handleTypes('EditNotification')}
              className="edit-notification"
            >
              {findLabelText('Edit', 'Edit', 'Notifications')}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
